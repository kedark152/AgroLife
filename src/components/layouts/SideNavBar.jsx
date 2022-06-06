import {
  Text,
  Flex,
  VStack,
  Button,
  Avatar,
  Box,
  Container,
} from '@chakra-ui/react';
// import { NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { MdExplore, MdCreate } from 'react-icons/md';
import { BsBookmark, BsThreeDots } from 'react-icons/bs';

import { IoIosNotificationsOutline } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { NavLink } from 'react-router-dom';

const getActiveStyle = ({ isActive }) => ({
  backgroundColor: isActive ? '#319795' : 'none',
  color: isActive ? 'white' : 'none',
});

export const SideNavBar = () => {
  return (
    <Container
      as="aside"
      align="flex-start"
      w="100%"
      position="sticky"
      z-index="4"
      top="86px"
      height="80vh"
      p="2"
      // border="1px"
      // borderColor="black"
    >
      <VStack marginBottom="auto">
        <Flex
          as={NavLink}
          to="/home"
          style={getActiveStyle}
          px="1.5"
          py="1"
          borderRadius="5"
          align="center"
          fontSize="1.25rem"
          w="100%"
        >
          <AiOutlineHome />
          <Text marginLeft={2}>Home</Text>
        </Flex>

        <Flex
          as={NavLink}
          to="/explore"
          style={getActiveStyle}
          px="1.5"
          py="1"
          borderRadius="5"
          align="center"
          fontSize="1.25rem"
          w="100%"
        >
          <MdExplore fontSize="1.25rem" />
          <Text marginLeft={2}>Explore</Text>
        </Flex>
        <Flex alignItems="center" fontSize="1.25rem" w="100%">
          <BsBookmark fontSize="1.25rem" />
          <Text marginLeft={2}>Bookmarks</Text>
        </Flex>
        <Flex alignItems="center" fontSize="1.25rem" w="100%">
          <IoIosNotificationsOutline fontSize="1.25rem" />
          <Text marginLeft={2}>Notifications</Text>
        </Flex>
        <Flex
          as={NavLink}
          to="/myprofile"
          style={getActiveStyle}
          px="1.5"
          py="1"
          borderRadius="5"
          align="center"
          fontSize="1.25rem"
          w="100%"
        >
          <CgProfile fontSize="1.25rem" />
          <Text marginLeft={2}>Profile</Text>
        </Flex>
        <Button
          leftIcon={<MdCreate size="1.25rem" />}
          colorScheme="brand"
          size="md"
          w="100%"
        >
          Create New Post
        </Button>
      </VStack>
      <Flex align="center" marginTop="10rem">
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        <Box marginLeft="2" height={'max-content'} width="100%">
          <Flex direction="column">
            <Text fontWeight="bold">Tanay Pratap</Text>
            <Text>@tanayPT</Text>
          </Flex>
        </Box>
        <BsThreeDots size="1.5rem" />
      </Flex>
    </Container>
  );
};
