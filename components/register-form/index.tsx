import { Alert } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, Text } from "@chakra-ui/layout";
import Link from "next/link";
import { FormEvent, useState } from "react";

export type RegisterFormValue = {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    passwordConfirmation: string;
};

type Props = {
    onSubmited: (value: RegisterFormValue) => void;
    isLoading?: boolean;
    errorMsg?: string;
};

const CRegisterForm = (props: Props) => {
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const submit = (e: FormEvent) => {
        e.preventDefault();

        props.onSubmited({
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            passwordConfirmation: passwordConfirmation,
        });
    };

    return (
        <>
            <form onSubmit={submit}>
                <FormControl>
                    <FormLabel color="gray.600">First Name</FormLabel>

                    <Input
                        type="text"
                        placeholder="Input first name"
                        _focus={{ outline: "none" }}
                        value={firstName}
                        onChange={(e) => setFirstname(e.target.value)}
                        isRequired
                    />
                </FormControl>

                <FormControl mt="16px">
                    <FormLabel color="gray.600">Last Name</FormLabel>

                    <Input
                        type="text"
                        placeholder="Input last name"
                        _focus={{ outline: "none" }}
                        value={lastName}
                        onChange={(e) => setLastname(e.target.value)}
                        isRequired
                    />
                </FormControl>

                <FormControl mt="16px">
                    <FormLabel color="gray.600">Username</FormLabel>

                    <Input
                        type="text"
                        placeholder="Input username"
                        _focus={{ outline: "none" }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        isRequired
                    />
                </FormControl>

                <FormControl mt="16px">
                    <FormLabel color="gray.600">Password</FormLabel>

                    <Input
                        type="password"
                        placeholder="Input password"
                        _focus={{ outline: "none" }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isRequired
                    />
                </FormControl>

                <FormControl mt="16px">
                    <FormLabel color="gray.600">Password Confirmation</FormLabel>

                    <Input
                        type="password"
                        placeholder="Input password again"
                        _focus={{ outline: "none" }}
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        isRequired
                    />
                </FormControl>

                <Flex w="full" mt="8px" fontSize="15px" color="orange.500">
                    <Text>Registered already?</Text>

                    <Text ml="4px" fontWeight="medium">
                        <Link href="/login">Login</Link>
                    </Text>
                </Flex>

                {props.errorMsg !== undefined && (
                    <Alert status="error" rounded="lg" mt="16px">
                        {props.errorMsg}
                    </Alert>
                )}

                <Flex w="full" alignItems="center" mt="12px">
                    <Button isLoading={props.isLoading} type="submit" colorScheme="green" color="white">
                        Register
                    </Button>
                </Flex>
            </form>
        </>
    );
};

export default CRegisterForm;
