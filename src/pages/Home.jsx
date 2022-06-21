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
import { useDispatch } from 'react-redux';
import { sortPostsBy } from '../utilities/utils';
import { setAllPosts } from '../features/post/postSlice';
import { STATUSES } from '../utilities/statusesConstants';
import { useCrudToast } from '../hooks/useCrudToast';

export const Home = () => {
  const dispatch = useDispatch();
  const [sortPosts, setSortPosts] = useState('newest');
  const { allPosts, allPostsStatus } = useCrudToast(sortPosts); //uses useEffect

  useEffect(() => {
    //for sorting post on sort state change
    if (allPostsStatus === STATUSES.SUCCESS) {
      dispatch(setAllPosts(sortPostsBy(allPosts, sortPosts)));
    }
  }, [sortPosts]);

  return (
    <Container maxWidth="100vw" padding={0}>
      <TopBar />

      <Grid
        templateColumns={'1fr 3fr 1.2fr'}
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

          {allPostsStatus === 'loading' ? (
            <Spinner
              position="absolute"
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              left="35rem"
              top="15rem"
            />
          ) : (
            allPosts.length == 0 && (
              <Text fontSize="3xl" position="absolute" left="20rem">
                No Post Found...
              </Text>
            )
          )}

          {allPostsStatus !== 'loading' &&
            allPosts.length > 0 &&
            allPosts.map(post => <Post key={uuid()} postData={post} />)}
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
