import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../../../configs/db";
import { UNAUTHENTICATED } from "../../../../../../helpers/constants";
import activity from "../../../../../../models/activity";
import user, { UserDocument } from "../../../../../../models/user";
import nc from "next-connect";
import { verifyToken } from "../../../../../../middlewares/verify-token";

const route = nc().delete(verifyToken, async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await db();
        const _activity = await activity.findById(req.query.activityId);
        const _user = await user.findOne({ [UserDocument.authId]: req.tokenVerified.id!! });

        if (_activity!!.userId === _user!!.id) {
            await _activity?.delete();
            res.status(204).json({});
        } else res.status(401).json({ message: UNAUTHENTICATED });
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
});

export default route;
