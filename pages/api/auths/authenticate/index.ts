import { NextApiRequest, NextApiResponse } from "next";
import auth, { AuthDocument } from "../../../../models/auth";
import user, { UserDocument } from "../../../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TOKEN_SECRED } from "../../../../helpers/environments";
import db from "../../../../helpers/db";
import { ROUTE_NOT_FOUND, UNAUTHENTICATED } from "../../../../helpers/constants";

const authsAuthenticate = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "POST":
            try {
                await db();
                const _auth = await auth.findOne({ [AuthDocument.username]: req.body.username });

                if (_auth !== null && (await bcrypt.compare(req.body.password, _auth.password!!))) {
                    const _user = await user.findOne({ [UserDocument.authId]: _auth.id });

                    const token = jwt.sign(
                        {
                            id: _auth.id,
                            isRefreshToken: false,
                        },
                        TOKEN_SECRED,
                        { expiresIn: "15m" }
                    );

                    const refreshToken = jwt.sign(
                        {
                            id: _auth.id,
                            isRefreshToken: true,
                        },
                        TOKEN_SECRED,
                        { expiresIn: "7d" }
                    );

                    res.status(200).json({
                        message: "authenticated",
                        auth: {
                            _id: _auth.id,
                            [AuthDocument.username]: _auth.username,
                        },
                        user: _user,
                        token: token,
                        refreshToken: refreshToken,
                    });
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

export default authsAuthenticate;
