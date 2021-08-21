import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../../../helpers/db";
import { ROUTE_NOT_FOUND, UNAUTHENTICATED } from "../../../../../../helpers/constants";
import { verifyToken } from "../../../../../../helpers/verify-token";
import activity from "../../../../../../models/activity";
import user, { UserDocument } from "../../../../../../models/user";

const userActivitiesByActivityId = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "DELETE":
            try {
                await db();
                const tokenVerified = verifyToken(req.headers.authorization!!.split(" ")[1] ?? "");

                if (tokenVerified.isVerified) {
                    const _activity = await activity.findById(req.query.activityId);
                    const _user = await user.findOne({ [UserDocument.authId]: tokenVerified.id!! });

                    if (_activity!!.userId === _user!!.id) {
                        await _activity?.delete();
                        res.status(204).json({});
                    } else res.status(401).json({ message: UNAUTHENTICATED });
                } else res.status(401).json({ message: UNAUTHENTICATED });
            } catch (e: any) {
                res.status(500).json({ message: e.message });
            }

            break;

        default:
            res.status(404).json({ message: ROUTE_NOT_FOUND });
            break;
    }
};

export default userActivitiesByActivityId;
