import { ActivityAction, ACTIVITY_TYPES } from "./types";

export const setIdToDelete = (id: string): ActivityAction => {
    return {
        type: ACTIVITY_TYPES.SET_ID_TO_DELETE,
        payload: {
            idToDelete: id,
        },
    };
};
