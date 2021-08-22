import { NextApiRequest, NextApiResponse } from "next";
import auth, { AuthDocument } from "../../../models/auth";
import user, { UserDocument } from "../../../models/user";
import bcrypt from "bcrypt";
import db from "../../../configs/db";
import { CREATED } from "../../../helpers/constants";
import nc from "next-connect";

const route = nc().post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await db();
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const _auth = await auth.create({
            [AuthDocument.username]: req.body.username,
            [AuthDocument.password]: hashedPassword,
        });

        const _user = await user.create({
            [UserDocument.firstName]: req.body.firstName,
            [UserDocument.lastName]: req.body.lastName,
            [UserDocument.authId]: _auth.id,
        });

        res.status(201).json({
            message: CREATED,
            auth: {
                [AuthDocument.username]: _auth.username,
            },
            user: _user,
        });
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
});

export default route;
