import { Box } from "@chakra-ui/layout";
import { LeanDocument } from "mongoose";
import { IActivity } from "../../models/activity";
import CActivity from "./activity";

type Props = {
    activities: LeanDocument<IActivity[]>;
};

const CActivities = (props: Props) => (
    <>
        {props.activities.map((activity, i) => (
            <Box key={activity._id} mt={i > 0 ? "16px" : "0"}>
                <CActivity activity={activity} />
            </Box>
        ))}
    </>
);

export default CActivities;
