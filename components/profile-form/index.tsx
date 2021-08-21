import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import { FormEvent, useEffect, useState } from "react";

export type ProfileFormValue = {
    firstName: string;
    lastName: string;
};

type Props = {
    onSubmited: (value: ProfileFormValue) => void;
    firstName: string;
    lastName: string;
    isLoading?: boolean;
};

const CProfileForm = (props: Props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        setFirstName(props.firstName);
        setLastName(props.lastName);
    }, []);

    const submit = (e: FormEvent) => {
        e.preventDefault();

        props.onSubmited({
            firstName: firstName,
            lastName: lastName,
        });
    };

    return (
        <>
            <form onSubmit={submit}>
                <Flex w="full" flexWrap={{ base: "wrap", md: "nowrap" }}>
                    <FormControl mr={{ base: "0", md: "8px" }}>
                        <FormLabel color="gray.600">First Name</FormLabel>
                        <Input
                            type="text"
                            placeholder="Input first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            isRequired
                        />
                    </FormControl>

                    <FormControl ml={{ base: "0", md: "8px" }}>
                        <FormLabel color="gray.600">Last Name</FormLabel>
                        <Input type="text" placeholder="Input last name" value={lastName} onChange={(e) => setLastName(e.target.value)} isRequired />
                    </FormControl>
                </Flex>

                <Button type="submit" colorScheme="orange" isLoading={props.isLoading} mt="16px">
                    Update
                </Button>
            </form>
        </>
    );
};

export default CProfileForm;
