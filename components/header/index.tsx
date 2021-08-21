import { Box, Flex, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { APP_TITLE } from "../../helpers/environments";
import { HiDotsVertical, HiLogout, HiUser } from "react-icons/hi";
import Link from "next/link";

type Props = {
    subtitle: string;
    onProfileClicked: () => void;
    onLogoutClicked: () => void;
};

const CHeader = (props: Props) => (
    <>
        <Flex w="full" pt="8px" px="16px">
            <Box>
                <Text color="pink.400" fontWeight="bold" fontSize="24px">
                    <Link href="/">{APP_TITLE}</Link>
                </Text>

                <Text color="gray.500" mt="-6px" fontWeight="medium">
                    {props.subtitle}
                </Text>
            </Box>

            <Flex ml="auto">
                <Menu>
                    <MenuButton>
                        <HiDotsVertical fontSize="20px" color="#718096" />
                    </MenuButton>

                    <MenuList color="gray.700" onClick={() => props.onProfileClicked()}>
                        <MenuItem>
                            <HiUser fontSize="19px" />

                            <Text ml="8px" fontWeight="medium">
                                Profile
                            </Text>
                        </MenuItem>

                        <MenuItem color="gray.700" onClick={() => props.onLogoutClicked()}>
                            <HiLogout fontSize="19px" />

                            <Text ml="8px" fontWeight="medium">
                                Logout
                            </Text>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    </>
);

export default CHeader;
