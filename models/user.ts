import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuidV4 } from "uuid";

export enum UserDocument {
    schemaName = "user",
    firstName = "firstName",
    lastName = "lastName",
    authId = "authId",
}

export interface IUser extends Document {
    [UserDocument.firstName]?: string;
    [UserDocument.lastName]?: string;
    [UserDocument.authId]?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const schema = new Schema(
    {
        _id: {
            type: String,
            default: uuidV4,
        },

        [UserDocument.firstName]: {
            type: String,
            required: true,
        },

        [UserDocument.lastName]: {
            type: String,
            required: true,
        },

        [UserDocument.authId]: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

export default (mongoose.models[UserDocument.schemaName] as mongoose.Model<IUser>) || mongoose.model<IUser>(UserDocument.schemaName, schema);
