import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../../helpers/db";
import { CREATED, LOADED, ROUTE_NOT_FOUND, UNAUTHENTICATED } from "../../../../../helpers/constants";
import { verifyToken } from "../../../../../helpers/verify-token";
import activity, { ActivityDocument } from "../../../../../models/activity";
import user, { UserDocument } from "../../../../../models/user";

const activities = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "GET":
            try {
                await db();
                const tokenVerified = verifyToken(req.headers.authorization?.split(" ")[1] ?? "");

                if (tokenVerified.isVerified) {
                    const _user = await user.findOne({ [UserDocument.authId]: tokenVerified.id!! });

                    const activities = await activity
                        .find({ [ActivityDocument.userId]: _user!!._id })
                        .populate(UserDocument.schemaName)
                        .sort({ schedule: -1 });

                    res.status(200).json({
                        message: LOADED,
                        activities: activities,
                    });
                } else res.status(401).json({ message: UNAUTHENTICATED });
            } catch (e: any) {
                res.status(500).json({ message: e.message });
            }

            break;

        case "POST":
            try {
                await db();
                const tokenVerified = verifyToken(req.headers.authorization?.split(" ")[1] ?? "");
                const _user = await user.findOne({ [UserDocument.authId]: tokenVerified.id!! });

                const _activity = await activity.create({
                    [ActivityDocument.activity]: req.body.activity,
                    [ActivityDocument.schedule]: new Date(req.body.schedule),
                    [ActivityDocument.userId]: _user!!._id,
                });

                res.status(201).json({
                    message: CREATED,
                    activity: _activity,
                });
            } catch (e: any) {
                res.status(500).json({ message: e.message });
            }

            break;

        default:
            res.status(404).json({ message: ROUTE_NOT_FOUND });
            break;
    }
};

export default activities;
