/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Avatar, Text, Button, Box, useBoolean } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import {
  setFollowingState,
  setUnFollowingState,
} from '../features/auth/authSlice';
import { followUser } from '../features/users/userSlice';

import { unFollowUser } from '../features/users/userSlice';

export const FollowUserFlex = ({
  userData,
  currentUserId,
  isFollowingUser,
}) => {
  const { name, userName, userId } = userData;
  const dispatch = useDispatch();

  const [isFollowing, setIsFollowing] = useBoolean(isFollowingUser); //By Default initial state is false

  const dispatchAction = isFollowing => {
    setIsFollowing.toggle();
    if (isFollowing) {
      dispatch(unFollowUser({ currentUserId, unFollowUserId: userId }));
      dispatch(setUnFollowingState(userId));
    } else {
      dispatch(followUser({ currentUserId, followUserId: userId }));
      dispatch(setFollowingState(userId));
    }
  };

  return (
    <Flex align="center" marginY={2}>
      <Avatar name={name} src="https://bit.ly/dan-abramov" />
      <Box marginLeft="5" height={'max-content'} width="100%">
        <Flex direction="column">
          <Text fontWeight="bold">{name}</Text>
          <Text>@{userName}</Text>
        </Flex>
      </Box>
      <Button
        size="sm"
        colorScheme={isFollowing ? `purple` : `brand`}
        paddingX="1.5rem"
        variant="solid"
        onClick={() => {
          dispatchAction(isFollowing);
        }}
      >
        {isFollowing ? `Following` : `Follow +`}
      </Button>
    </Flex>
  );
};
