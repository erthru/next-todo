import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../../configs/db";
import jwt from "jsonwebtoken";
import { TOKEN_SECRED } from "../../../../../helpers/environments";
import user, { UserDocument } from "../../../../../models/user";
import auth, { AuthDocument } from "../../../../../models/auth";
import nc from "next-connect";
import { verifyRefreshToken } from "../../../../../middlewares/verify-token";

const route = nc()
    .post(verifyRefreshToken, async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            await db();

            const _auth = await auth.findById(req.tokenVerified.id);
            const _user = await user.findOne({ [UserDocument.authId]: req.tokenVerified.id!! });

            const token = jwt.sign(
                {
                    id: req.tokenVerified.id,
                    isRefreshToken: false,
                },
                TOKEN_SECRED,
                { expiresIn: "15m" }
            );

            const refreshToken = jwt.sign(
                {
                    id: req.tokenVerified.id,
                    isRefreshToken: true,
                },
                TOKEN_SECRED,
                { expiresIn: "7d" }
            );

            res.status(200).json({
                message: "token refreshed",
                auth: {
                    _id: _auth!!.id,
                    [AuthDocument.username]: _auth!!.username,
                },
                user: _user,
                token: token,
                refreshToken: refreshToken,
            });
        } catch (e: any) {
            res.status(401).json({ message: e.message });
        }
    });

export default route;
