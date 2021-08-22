import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { UNAUTHENTICATED } from "../helpers/constants";
import { TOKEN_SECRED } from "../helpers/environments";

export type TokenVerified = {
    id: string | null;
    isRefreshToken: boolean | null;
};

export const verifyToken = (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    try {
        const token = req.headers.authorization!!.split(" ")[1];
        const verified = jwt.verify(token!!, TOKEN_SECRED) as TokenVerified;

        if (verified.isRefreshToken) res.status(401).json({ message: UNAUTHENTICATED });
        else {
            req.tokenVerified = verified;
            next();
        }
    } catch (e: any) {
        res.status(401).json({ message: UNAUTHENTICATED });
    }
};

export const verifyRefreshToken = (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    try {
        const token = req.headers.authorization!!.split(" ")[1];
        const verified = jwt.verify(token!!, TOKEN_SECRED) as TokenVerified;

        if (!verified.isRefreshToken) res.status(401).json({ message: UNAUTHENTICATED });
        else {
            req.tokenVerified = verified;
            next();
        }
    } catch (e: any) {
        res.status(401).json({ message: UNAUTHENTICATED });
    }
};
