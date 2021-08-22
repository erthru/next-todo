import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../configs/db";
import { LOADED, UPDATED } from "../../../../helpers/constants";
import user, { UserDocument } from "../../../../models/user";
import nc from "next-connect";
import { verifyToken } from "../../../../middlewares/verify-token";

const route = nc()
    .get(verifyToken, async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            await db();
            const _user = await user.findOne({ [UserDocument.authId]: req.tokenVerified.id!! });

            res.status(200).json({
                message: LOADED,
                user: _user,
            });
        } catch (e: any) {
            res.status(500).json({ message: e.message });
        }
    })
    .put(verifyToken, async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            await db();

            const _user = await user.findOneAndUpdate(
                { [UserDocument.authId]: req.tokenVerified.id!! },
                {
                    [UserDocument.firstName]: req.body.firstName,
                    [UserDocument.lastName]: req.body.lastName,
                },
                { new: true }
            );

            res.status(200).json({
                message: UPDATED,
                user: _user,
            });
        } catch (e: any) {
            res.status(500).json({ message: e.message });
        }
    });

export default route;
