import { LeanDocument } from "mongoose";
import { IUser } from "../../models/user";

export enum USER_TYPES {
    SET_CURRENTLY_LOGGED_USER = "SET_CURRENTLY_LOGGED_USER",
}

export type UserState = {
    currentlyLoggedUser: LeanDocument<IUser>;
};

export type UserAction = {
    type: USER_TYPES;
    payloads?: {
        currentlyLoggedUser?: LeanDocument<IUser>;
    };
};
