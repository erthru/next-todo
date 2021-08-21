import { Box, Flex, Text } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import CLoginForm, { LoginFormValue } from "../../components/login-form";
import api from "../../helpers/api";
import { API_URL, APP_TITLE } from "../../helpers/environments";
import * as session from "../../helpers/session";
import Head from "next/head";

const PLogin = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoginFailed, setIsLoginFailed] = useState(false);

    useEffect(() => {
        if (session.hasSession()) router.push("/");
    }, []);

    const login = async (value: LoginFormValue) => {
        try {
            setIsLoading(true);
            setIsLoginFailed(false);

            const res = await api().post(`${API_URL}auths/authenticate`, {
                username: value.username,
                password: value.password,
            });

            session.create(res.data.token, res.data.refreshToken);
            window.location.href = "/";
        } catch (e: any) {
            setIsLoading(false);
            setIsLoginFailed(true);
        }
    };

    return (
        <>
            <Head>
                <title>{`Login | ${APP_TITLE}`}</title>
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
                    h={isLoginFailed ? "405px" : "350px"}
                >
                    <Text color="pink.400" fontWeight="bold" fontSize="24px">
                        {APP_TITLE}
                    </Text>

                    <Text color="gray.500" mt="-6px" fontWeight="medium">
                        Login
                    </Text>

                    <Box mt="16px" />
                    <CLoginForm onSubmited={login} isLoading={isLoading} errorMsg={isLoginFailed ? "Login failed" : undefined} />
                </Box>
            </Flex>
        </>
    );
};

export default PLogin;
