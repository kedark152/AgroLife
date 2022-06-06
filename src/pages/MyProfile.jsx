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
  //   HStack,
  Divider,
  Avatar,
  Flex,
  Text,
  VStack,
  Button,
} from '@chakra-ui/react';

export const MyProfile = () => {
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
          <VStack marginTop="1" marginBottom="30" justifyContent="center">
            <Avatar
              size="2xl"
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            />
            <Flex direction="column">
              <Text fontWeight="bold" fontSize="xl">
                Tanay Pratap
              </Text>
              <Text marginLeft="5">@tanayPT</Text>

              <Button colorScheme="teal" variant="outline" marginY="2">
                Edit Profile
              </Button>
            </Flex>
            <Text marginLeft="5">338 Following • 20 Followers</Text>
            <Text>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Sapiente, quam? Voluptate consequatur cupiditate animi assumenda
              quasi. Aperiam totam repudiandae aliquid.
            </Text>
          </VStack>

          <Divider marginTop="4" borderColor="black" />
          <Text fontWeight="bold" fontSize="xl">
            Recent Posts
          </Text>
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
