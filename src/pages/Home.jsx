import { SideNavBar } from '../components/layouts/SideNavBar';
import { TopBar } from '../components/TopBar';
import { Post } from '../components/cards/Post';
import { SearchBar } from '../components/SearchBar';
import { WhoToFollow } from '../components/cards/WhoToFollow';
import { CreatePost } from '../components/cards/CreatePost';
import {
  Box,
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

export const Home = () => {
  return (
    <Container maxWidth="100vw" padding={0}>
      <TopBar />
      <Grid
        templateColumns={'1fr 3fr 1.5fr'}
        gap="4"
        justifyContent="center"
        marginX="2"
      >
        <SideNavBar as={GridItem} />

        <Box as={GridItem} marginTop="20">
          <HStack marginTop="1" marginBottom="30" justifyContent="center">
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
              variant="solid"
            >
              Newest
            </Button>
            <Button
              leftIcon={<AiOutlineArrowDown size="1.25rem" />}
              colorScheme="teal"
              variant="outline"
            >
              Oldest
            </Button>
          </HStack>
          <CreatePost />
          <Divider marginTop="4" borderColor="black" />
          <Post />
          <Post />
        </Box>
        <Box
          as={GridItem}
          position="sticky"
          z-index="4"
          top="86px"
          height="max-content"
        >
          <SearchBar />
          <WhoToFollow />
        </Box>
      </Grid>
    </Container>
  );
};
