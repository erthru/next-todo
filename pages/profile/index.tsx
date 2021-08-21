import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useState } from "react";
import { useSelector } from "react-redux";
import CProfileForm, { ProfileFormValue } from "../../components/profile-form";
import api from "../../helpers/api";
import { API_URL, APP_TITLE } from "../../helpers/environments";
import LHome from "../../layout/home";
import { Store } from "../../store";

const PProfile = () => {
    const currentlyLoggedUser = useSelector((store: Store) => store.user.currentlyLoggedUser);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const update = async (value: ProfileFormValue) => {
        try {
            setIsLoading(true);

            await api().put(`${API_URL}users/me`, {
                firstName: value.firstName,
                lastName: value.lastName,
            });

            setIsLoading(false);
            router.push("/");
        } catch (e: any) {}
    };

    return (
        <>
            <Head>
                <title>{`Profile | ${APP_TITLE}`}</title>
            </Head>

            <LHome subtitle="Profile">
                <CProfileForm
                    firstName={currentlyLoggedUser.firstName ?? ""}
                    lastName={currentlyLoggedUser.lastName ?? ""}
                    onSubmited={update}
                    isLoading={isLoading}
                />
            </LHome>
        </>
    );
};

export default PProfile;
