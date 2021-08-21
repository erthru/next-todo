import { UserState, UserAction, USER_TYPES } from "./types";

const initialState: UserState = {
    currentlyLoggedUser: {},
};

const reducers = (state = initialState, { type, payloads }: UserAction): UserState => {
    switch (type) {
        case USER_TYPES.SET_CURRENTLY_LOGGED_USER:
            return {
                ...state,
                currentlyLoggedUser: payloads?.currentlyLoggedUser!!,
            };

        default:
            return state;
    }
};

export default reducers;
