/* eslint-disable react-hooks/exhaustive-deps */
import { SideNavBar } from '../components/layouts/SideNavBar';
import { TopBar } from '../components/TopBar';
import { Post } from '../components/cards/Post';
import { SearchBar } from '../components/SearchBar';
import { WhoToFollow } from '../components/cards/WhoToFollow';
import {
  Box,
  Container,
  Grid,
  GridItem,
  Image,
  Divider,
  Avatar,
  Flex,
  Text,
  VStack,
  Button,
  Spinner,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

import { useCrudToast } from '../hooks/useCrudToast';

export const MyProfile = () => {
  const defaultHeaderImg = 'https://tiny.cc/defaultHeaderImg';

  const authState = useSelector(state => state.auth);
  const { userName, name, bio, followers, following } = authState.userData;
  const { allPosts, allPostsStatus } = useCrudToast('newest');

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

        <Box as={GridItem} position="relative">
          <Box
            width="100%"
            height="12rem"
            position="absolute"
            top="10px"
            borderRadius="14px"
          >
            <Image
              // src={headerImage}
              boxSize="100%"
              objectFit="cover"
              borderRadius="14px"
              fallbackSrc={defaultHeaderImg}
            />
          </Box>
          <VStack marginBottom="30" marginTop="8rem" justifyContent="center">
            <Avatar
              size="2xl"
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            />

            <Flex direction="column" position="relative">
              <Text fontWeight="bold" fontSize="xl">
                {name}
              </Text>
              <Text marginLeft="5">@{userName}</Text>

              <Button colorScheme="teal" variant="outline" marginY="2">
                Edit Profile
              </Button>
            </Flex>
            <Text marginLeft="5">
              {following.length} Following • {followers.length} Followers
            </Text>
            <Text>{bio}</Text>
          </VStack>

          <Divider marginTop="4" borderColor="black" />
          <Text fontWeight="bold" fontSize="xl">
            My Recent Posts
          </Text>

          {allPostsStatus === 'loading' ? (
            <Spinner
              position="absolute"
              thickness="4px"
              speed="0.8s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              left="20rem"
              top="35rem"
            />
          ) : (
            allPosts.length == 0 && (
              <Text fontSize="3xl" position="absolute" top="35rem" left="20rem">
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
