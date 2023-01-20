import sha256 from "sha256";
import jwt from 'jsonwebtoken';
import * as UserRepository from "../repository/UserRepository";

// export function validateEmail(email: string): boolean {

// }

export async function userLogin(email: string, password: string): Promise<string | null> { 
    // will return a JWT token string upon success
    // returns null when user is not found

    // 1. check if email exists in the database
    // if email does not exists then return user not found
    const userFound = await UserRepository.findOneUserByEmail(email);
    if (userFound === null) return null;

    const { user_id, password: expectedPasswordHash } = userFound;

    // 2. check if the password matches the found user
    // if password does not match return incorrect password
    const hashedPassword = sha256.x2(password);
    if (hashedPassword !== expectedPasswordHash) return null;

    const TOKEN_SECRET = process.env.TOKEN_SECRET!;
    
    // 3. return with JWT token, containing user id
    return jwt.sign({ user_id }, TOKEN_SECRET);
}

export async function userRegister(email: string, password: string): Promise<boolean> { // returns true if the user was successfully created false otherwise

    // user email format validation
    // user password validation

    // 1. check if the email exists in the database
    const userFound = await UserRepository.findOneUserByEmail(email);
    if (userFound !== null) return false;
    // 2 return with user successfully created.
    const hashedPassword = sha256.x2(password);
    const userCreated = await UserRepository.createUser(email, hashedPassword);
    if (userCreated === null) return false;
    return true;
}

export async function userUpdateDescription(security_token: string, new_description: string): Promise<string | null> {
    const TOKEN_SECRET = process.env.TOKEN_SECRET!;
    let payload;
    try {
        payload = jwt.verify(security_token, TOKEN_SECRET);
    } catch (err) {
        return null;
    }
    const { user_id } = payload as { user_id: string };
    const userUpdateDescription = await UserRepository.updateUserDescription(user_id, new_description);
    if (userUpdateDescription === null) return null;
    return userUpdateDescription.description;
}