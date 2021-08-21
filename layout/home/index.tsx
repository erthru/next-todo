import { Box, Container, Flex } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CHeader from "../../components/header";
import api from "../../helpers/api";
import { API_URL } from "../../helpers/environments";
import * as session from "../../helpers/session";
import { setCurrentlyLoggedUser } from "../../store/user/actions";

type Props = {
    children: React.ReactNode;
    subtitle: string;
};

const LHome = (props: Props) => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!session.hasSession()) router.push("/login");
        else getMe();
    }, []);

    const getMe = async () => {
        try {
            const res = await api().get(`${API_URL}users/me`);
            dispatch(setCurrentlyLoggedUser(res.data.user));
        } catch (e: any) {}
    };

    const logout = () => {
        session.clear();
        window.location.href = "/login";
    };

    return (
        <>
            <Flex flexDir="column" w="full" minH="100vh" bg="#bfbfbf">
                <Container maxW="1000px" flex="1" bg="white" paddingInlineStart="0" paddingInlineEnd="0">
                    <CHeader
                        subtitle={props.subtitle}
                        onProfileClicked={() => {
                            router.push("/profile");
                        }}
                        onLogoutClicked={logout}
                    />

                    <Box px="16px" py="16px">
                        {props.children}
                    </Box>
                </Container>
            </Flex>
        </>
    );
};

export default LHome;
