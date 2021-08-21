import { NextApiRequest, NextApiResponse } from "next";
import { CREATED, ROUTE_NOT_FOUND, UNAUTHENTICATED } from "../../helpers/constants";
import auth, { AuthDocument } from "../../models/auth";
import faker from "faker";
import user, { UserDocument } from "../../models/user";
import activity, { ActivityDocument } from "../../models/activity";
import db from "../../helpers/db";
import { SEED_PASSWORD } from "../../helpers/environments";
import bcrypt from "bcrypt";

const home = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "POST":
            try {
                if (req.query.password === SEED_PASSWORD) {
                    await db();

                    const hashedPassword = await bcrypt.hash("123456", 10);

                    const auth0 = await auth.create({
                        [AuthDocument.username]: "user0",
                        [AuthDocument.password]: hashedPassword,
                    });

                    const auth1 = await auth.create({
                        [AuthDocument.username]: "user1",
                        [AuthDocument.password]: hashedPassword,
                    });

                    const user0 = await user.create({
                        [UserDocument.firstName]: faker.name.firstName(),
                        [UserDocument.lastName]: faker.name.lastName(),
                        [UserDocument.authId]: auth0.id,
                    });

                    const user1 = await user.create({
                        [UserDocument.firstName]: faker.name.firstName(),
                        [UserDocument.lastName]: faker.name.lastName(),
                        [UserDocument.authId]: auth1.id,
                    });

                    for (let i = 0; i < 10; i++) {
                        await activity.create({
                            [ActivityDocument.activity]: faker.lorem.words(),
                            [ActivityDocument.schedule]: new Date(),
                            [ActivityDocument.userId]: user0.id,
                        });
                    }

                    for (let i = 0; i < 10; i++) {
                        await activity.create({
                            [ActivityDocument.activity]: faker.lorem.words(),
                            [ActivityDocument.schedule]: new Date(),
                            [ActivityDocument.userId]: user1.id,
                        });
                    }

                    res.status(201).json({ message: CREATED });
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

export default home;
