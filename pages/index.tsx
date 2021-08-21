import LHome from "../layout/home";
import Head from "next/head";
import { API_URL, APP_TITLE } from "../helpers/environments";
import CActivityForm, { ActivityFormValue } from "../components/activity-form";
import { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import CActivities from "../components/activities";
import api from "../helpers/api";
import { LeanDocument } from "mongoose";
import activity, { IActivity } from "../models/activity";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../store";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { setIdToDelete } from "../store/activity/actions";
import { Button } from "@chakra-ui/button";
import { Spinner } from "@chakra-ui/spinner";

const PHome = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [activities, setActivities] = useState<LeanDocument<IActivity>[]>([]);
    const currentlyLoggedUser = useSelector((store: Store) => store.user.currentlyLoggedUser);
    const idToDelete = useSelector((store: Store) => store.activity.idToDelete);
    const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
    const dispatch = useDispatch();
    const [activityFormKey, setActivityFormKey] = useState<number>(new Date().getTime());

    useEffect(() => {
        getActivities();
    }, []);

    useEffect(() => {
        setIsDeleteModalShown(idToDelete !== "");
    }, [idToDelete]);

    const add = async (value: ActivityFormValue) => {
        try {
            setIsLoading(true);

            await api().post(`${API_URL}users/me/activities`, {
                activity: value.activity,
                schedule: value.schedule,
            });

            setIsLoading(false);
            setActivityFormKey(new Date().getTime());
            getActivities();
        } catch (e: any) {
            setIsLoading(false);
        }
    };

    const _delete = async () => {
        try {
            setIsLoading(true);
            await api().delete(`${API_URL}users/me/activities/${idToDelete}`);
            setIsLoading(false);
            dispatch(setIdToDelete(""));
            getActivities();
        } catch (e: any) {
            setIsLoading(false);
        }
    };

    const getActivities = async () => {
        try {
            setIsLoading(true);
            const res = await api().get(`${API_URL}users/me/activities`);
            setActivities(res.data.activities);
            setIsLoading(false);
        } catch (e: any) {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>{`${APP_TITLE} - Example Of NextJS With MongoDB`}</title>
            </Head>

            <LHome subtitle={`Hi ${currentlyLoggedUser.firstName}`}>
                <CActivityForm key={activityFormKey} onSubmited={add} isLoading={isLoading} />

                <Text mt="32px" fontWeight="bold" color="gray.600" fontSize="28px">
                    Todos
                </Text>

                <Box mt="16px">
                    <Flex w="full" position="relative" visibility={isLoading ? "visible" : "hidden"}>
                        <Spinner color="pink.500" mx="auto" />
                    </Flex>

                    <Box mt="-30px" zIndex="999" position="relative">
                        <CActivities activities={activities} />
                    </Box>
                </Box>
            </LHome>

            <Modal isOpen={isDeleteModalShown} onClose={() => dispatch(setIdToDelete(""))}>
                <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Confirmation</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Text>Delete selected data ?</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" ml="16px" onClick={() => dispatch(setIdToDelete(""))}>
                            Cancel
                        </Button>

                        <Button colorScheme="red" onClick={_delete} isLoading={isLoading}>
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default PHome;
