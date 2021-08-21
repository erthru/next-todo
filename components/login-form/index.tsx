import { Alert } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, Text } from "@chakra-ui/layout";
import Link from "next/link";
import { FormEvent, useState } from "react";

export type LoginFormValue = {
    username: string;
    password: string;
};

type Props = {
    onSubmited: (value: LoginFormValue) => void;
    isLoading?: boolean;
    errorMsg?: string;
};

const CLoginForm = (props: Props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submit = (e: FormEvent) => {
        e.preventDefault();

        props.onSubmited({
            username: username,
            password: password,
        });
    };

    return (
        <>
            <form onSubmit={submit}>
                <FormControl>
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

                <Flex w="full" mt="8px" fontSize="15px" color="orange.500">
                    <Text>Don't have an account?</Text>

                    <Text ml="4px" fontWeight="medium">
                        <Link href="/register">Register Here</Link>
                    </Text>
                </Flex>

                {props.errorMsg !== undefined && (
                    <Alert status="error" rounded="lg" mt="16px">
                        {props.errorMsg}
                    </Alert>
                )}

                <Flex w="full" alignItems="center" mt="12px">
                    <Button isLoading={props.isLoading} type="submit" colorScheme="green" color="white">
                        Login
                    </Button>
                </Flex>
            </form>
        </>
    );
};

export default CLoginForm;
