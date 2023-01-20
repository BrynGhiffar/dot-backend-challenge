
import { Router } from "express";
import * as UserHandler from "./UserHandler";

export const userRoute = Router();
const BASE_PATH = "/user/v1";

userRoute.post(`${BASE_PATH}/login`, UserHandler.login);
userRoute.post(`${BASE_PATH}/register`, UserHandler.register);
userRoute.post(`${BASE_PATH}/description`, UserHandler.userUpdateDescription);