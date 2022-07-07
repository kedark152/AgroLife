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
} from '@chakra-ui/react';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortPostsBy } from '../utilities/utils';
import {
  getBookmarksPosts,
  setBookmarksPosts,
} from '../features/post/postSlice';
import { STATUSES } from '../utilities/statusesConstants';
import { useCrudToast } from '../hooks/useCrudToast';
import { useLikeToast } from '../hooks/useLikeToast';
import { useBookmarkToast } from '../hooks/useBookmarkToast';
import { MobileMenu } from '../components/layouts/MobileMenu';
import { CreatePostModal } from '../components/CreatePostModal';

export const Bookmarks = () => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const postModalState = useSelector(state => state.postModal);
  const userId = authState.userData.uid;
  const bookmarksIds = authState.userData.bookmarks;
  const [sortPosts, setSortPosts] = useState('newest');
  const bookmarksPosts = useSelector(state => state.post.bookmarksPosts);
  const bookmarksPostsStatus = useSelector(
    state => state.post.bookmarksPostsStatus
  );

  useEffect(() => {
    dispatch(getBookmarksPosts({ bookmarksIds, sortPosts }));
  }, [
    postModalState.status == STATUSES.SUCCESS,
    postModalState.status == STATUSES.SUCCESS_BOOKMARK,
    postModalState.status == STATUSES.SUCCESS_UNBOOKMARK,
  ]);

  useEffect(() => {
    //for sorting post on sort state change
    if (bookmarksPostsStatus === STATUSES.SUCCESS) {
      dispatch(setBookmarksPosts(sortPostsBy(bookmarksPosts, sortPosts)));
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
          <HStack marginBottom="30" justifyContent="center">
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

          {bookmarksPostsStatus === 'loading' ? (
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
            bookmarksPosts.length == 0 && (
              <Text fontSize="3xl" position="absolute" left="20rem">
                No Post Found...
              </Text>
            )
          )}

          {bookmarksPostsStatus !== 'loading' &&
            bookmarksPosts.length > 0 &&
            bookmarksPosts.map((post, index) => (
              <Post
                key={uuid()}
                postData={post}
                currentUserId={userId}
                index={index}
                pageName={'bookmarks'}
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
