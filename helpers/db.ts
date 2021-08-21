import mongoose from "mongoose";
import { DB_URL } from "./environments";

const db = async () => {
    if (mongoose.connection.readyState >= 1) return;

    return mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        autoIndex: true,
    });
};

export default db;
