
import { NextFunction, Request, Response } from "express";
import { UserLoginInformation, UserRegistrationInformation } from "../types/UserTypes";
import * as UserService from "../service/UserService";

export async function login(req: Request, res: Response, _next: NextFunction) {
    const { email, password }: UserLoginInformation = req.body;
    const FAILED_LOGIN_RESPONSE = {
        message: "Email/Password was incorrect. Try again."
    };

    const possibly_jwt_token = await UserService.userLogin(email, password);
    if (possibly_jwt_token === null) {
        return res.json(FAILED_LOGIN_RESPONSE).status(400).send();
    }

    return res.json({ token: possibly_jwt_token }).status(200).send();
}

export async function register(req: Request, res: Response, _next: NextFunction) {
    const { email, password }: UserRegistrationInformation = req.body;
    const FAILED_REGISTER_RESPONSE = {
        message: "Email already exists."
    };

    const SUCCESS_REGISTER_RESPONSE = {
        message: "User has been successfully created."
    };

    const success_created = await UserService.userRegister(email, password);
    if (!success_created) {
        return res.json(FAILED_REGISTER_RESPONSE).status(400).send();
    }

    return res.json(SUCCESS_REGISTER_RESPONSE).status(200).send();
}

export async function userUpdateDescription(req: Request, res: Response, _next: NextFunction) {
    const MISSING_SECURITY_TOKEN_RESPONSE = {
        message: "security token is missing"
    };
    const FAILED_UPDATE_DESCRIPTION = {
        message: "Failed to update description"
    };
    const FAILED_MISSING_NEW_DESCRIPTION = {
        message: "new description is missing"
    };
    const security_token = req.header('security-token');
    const { new_description } = req.body as { new_description: string };
    if (new_description === undefined) {
        return res.json(FAILED_MISSING_NEW_DESCRIPTION).status(400).send();
    }
    if (security_token === undefined) {
        return res.json(MISSING_SECURITY_TOKEN_RESPONSE).status(400).send();
    }
    const possibly_new_description = await UserService.userUpdateDescription(security_token, new_description);
    if (possibly_new_description === null) {
        return res.json(FAILED_UPDATE_DESCRIPTION).status(400).send();
    }

    return res.json({ new_description: possibly_new_description }).status(200).send();
}