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
  HStack,
  Button,
  Divider,
} from '@chakra-ui/react';

export const Explore = () => {
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
          <HStack marginTop="1" marginBottom="30" justifyContent="space-evenly">
            <Button colorScheme="teal" variant="solid">
              For You
            </Button>
            <Button colorScheme="teal" variant="solid">
              Trending
            </Button>
            <Button colorScheme="teal" variant="outline">
              Technology
            </Button>
            <Button colorScheme="teal" variant="outline">
              News
            </Button>
            <Button colorScheme="teal" variant="outline">
              Weather
            </Button>
          </HStack>

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
