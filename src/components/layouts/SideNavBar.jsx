/* eslint-disable react-hooks/exhaustive-deps */
import { Text, Flex, VStack, Avatar, Box, Container } from '@chakra-ui/react';
import { AiFillHome } from 'react-icons/ai';
import { MdExplore } from 'react-icons/md';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { BsFillPersonFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { setStatus } from '../../features/auth/authSlice';
import { STATUSES } from '../../utilities/statusesConstants';
import { LogoutFeat } from '../LogoutFeat';
import { CreatePostModal } from '../CreatePostModal';
import { Link } from 'react-router-dom';

const getActiveStyle = ({ isActive }) => ({
  backgroundColor: isActive ? '#319795' : 'none',
  color: isActive ? 'white' : 'none',
});

export const SideNavBar = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const authState = useSelector(state => state.auth);
  const { userName, name, uid, profileImageUrl } = authState.userData;

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
      height="max-content"
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
          <AiFillHome />
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
        <Flex
          as={NavLink}
          to="/bookmarks"
          style={getActiveStyle}
          px="1.5"
          py="1"
          borderRadius="5"
          align="center"
          fontSize="1.25rem"
          w="100%"
        >
          <BsFillBookmarkFill fontSize="1.25rem" />
          <Text marginLeft={2}>Bookmarks</Text>
        </Flex>
        <Flex
          as={NavLink}
          to={`/user/${uid}`}
          style={getActiveStyle}
          px="1.5"
          py="1"
          borderRadius="5"
          align="center"
          fontSize="1.25rem"
          w="100%"
        >
          <BsFillPersonFill fontSize="1.25rem" />
          <Text marginLeft={2}>Profile</Text>
        </Flex>
        <CreatePostModal />
      </VStack>
      <Flex align="center" marginTop="10rem">
        <Avatar
          as={Link}
          to={`/user/${uid}`}
          name={name}
          src={profileImageUrl}
        />
        <Box marginLeft="2" height={'max-content'} width="100%">
          <Flex direction="column">
            <Text fontWeight="bold">{name}</Text>
            <Text>@{userName}</Text>
          </Flex>
        </Box>
        <LogoutFeat />
      </Flex>
    </Container>
  );
};
