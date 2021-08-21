import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../helpers/db";
import { LOADED, ROUTE_NOT_FOUND, UNAUTHENTICATED, UPDATED } from "../../../../helpers/constants";
import { verifyToken } from "../../../../helpers/verify-token";
import user, { UserDocument } from "../../../../models/user";

const usersMe = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "GET":
            try {
                await db();
                const tokenVerified = verifyToken(req.headers.authorization?.split(" ")[1] ?? "");

                if (tokenVerified.isVerified) {
                    const _user = await user.findOne({ [UserDocument.authId]: tokenVerified.id!! });

                    res.status(200).json({
                        message: LOADED,
                        user: _user,
                    });
                } else res.status(401).json({ message: UNAUTHENTICATED });
            } catch (e: any) {
                res.status(500).json({ message: e.message });
            }

            break;

        case "PUT":
            try {
                await db();
                const tokenVerified = verifyToken(req.headers.authorization?.split(" ")[1] ?? "");

                if (tokenVerified.isVerified) {
                    const _user = await user.findOneAndUpdate(
                        { [UserDocument.authId]: tokenVerified.id!! },
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

export default usersMe;
