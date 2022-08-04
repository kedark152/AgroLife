/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Container,
  Text,
  Flex,
  Divider,
  Spinner,
  useBoolean,
  useColorModeValue,
  // Box,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { FollowUserFlex } from '../FollowUserFlex';
import { useSelector } from 'react-redux';
import { getAllUsers } from '../../features/users/userSlice';
import { useDispatch } from 'react-redux';

export const WhoToFollow = () => {
  const dispatch = useDispatch();
  const cardBgColor = useColorModeValue('#FFFFFF', 'gray.800');
  const cardTextColor = useColorModeValue('black', 'gray.200');
  const authState = useSelector(state => state.auth);
  const userId = authState.userData.uid;
  const followingList = authState.userData.following;
  const allUser = useSelector(state => state.user.allUser);
  const showAllUsers = allUser.filter(user => user.uid !== userId);
  const allUserStatus = useSelector(state => state.user.allUserStatus);
  const [showMore, setShowMore] = useBoolean();
  let showUsers = [];
  if (showMore) {
    showUsers = showAllUsers;
  } else {
    showUsers = showAllUsers.filter(user => !followingList.includes(user.uid));
  }

  useEffect(() => {
    dispatch(getAllUsers()); //gets all users from firestore db
  }, []);

  return (
    <Container
      bg={cardBgColor}
      marginY="3"
      p="4"
      borderRadius={5}
      position="relative"
      color={cardTextColor}
    >
      <Flex align="center" justifyContent="space-between" paddingY="2">
        <Text fontWeight="bold">Who to Follow</Text>
        <Button size="sm" colorScheme="brand" onClick={setShowMore.toggle}>
          {showMore ? `Hide More` : `Show More`}
        </Button>
      </Flex>
      <Divider />
      {allUserStatus === 'loading' && (
        <Spinner
          position="absolute"
          thickness="5px"
          speed="0.5s"
          emptyColor="gray.200"
          color="blue.700"
          size="xl"
          right="8rem"
          top="6rem"
        />
      )}
      {/* Users to follow */}
      {allUserStatus !== 'loading' && showUsers.length > 0 ? (
        showUsers.map(user => (
          <FollowUserFlex
            key={uuid()}
            userData={user}
            currentUserId={userId}
            isFollowingUser={followingList.includes(user.userId)}
          />
        ))
      ) : (
        <Text>No Suggestions Found...</Text>
      )}
    </Container>
  );
};
