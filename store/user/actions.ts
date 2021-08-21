import { LeanDocument } from "mongoose";
import { IUser } from "../../models/user";
import { UserAction, USER_TYPES } from "./types";

export const setCurrentlyLoggedUser = (user: LeanDocument<IUser>): UserAction => {
    return {
        type: USER_TYPES.SET_CURRENTLY_LOGGED_USER,
        payloads: {
            currentlyLoggedUser: user,
        },
    };
};
