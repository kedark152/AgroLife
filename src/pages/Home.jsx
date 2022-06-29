/* eslint-disable react-hooks/exhaustive-deps */
import { SideNavBar } from '../components/layouts/SideNavBar';
import { TopBar } from '../components/TopBar';
import { Post } from '../components/cards/Post';
import { SearchBar } from '../components/SearchBar';
import { WhoToFollow } from '../components/cards/WhoToFollow';
import { Spinner } from '@chakra-ui/react';
import { v4 as uuid } from 'uuid';
import {
  Box,
  Text,
  Container,
  Grid,
  GridItem,
  HStack,
  Button,
  Divider,
} from '@chakra-ui/react';
import {
  AiFillFire,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from 'react-icons/ai';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortPostsBy } from '../utilities/utils';
import { getHomePosts, setHomePosts } from '../features/post/postSlice';
import { STATUSES } from '../utilities/statusesConstants';
import { useCrudToast } from '../hooks/useCrudToast';
import { useLikeToast } from '../hooks/useLikeToast';
import { useBookmarkToast } from '../hooks/useBookmarkToast';

export const Home = () => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const followStatus = useSelector(state => state.user.followStatus);
  const userId = authState.userData.uid;
  const followingIds = authState.userData.following;
  const [sortPosts, setSortPosts] = useState('newest');
  const homePosts = useSelector(state => state.post.homePosts);
  const homePostsStatus = useSelector(state => state.post.homePostsStatus);
  const postModalState = useSelector(state => state.postModal);

  useEffect(() => {
    dispatch(getHomePosts({ userId, followingIds, sortPosts }));
  }, [postModalState.status == STATUSES.SUCCESS, followStatus == 'success']);

  useEffect(() => {
    //for sorting post on sort state change
    if (homePostsStatus === STATUSES.SUCCESS) {
      dispatch(setHomePosts(sortPostsBy(homePosts, sortPosts)));
    }
  }, [sortPosts]);

  //use-Effect Toasts
  useCrudToast();
  useLikeToast();
  useBookmarkToast();

  return (
    <Container maxWidth="100vw" padding={0}>
      <TopBar />

      <Grid
        templateColumns={'1fr 3fr 1.5fr'}
        gap="1"
        justifyContent="center"
        marginTop="5rem"
      >
        <Box
          as={GridItem}
          position="sticky"
          top="86px"
          left="10px"
          height="max-content"
        >
          <SideNavBar />
        </Box>

        <Box as={GridItem}>
          <HStack marginBottom="30" justifyContent="center">
            <Button
              leftIcon={<AiFillFire size="1.25rem" />}
              colorScheme="teal"
              variant="outline"
            >
              Trending
            </Button>
            <Button
              leftIcon={<AiOutlineArrowUp size="1.25rem" />}
              colorScheme="teal"
              variant={sortPosts == 'newest' ? 'solid' : 'outline'}
              onClick={() => setSortPosts('newest')}
            >
              Newest
            </Button>
            <Button
              leftIcon={<AiOutlineArrowDown size="1.25rem" />}
              colorScheme="teal"
              variant={sortPosts == 'oldest' ? 'solid' : 'outline'}
              onClick={() => setSortPosts('oldest')}
            >
              Oldest
            </Button>
          </HStack>
          {/* <CreatePost /> */}
          <Divider marginTop="4" borderColor="black" />

          {homePostsStatus === 'loading' ? (
            <Spinner
              position="absolute"
              thickness="4px"
              speed="0.25s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              left="35rem"
              top="15rem"
            />
          ) : (
            homePosts.length == 0 && (
              <Text fontSize="3xl" position="absolute" left="20rem">
                No Post Found...
              </Text>
            )
          )}

          {homePostsStatus !== 'loading' &&
            homePosts.length > 0 &&
            homePosts.map((post, index) => (
              <Post
                key={uuid()}
                postData={post}
                currentUserId={userId}
                index={index}
                pageName={'home'}
              />
            ))}
        </Box>
        <Box
          as={GridItem}
          position="sticky"
          top="86px"
          right="10px"
          height="max-content"
        >
          <SearchBar />
          <WhoToFollow />
        </Box>
      </Grid>
    </Container>
  );
};
