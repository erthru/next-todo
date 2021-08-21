import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import { FormEvent, useState } from "react";

export type ActivityFormValue = {
    activity: string;
    schedule: string;
};

type Props = {
    onSubmited: (value: ActivityFormValue) => void;
    isLoading?: boolean;
};

const CActivityForm = (props: Props) => {
    const [activity, setActivity] = useState("");
    const [schedule, setSchedule] = useState("");

    const submit = (e: FormEvent) => {
        e.preventDefault();

        props.onSubmited({
            activity: activity,
            schedule: schedule,
        });
    };

    return (
        <>
            <form onSubmit={submit}>
                <Flex w="full" flexWrap={{ base: "wrap", md: "nowrap" }}>
                    <FormControl mr={{ base: "0", md: "8px" }}>
                        <FormLabel color="gray.600">Activity</FormLabel>
                        <Input
                            type="text"
                            placeholder="Input activity"
                            value={activity}
                            onChange={(e) => setActivity(e.target.value)}
                            _focus={{ outline: "none" }}
                            isRequired
                        />
                    </FormControl>

                    <FormControl ml={{ base: "0", md: "8px" }} mt={{ base: "16px", md: "0" }}>
                        <FormLabel color="gray.600">Schedule</FormLabel>
                        <Input
                            type="datetime-local"
                            value={schedule}
                            onChange={(e) => setSchedule(e.target.value)}
                            _focus={{ outline: "none" }}
                            isRequired
                        />
                    </FormControl>
                </Flex>

                <Button type="submit" mt="16px" color="white" colorScheme="green" isLoading={props.isLoading}>
                    Add
                </Button>
            </form>
        </>
    );
};

export default CActivityForm;
