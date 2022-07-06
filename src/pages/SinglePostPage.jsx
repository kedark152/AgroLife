/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Container,
  Grid,
  GridItem,
  // Divider,
  Spinner,
} from '@chakra-ui/react';
import { TopBar } from '../components/TopBar';
import { SideNavBar } from '../components/layouts/SideNavBar';
import { SearchBar } from '../components/SearchBar';
import { WhoToFollow } from '../components/cards/WhoToFollow';
import { Post } from '../components/cards/Post';
import { CommentContainer } from '../components/cards/CommentContainer';
import { v4 as uuid } from 'uuid';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePost } from '../features/post/singlePostPageSlice';
import { useCrudToast } from '../hooks/useCrudToast';
import { useLikeToast } from '../hooks/useLikeToast';
import { useBookmarkToast } from '../hooks/useBookmarkToast';
import { useCommentCrudToast } from '../hooks/useCommentCrudToast';
import { getSinglePostComments } from '../features/post/singlePostPageSlice';
import { MobileMenu } from '../components/layouts/MobileMenu';
export const SinglePostPage = () => {
  let {
    // userId,
    postId,
  } = useParams();
  const dispatch = useDispatch();
  const singlePostState = useSelector(state => state.singlePostPage);
  const postStatus = singlePostState.postStatus;
  const postData = singlePostState.postData;
  const currentUserId = useSelector(state => state.auth.userData.uid);
  useEffect(() => {
    dispatch(getSinglePost({ postId }));
    dispatch(getSinglePostComments({ postId }));
  }, []);

  //use-Effect Toasts
  useCrudToast();
  useLikeToast();
  useBookmarkToast();
  useCommentCrudToast();
  return (
    <>
      <Container maxWidth="100vw" padding={0}>
        <TopBar />

        <Grid
          templateColumns={['1fr', '1fr', '1fr', '1fr 3fr 1.5fr']}
          gap="1"
          justifyContent="center"
          marginTop="5rem"
        >
          <Box
            as={GridItem}
            display={['none', 'none', 'none', 'block']}
            position="sticky"
            top="86px"
            left="10px"
            height="max-content"
          >
            <SideNavBar />
          </Box>

          <Box as={GridItem}>
            {postStatus == 'loading' && (
              <Spinner
                position="absolute"
                thickness="4px"
                speed="0.25s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
                left="35rem"
                top="5rem"
              />
            )}
            {postStatus == 'success' && (
              <>
                <Post
                  key={uuid()}
                  postData={postData}
                  currentUserId={currentUserId}
                  // index={0}
                  pageName={'singlePostPage'}
                />
                <CommentContainer postId={postId} />
              </>
            )}
          </Box>
          <Box
            as={GridItem}
            display={['none', 'none', 'none', 'block']}
            position="sticky"
            top="86px"
            right="10px"
            height="max-content"
          >
            <SearchBar />
            <WhoToFollow />
          </Box>
          <MobileMenu />
        </Grid>
      </Container>
    </>
  );
};
