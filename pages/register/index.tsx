import { Box, Flex, Text } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import CRegisterForm, { RegisterFormValue } from "../../components/register-form";
import api from "../../configs/api";
import { APP_TITLE } from "../../helpers/environments";
import * as session from "../../helpers/session";
import Head from "next/head";

const PLogin = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordNotMatch, setIsPasswordNotMatch] = useState(false);
    const [isUsernameUsed, setIsUsernameUsed] = useState(false);

    useEffect(() => {
        if (session.hasSession()) router.push("/");
    }, []);

    const register = async (value: RegisterFormValue) => {
        try {
            setIsPasswordNotMatch(false);
            setIsUsernameUsed(false);

            if (value.password !== value.passwordConfirmation) setIsPasswordNotMatch(true);
            else {
                setIsLoading(true);

                await api().post("/api/users", {
                    firstName: value.firstName,
                    lastName: value.lastName,
                    username: value.username,
                    password: value.password,
                });

                router.push("/login");
            }
        } catch (e: any) {
            setIsLoading(false);
            setIsPasswordNotMatch(false);
            setIsUsernameUsed((e.response.data.message as unknown as string).includes("duplicate"));
        }
    };

    return (
        <>
            <Head>
                <title>{`Register | ${APP_TITLE}`}</title>
            </Head>

            <Flex w="full" bg="#bfbfbf" minH="100vh">
                <Box
                    bg="white"
                    px="16px"
                    pt="16px"
                    mx="auto"
                    mt="24px"
                    rounded="lg"
                    w={{ base: "86%", md: "50%" }}
                    h={isPasswordNotMatch || isUsernameUsed ? "670px" : "610px"}
                >
                    <Text color="pink.400" fontWeight="bold" fontSize="24px">
                        {APP_TITLE}
                    </Text>

                    <Text color="gray.500" mt="-6px" fontWeight="medium">
                        Register
                    </Text>

                    <Box mt="16px" />
                    <CRegisterForm
                        onSubmited={register}
                        isLoading={isLoading}
                        errorMsg={isPasswordNotMatch ? "Password not match" : isUsernameUsed ? "Username used" : undefined}
                    />
                </Box>
            </Flex>
        </>
    );
};

export default PLogin;
