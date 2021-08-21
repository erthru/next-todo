export enum ACTIVITY_TYPES {
    SET_ID_TO_DELETE = "SET_ID_TO_DELETE",
}

export type ActivityState = {
    idToDelete: string;
};

export type ActivityAction = {
    type: ACTIVITY_TYPES;
    payload?: {
        idToDelete?: string;
    };
};
