import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../../configs/db";
import { UPDATED } from "../../../../../helpers/constants";
import auth, { AuthDocument } from "../../../../../models/auth";
import bcrypt from "bcrypt";
import nc from "next-connect";
import { verifyToken } from "../../../../../middlewares/verify-token";

const route = nc()
    .put(verifyToken, async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            await db();
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const _auth = await auth.findByIdAndUpdate(req.tokenVerified.id, { [AuthDocument.password]: hashedPassword }, { new: true });

            res.status(200).json({
                message: UPDATED,
                auth: {
                    _id: _auth!!.id,
                    username: _auth!!.username,
                },
            });
        } catch (e: any) {
            res.status(500).json({ message: e.message });
        }
    });

export default route;
