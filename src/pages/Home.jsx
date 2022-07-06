/* eslint-disable react-hooks/exhaustive-deps */
import { SideNavBar } from '../components/layouts/SideNavBar';
import { TopBar } from '../components/TopBar';
import { Post } from '../components/cards/Post';
import { SearchBar } from '../components/SearchBar';
import { WhoToFollow } from '../components/cards/WhoToFollow';
import { Spinner } from '@chakra-ui/react';
import { v4 as uuid } from 'uuid';
import { MobileMenu } from '../components/layouts/MobileMenu';

import {
  Box,
  Text,
  Container,
  Grid,
  GridItem,
  HStack,
  Button,
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
import { CreatePostModal } from '../components/CreatePostModal';

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
        templateColumns={['0.9fr', '0.9fr', '0.9fr', '1fr 3fr 1.5fr']}
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
          display={['none', 'none', 'none', 'block']}
        >
          <SideNavBar />
        </Box>

        <Box as={GridItem} marginBottom="5rem">
          <HStack marginBottom="30" justifyContent="center" overflowX="auto">
            <Button
              width={['6rem', '6rem', '8rem']}
              leftIcon={<AiFillFire size="1rem" />}
              colorScheme="teal"
              variant={sortPosts == 'trending' ? 'solid' : 'outline'}
              onClick={() => setSortPosts('trending')}
            >
              Trending
            </Button>
            <Button
              width={['6rem', '6rem', '8rem']}
              leftIcon={<AiOutlineArrowUp size="1.25rem" />}
              colorScheme="teal"
              variant={sortPosts == 'newest' ? 'solid' : 'outline'}
              onClick={() => setSortPosts('newest')}
            >
              Newest
            </Button>
            <Button
              width={['6rem', '6rem', '8rem']}
              leftIcon={<AiOutlineArrowDown size="1.25rem" />}
              colorScheme="teal"
              variant={sortPosts == 'oldest' ? 'solid' : 'outline'}
              onClick={() => setSortPosts('oldest')}
            >
              Oldest
            </Button>
          </HStack>

          {homePostsStatus === 'loading' ? (
            <Spinner
              position="absolute"
              thickness="4px"
              speed="0.25s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              left={['10rem', '20rem', '35rem']}
              top={['10rem', '10rem', '15rem']}
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
