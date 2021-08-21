import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../../helpers/db";
import { ROUTE_NOT_FOUND, UNAUTHENTICATED, UPDATED } from "../../../../../helpers/constants";
import { verifyToken } from "../../../../../helpers/verify-token";
import auth, { AuthDocument } from "../../../../../models/auth";
import bcrypt from "bcrypt";

const authsMePassword = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "PUT":
            try {
                await db();
                const tokenVerified = verifyToken(req.headers.authorization?.split(" ")[1] ?? "");

                if (tokenVerified.isVerified) {
                    const hashedPassword = await bcrypt.hash(req.body.password, 10);
                    const _auth = await auth.findByIdAndUpdate(tokenVerified.id, { [AuthDocument.password]: hashedPassword }, { new: true });

                    res.status(200).json({
                        message: UPDATED,
                        auth: {
                            _id: _auth!!.id,
                            username: _auth!!.username,
                        },
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

export default authsMePassword;
