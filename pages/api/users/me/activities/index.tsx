import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../../configs/db";
import { CREATED, LOADED } from "../../../../../helpers/constants";
import activity, { ActivityDocument } from "../../../../../models/activity";
import user, { UserDocument } from "../../../../../models/user";
import nc from "next-connect";
import { verifyToken } from "../../../../../middlewares/verify-token";

const route = nc()
    .get(verifyToken, async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            await db();
            const _user = await user.findOne({ [UserDocument.authId]: req.tokenVerified.id!! });

            const activities = await activity
                .find({ [ActivityDocument.userId]: _user!!._id })
                .populate(UserDocument.schemaName)
                .sort({ schedule: -1 });

            res.status(200).json({
                message: LOADED,
                activities: activities,
            });
        } catch (e: any) {
            res.status(500).json({ message: e.message });
        }
    })
    .post(verifyToken, async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            await db();
            const _user = await user.findOne({ [UserDocument.authId]: req.tokenVerified.id!! });

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
    });

export default route;
