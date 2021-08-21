import jwt from "jsonwebtoken";
import { TOKEN_SECRED } from "./environments";

type TokenVerified = {
    id: string | null;
    isRefreshToken: boolean | null;
    isVerified: boolean;
};

export const verifyToken = (token: string): TokenVerified => {
    try {
        const verified = jwt.verify(token!!, TOKEN_SECRED) as any;

        if (verified.isRefreshToken) {
            return {
                id: null,
                isRefreshToken: null,
                isVerified: false,
            };
        }

        return {
            ...verified,
            isVerified: true,
        };
    } catch (e: any) {
        return {
            id: null,
            isRefreshToken: null,
            isVerified: false,
        };
    }
};

export const verifyRefreshToken = (token: string): TokenVerified => {
    try {
        const verified = jwt.verify(token!!, TOKEN_SECRED) as any;

        if (!verified.isRefreshToken) {
            return {
                id: null,
                isRefreshToken: null,
                isVerified: false,
            };
        }

        return {
            ...verified,
            isVerified: true,
        };
    } catch (e: any) {
        return {
            id: null,
            isRefreshToken: null,
            isVerified: false,
        };
    }
};
