import { Box, Flex, Text } from "@chakra-ui/layout";
import { LeanDocument } from "mongoose";
import { HiTrash } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { IActivity } from "../../../models/activity";
import { setIdToDelete } from "../../../store/activity/actions";

type Props = {
    activity: LeanDocument<IActivity>;
};

const CActivity = (props: Props) => {
    const dispatch = useDispatch();

    return (
        <>
            <Flex w="full" bg="gray.100" alignItems="center" rounded="lg" p="16px">
                <Box w="full">
                    <Text fontWeight="bold" fontSize="18px" color="gray.600">
                        {props.activity.activity}
                    </Text>

                    <Text fontSize="14px" color="gray.500">{`${new Date(props.activity.schedule!!).toLocaleDateString()} | ${new Date(
                        props.activity.schedule!!
                    ).toLocaleTimeString()}`}</Text>
                </Box>

                <HiTrash fontSize="32px" cursor="pointer" color="#E53E3E" onClick={() => dispatch(setIdToDelete(props.activity._id))} />
            </Flex>
        </>
    );
};

export default CActivity;
