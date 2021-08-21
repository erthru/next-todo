import mongoose, { Document, LeanDocument, Schema } from "mongoose";
import { v4 as uuidV4 } from "uuid";
import { IUser, UserDocument } from "./user";

export enum ActivityDocument {
    schemaName = "activity",
    activity = "activity",
    schedule = "schedule",
    userId = "userId",
}

export interface IActivity extends Document {
    [ActivityDocument.activity]?: string;
    [ActivityDocument.schedule]?: Date;
    [ActivityDocument.userId]?: String;
    user?: LeanDocument<IUser>;
    createdAt?: Date;
    updatedAt?: Date;
}

const schema = new Schema(
    {
        _id: {
            type: String,
            default: uuidV4,
        },

        [ActivityDocument.activity]: {
            type: String,
            required: true,
        },

        [ActivityDocument.schedule]: {
            type: Date,
            required: true,
        },

        [ActivityDocument.userId]: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

schema.virtual(UserDocument.schemaName, {
    ref: UserDocument.schemaName,
    localField: ActivityDocument.userId,
    foreignField: "_id",
    justOne: true,
});

schema.set("toJSON", {
    transform: (_: any, ret: any, __: any) => {
        delete ret.id;
        return ret;
    },

    virtuals: true,
});

export default (mongoose.models[ActivityDocument.schemaName] as mongoose.Model<IActivity>) ||
    mongoose.model<IActivity>(ActivityDocument.schemaName, schema);
