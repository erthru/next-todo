import { ActivityState, ActivityAction, ACTIVITY_TYPES } from "./types";

const initialState: ActivityState = {
    idToDelete: "",
};

const reducers = (state = initialState, { type, payload }: ActivityAction): ActivityState => {
    switch (type) {
        case ACTIVITY_TYPES.SET_ID_TO_DELETE:
            return {
                ...state,
                idToDelete: payload?.idToDelete!!,
            };

        default:
            return state;
    }
};

export default reducers;
