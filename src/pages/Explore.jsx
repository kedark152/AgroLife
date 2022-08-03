/* eslint-disable react-hooks/exhaustive-deps */
import { SideNavBar } from '../components/layouts/SideNavBar';
import { TopBar } from '../components/TopBar';
import { Post } from '../components/cards/Post';
import { SearchBar } from '../components/SearchBar';
import { WhoToFollow } from '../components/cards/WhoToFollow';
import { STATUSES } from '../utilities/statusesConstants';
import { getAllPosts } from '../features/post/postSlice';
import { setExplorePosts } from '../features/post/postSlice';
import { sortByCategories } from '../utilities/utils';
import { v4 as uuid } from 'uuid';
import { useCrudToast } from '../hooks/useCrudToast';
import { useBookmarkToast } from '../hooks/useBookmarkToast';
import { useLikeToast } from '../hooks/useLikeToast';
import { AiFillFire } from 'react-icons/ai';
import { CgSmartphoneChip } from 'react-icons/cg';
import { RiNewspaperLine, RiPlantLine } from 'react-icons/ri';
import {
  Box,
  Container,
  Grid,
  GridItem,
  HStack,
  Button,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MobileMenu } from '../components/layouts/MobileMenu';
import { CreatePostModal } from '../components/CreatePostModal';
export const Explore = () => {
  const explorePosts = useSelector(state => state.post.explorePosts);
  
  const allPosts = useSelector(state => state.post.allPosts);
  const allPostsStatus = useSelector(state => state.post.allPostsStatus);
  const postModalState = useSelector(state => state.postModal);
  const authState = useSelector(state => state.auth);
  const currentUserId = authState.userData.uid;
  const dispatch = useDispatch();
  const [currentCategory, setCurrentCategory] = useState('Trending');

  useEffect(() => {
    dispatch(getAllPosts('newest'));
  }, [postModalState.status == STATUSES.SUCCESS]);

  useEffect(() => {
    if (allPostsStatus == 'success') {
      dispatch(setExplorePosts(sortByCategories(allPosts, currentCategory)));
    }
  }, [allPostsStatus == 'success', currentCategory]);

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
          <HStack marginBottom="5" justifyContent="center">
            <Button
              colorScheme="teal"
              leftIcon={<AiFillFire size="1.25rem" />}
              variant={currentCategory == 'Trending' ? 'solid' : 'outline'}
              onClick={() => setCurrentCategory('Trending')}
            >
              Trending
            </Button>
            <Button
              colorScheme="teal"
              variant={currentCategory == 'Facts' ? 'solid' : 'outline'}
              onClick={() => setCurrentCategory('Facts')}
            >
              Facts
            </Button>

            <Button
              leftIcon={<RiNewspaperLine size="1.25rem" />}
              colorScheme="teal"
              variant={currentCategory == 'News' ? 'solid' : 'outline'}
              onClick={() => setCurrentCategory('News')}
            >
              News
            </Button>
          </HStack>
          <HStack marginBottom="30" justifyContent="center">
            <Button
              leftIcon={<CgSmartphoneChip size="1.25rem" />}
              colorScheme="teal"
              variant={currentCategory == 'Technology' ? 'solid' : 'outline'}
              onClick={() => setCurrentCategory('Technology')}
            >
              Technology
            </Button>

            <Button
              colorScheme="teal"
              leftIcon={<RiPlantLine size="1.25rem" />}
              variant={currentCategory == 'Hydroponic' ? 'solid' : 'outline'}
              onClick={() => setCurrentCategory('Hydroponic')}
            >
              Hydroponic
            </Button>
          </HStack>

          {allPostsStatus === 'loading' ? (
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
            explorePosts.length == 0 && (
              <Text fontSize="3xl" position="absolute" left="20rem">
                No Post Found...
              </Text>
            )
          )}

          {allPostsStatus !== 'loading' &&
            explorePosts.length > 0 &&
            explorePosts.map((post, index) => (
              <Post
                key={uuid()}
                postData={post}
                currentUserId={currentUserId}
                index={index}
                pageName={'explore'}
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
