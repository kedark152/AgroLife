/* eslint-disable react-hooks/exhaustive-deps */
import {
  Text,
  Flex,
  VStack,
  Button,
  Avatar,
  Box,
  Container,
  ButtonGroup,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverHeader,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
// import { NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { MdExplore, MdCreate } from 'react-icons/md';
import { BsBookmark } from 'react-icons/bs';

import { IoIosNotificationsOutline } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { NavLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../features/auth/authSlice';
import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { setStatus } from '../../features/auth/authSlice';
import { STATUSES } from '../../features/auth/authSlice';

const getActiveStyle = ({ isActive }) => ({
  backgroundColor: isActive ? '#319795' : 'none',
  color: isActive ? 'white' : 'none',
});

export const SideNavBar = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();
  const authState = useSelector(state => state.auth);

  useEffect(() => {
    if (authState.status === STATUSES.ERROR) {
      toast({
        title: 'Unable to Signout',
        description: authState.statusMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      dispatch(setStatus({ status: STATUSES.IDLE, message: '' }));
    }
  }, [authState.status]);

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
        <Popover
          returnFocusOnClose={false}
          isOpen={isOpen}
          onClose={onClose}
          placement="right"
          closeOnBlur={false}
        >
          <PopoverTrigger>
            <IconButton
              aria-label="Search database"
              icon={<FiLogOut size="1.2rem" />}
              onClick={onToggle}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>Are you sure you want to logout?</PopoverBody>
            <PopoverFooter display="flex" justifyContent="flex-end">
              <ButtonGroup size="sm">
                <Button variant="outline" onClick={onToggle}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => dispatch(userLogout())}
                >
                  Yes
                </Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Flex>
    </Container>
  );
};
