import { TokenVerified } from "../middlewares/verify-token";

declare module "next" {
    interface NextApiRequest {
        tokenVerified: TokenVerified;
    }
}
