import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuidV4 } from "uuid";

export enum AuthDocument {
    schemaName = "auth",
    username = "username",
    password = "password",
}

export interface IAuth extends Document {
    [AuthDocument.username]?: string;
    [AuthDocument.password]?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const schema = new Schema(
    {
        _id: {
            type: String,
            default: uuidV4,
        },

        [AuthDocument.username]: {
            type: String,
            unique: true,
            required: true,
        },

        [AuthDocument.password]: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default (mongoose.models[AuthDocument.schemaName] as mongoose.Model<IAuth>) || mongoose.model<IAuth>(AuthDocument.schemaName, schema);
