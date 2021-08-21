import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../../helpers/db";
import { verifyRefreshToken } from "../../../../../helpers/verify-token";
import jwt from "jsonwebtoken";
import { TOKEN_SECRED } from "../../../../../helpers/environments";
import user, { UserDocument } from "../../../../../models/user";
import auth, { AuthDocument } from "../../../../../models/auth";
import { ROUTE_NOT_FOUND, UNAUTHENTICATED } from "../../../../../helpers/constants";

const authsAuthenticateRefresh = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "POST":
            try {
                await db();
                const tokenVerified = verifyRefreshToken(req.headers.authorization!!.split(" ")[1] ?? "");

                if (tokenVerified.isVerified) {
                    const _auth = await auth.findById(tokenVerified.id);
                    const _user = await user.findOne({ [UserDocument.authId]: tokenVerified.id!! });

                    const token = jwt.sign(
                        {
                            id: tokenVerified.id,
                            isRefreshToken: false,
                        },
                        TOKEN_SECRED,
                        { expiresIn: "15m" }
                    );

                    const refreshToken = jwt.sign(
                        {
                            id: tokenVerified.id,
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
                } else res.status(401).json({ message: UNAUTHENTICATED });
            } catch (e: any) {
                res.status(401).json({ message: e.message });
            }

            break;

        default:
            res.status(404).json({ message: ROUTE_NOT_FOUND });
            break;
    }
};

export default authsAuthenticateRefresh;
