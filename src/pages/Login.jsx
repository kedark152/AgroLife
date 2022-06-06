import {
  Container,
  Flex,
  Box,
  Spacer,
  Heading,
  Input,
  FormLabel,
  Button,
  Link,
  Divider,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { NavLink } from 'react-router-dom';
import { Footer } from '../components/layouts/Footer';

import '@fontsource/dancing-script';

export const Login = () => {
  return (
    <>
      <ColorModeSwitcher position="absolute" right="2rem" />
      <Container minWidth="80vw" height="80vh" p="0">
        <Flex height="90%">
          <Box p="4" my="5rem">
            <Heading
              as="h1"
              size="4xl"
              noOfLines="2"
              lineHeight={1.6}
              fontFamily="Dancing Script, cursive"
            >
              AgroLife
            </Heading>
            <Spacer />
            <Heading as="h3" size="xl" noOfLines="2">
              Connect & Share your AgroLife Stories with Friends
            </Heading>
          </Box>
          <Spacer />
          <Box
            width="30rem"
            height="max-content"
            boxShadow="2xl"
            rounded="md"
            marginY="2rem"
            padding="15px"
            borderRadius="10"
          >
            <Flex direction="column" gap="10px">
              <FormLabel htmlFor="emailField" fontWeight="bold">
                Email Address
              </FormLabel>
              <Input
                size="md"
                variant="outline"
                id="emailField"
                placeholder="Email"
                borderRadius="5px"
              />
              <FormLabel htmlFor="passwordField" fontWeight="bold">
                Password
              </FormLabel>
              <Input
                size="md"
                id="passwordField"
                type="password"
                placeholder="Password"
                borderRadius="5px"
              />
              <Button colorScheme="brand" size="lg">
                Log In
              </Button>
              <Button
                as={NavLink}
                to="/home"
                colorScheme="teal"
                variant="outline"
              >
                Test Login (Go to Home Page)
              </Button>
              <Link color="black.500" href="#" marginY="5px">
                Forgot Password?
              </Link>

              {/* </Stack> */}
            </Flex>
            <Divider marginTop="10px" borderWidth="1px" borderColor="grey.50" />
            <Flex direction="column">
              <Button
                colorScheme="whatsapp"
                size="md"
                variant="solid"
                margin="1rem 5.5rem"
                as={NavLink}
                to="/signup"
              >
                Create New Account
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Container>

      <Footer />
    </>
  );
};
