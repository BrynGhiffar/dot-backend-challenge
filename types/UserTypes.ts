export type UserLoginInformation = {
    email: string,
    password: string,
};

export type UserRegistrationInformation = {
    email: string,
    password: string,
};

export type User = {
    user_id: string,
    email: string,
    password: string,
    description: string,
};