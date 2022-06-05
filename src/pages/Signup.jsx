import {
  Box,
  Flex,
  FormLabel,
  Input,
  Button,
  Checkbox,
  Divider,
  Container,
  Text,
  Heading,
} from '@chakra-ui/react';

import { TopBar } from '../components/TopBar';
import { NavLink } from 'react-router-dom';

export const Signup = () => {
  return (
    <Container maxWidth="100vw" padding={0} centerContent>
      <TopBar />
      <Box
        width="30rem"
        height="max-content"
        boxShadow="2xl"
        rounded="md"
        marginTop="5rem"
        padding="15px"
        borderRadius="10"
      >
        <Heading as="h2" size="2xl" margin="1" textAlign="center">
          Signup
        </Heading>
        <Flex direction="column" gap="5px">
          <FormLabel htmlFor="first-name" fontWeight="bold">
            Full Name
            <Text as="em" fontSize="sm" marginLeft="1">
              (FirstName LastName)
            </Text>
          </FormLabel>
          <Input
            size="md"
            variant="outline"
            id="first-name"
            placeholder="Enter Fullname"
            borderRadius="5px"
            marginBottom="5px"
          />
          <FormLabel htmlFor="user-name" fontWeight="bold">
            User Name
          </FormLabel>
          <Input
            size="md"
            variant="outline"
            id="user-name"
            placeholder="Enter Username"
            borderRadius="5px"
            marginBottom="5px"
          />

          <FormLabel htmlFor="emailField" fontWeight="bold">
            Email Address
          </FormLabel>
          <Input
            size="md"
            variant="outline"
            id="emailField"
            placeholder="Email"
            borderRadius="5px"
            marginBottom="5px"
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
            marginBottom="5px"
          />
          <FormLabel htmlFor="cnfPasswordField" fontWeight="bold">
            Confirm Password
          </FormLabel>
          <Input
            size="md"
            id="cnfPasswordField"
            type="password"
            placeholder="Re-Enter Password"
            borderRadius="5px"
            marginBottom="5px"
          />
          <Checkbox>I accept all Terms & Conditions*</Checkbox>
          <Button colorScheme="brand" size="lg">
            Create New Account
          </Button>
        </Flex>
        <Divider marginTop="10px" borderWidth="1px" borderColor="grey.50" />
        <Flex direction="column">
          <Button
            colorScheme="whatsapp"
            size="md"
            variant="solid"
            margin="1rem 5.5rem"
            as={NavLink}
            to="/"
          >
            Already Have an Account?
          </Button>
        </Flex>
      </Box>
    </Container>
  );
};
