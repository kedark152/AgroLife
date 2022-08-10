/* eslint-disable react-hooks/exhaustive-deps */
import { SideNavBar } from '../components/layouts/SideNavBar';
import { userLogout } from '../features/auth/authSlice';
import { TopBar } from '../components/TopBar';
import { Post } from '../components/cards/Post';
import { SearchBar } from '../components/SearchBar';
import { WhoToFollow } from '../components/cards/WhoToFollow';
import {
  Box,
  Link,
  Container,
  Grid,
  GridItem,
  Image,
  Avatar,
  Flex,
  Text,
  VStack,
  Button,
  Spinner,
  useBoolean,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { useParams } from 'react-router-dom';
import { useCrudToast } from '../hooks/useCrudToast';
import { useLikeToast } from '../hooks/useLikeToast';
import { useBookmarkToast } from '../hooks/useBookmarkToast';
import { useEffect } from 'react';
import { MobileMenu } from '../components/layouts/MobileMenu';
import {
  getUserProfile,
  setUserProfileStatus,
} from '../features/users/userSlice';
import { getSingleUserPosts } from '../features/post/postSlice';
import { STATUSES } from '../utilities/statusesConstants';
import { EditProfileModal } from '../components/EditProfileModal';
import {
  setFollowingState,
  setUnFollowingState,
} from '../features/auth/authSlice';
import { followUser } from '../features/users/userSlice';
import { CreatePostModal } from '../components/CreatePostModal';
import { unFollowUser } from '../features/users/userSlice';

export const MyProfile = () => {
  const defaultHeaderImg = 'https://tiny.cc/defaultHeaderImg';
  let { userId } = useParams();
  const dispatch = useDispatch();
  const userProfile = useSelector(state => state.user.userProfile);
  const {
    userName,
    name,
    bio,
    followers,
    following,
    uid,
    website,
    profileImageUrl,
    coverImageUrl,
  } = userProfile;
  const authState = useSelector(state => state.auth);
  const followingList = authState.userData.following;
  const currentUserId = authState.userData.uid;
  const isFollowingUser = followingList.includes(userId);
  const postState = useSelector(state => state.post);
  const userProfileState = useSelector(state => state.user);
  const userProfileStatus = userProfileState.userProfileStatus;
  const followStatus = useSelector(state => state.user.followStatus);
  const postModalState = useSelector(state => state.postModal);
  const singleUserPosts = postState.singleUserPosts;

  const singleUserPostsStatus = useSelector(
    state => state.post.singleUserPostsStatus
  );

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

  useEffect(() => {
    dispatch(getUserProfile({ userId }));
  }, [
    userId,
    userProfileStatus === STATUSES.SUCCESS,
    followStatus === STATUSES.SUCCESS,
  ]);

  useEffect(() => {
    dispatch(getSingleUserPosts({ userId }));
    dispatch(setUserProfileStatus(STATUSES.IDLE));
  }, [
    userId,
    userProfileStatus === STATUSES.SUCCESS,
    postModalState.status == STATUSES.SUCCESS,
  ]);

  //use-Effect Toasts
  useCrudToast();
  useLikeToast();
  useBookmarkToast();

  return (
    <Container maxWidth="100vw" padding={0}>
      <TopBar />

      <Grid
        templateColumns={['0.9fr', '0.9fr', '0.9fr', '1fr 3fr 1.5fr']}
        gap="5"
        justifyContent="center"
        marginTop="5rem"
      >
        <Box
          as={GridItem}
          position="sticky"
          top="86px"
          left="10px"
          height="max-content"
          display={['none', 'none', 'none', 'block']}
        >
          <SideNavBar />
        </Box>

        <Box as={GridItem} position="relative" marginBottom="5rem">
          <Box>
            <Box
              width="100%"
              height="12rem"
              position="absolute"
              top="10px"
              borderRadius="14px"
            >
              <Image
                src={coverImageUrl}
                boxSize="100%"
                objectFit="cover"
                borderRadius="14px"
                fallbackSrc={defaultHeaderImg}
              />
            </Box>
            <VStack marginBottom="30" marginTop="8rem" justifyContent="center">
              <Avatar size="2xl" name={name} src={profileImageUrl} />

              <Flex direction="column" position="relative">
                <Text fontWeight="bold" fontSize="xl">
                  {name}
                </Text>
                <Text marginLeft="5">@{userName}</Text>

                {currentUserId == uid ? (
                  <>
                    <EditProfileModal userData={userProfile} />
                    <Button
                      colorScheme="red"
                      variant="outline"
                      onClick={() => dispatch(userLogout())}
                      disabled={userProfileStatus == 'loading'}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    colorScheme="teal"
                    variant={isFollowing ? `outline` : `solid`}
                    marginY="2"
                    onClick={() => dispatchAction(isFollowing)}
                  >
                    {isFollowing ? `Following` : `Follow`}
                  </Button>
                )}
              </Flex>
              <Text marginLeft="5">
                {following.length} Following • {followers.length} Followers
              </Text>
              <Text>
                My Website:<Link marginLeft="1">{website}</Link>
              </Text>
              <Text>Bio: {bio}</Text>
            </VStack>
          </Box>

          <Text fontWeight="bold" fontSize="xl">
            My Recent Posts
          </Text>
          {singleUserPostsStatus === 'loading' ? (
            <Spinner
              position="absolute"
              thickness="4px"
              speed="0.8s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              left={['10rem', '20rem', '25rem']}
              top={['10rem', '10rem', '15rem']}
            />
          ) : (
            singleUserPosts.length == 0 && (
              <Text fontSize="3xl" position="absolute" left="10rem">
                No Post Found...
              </Text>
            )
          )}
          {singleUserPostsStatus !== 'loading' &&
            singleUserPosts.length > 0 &&
            singleUserPosts.map((post, index) => (
              <Post
                key={uuid()}
                postData={post}
                currentUserId={userId}
                index={index}
                pageName={'profile'}
              />
            ))}
        </Box>

        <Box
          as={GridItem}
          position="sticky"
          top="86px"
          right="10px"
          height="max-content"
          display={['none', 'none', 'none', 'block']}
        >
          <SearchBar />
          <WhoToFollow />
        </Box>
        <Box display={['block', 'block', 'none']}>
          <CreatePostModal />
        </Box>
        <MobileMenu />
      </Grid>
    </Container>
  );
};
