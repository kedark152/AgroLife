/* eslint-disable react-hooks/exhaustive-deps */
import {
  FormControl,
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
  IconButton,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TopBar } from '../components/TopBar';
import { useNavigate, NavLink } from 'react-router-dom';
import { STATUSES } from '../utilities/statusesConstants';
import { setStatus } from '../features/auth/authSlice';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { userSignup } from '../features/auth/authSlice';
export const Signup = () => {
  // Used to Show/Hide Passwords
  const [passwordType, setPasswordType] = useState('password');
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector(state => state.auth);
  const initialInputState = {
    fullName: '',
    userName: '',
    email: '',
    password: '',
    termsTick: false,
  };

  const [input, setInput] = useState(initialInputState);

  const handleSignupForm = e => {
    e.preventDefault();
    dispatch(userSignup(input));
  };

  useEffect(() => {
    if (authState.status === STATUSES.SUCCESS) {
      setInput(initialInputState);
      toast({
        title: 'Account created.',
        description: "We've created new account for you.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/home');
      dispatch(setStatus({ status: STATUSES.IDLE, message: '' }));
    }
    if (authState.status === STATUSES.ERROR) {
      setInput(initialInputState);
      toast({
        title: 'Unable to create your account!',
        description: authState.statusMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      dispatch(setStatus({ status: STATUSES.IDLE, message: '' }));
    }
  }, [authState.status]);

  return (
    <Container maxWidth="100vw" padding={0} centerContent>
      <TopBar />
      <Box
        as="form"
        width={['90vw', '90vw', '30rem']}
        height="max-content"
        boxShadow="2xl"
        rounded="md"
        marginTop="5rem"
        padding="15px"
        borderRadius="10"
        onSubmit={handleSignupForm}
      >
        <Heading as="h2" size="2xl" margin="1" textAlign="center">
          Signup
        </Heading>
        <Flex direction="column" gap="5px">
          <FormControl isRequired>
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
              value={input.fullName}
              onChange={e =>
                setInput(input => ({ ...input, fullName: e.target.value }))
              }
            />
          </FormControl>
          <FormControl isRequired>
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
              value={input.userName}
              onChange={e =>
                setInput(input => ({ ...input, userName: e.target.value }))
              }
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="emailField" fontWeight="bold">
              Email Address
            </FormLabel>
            <Input
              type="email"
              pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
              size="md"
              variant="outline"
              id="emailField"
              placeholder="Email"
              borderRadius="5px"
              marginBottom="5px"
              value={input.email}
              onChange={e =>
                setInput(input => ({ ...input, email: e.target.value }))
              }
            />
          </FormControl>

          <Box position="relative">
            <FormControl isRequired>
              <FormLabel htmlFor="passwordField" fontWeight="bold">
                Password
              </FormLabel>

              <Input
                size="md"
                id="passwordField"
                type={passwordType}
                placeholder="Password"
                borderRadius="5px"
                marginBottom="5px"
                value={input.password}
                minLength="8"
                onChange={e =>
                  setInput(input => ({ ...input, password: e.target.value }))
                }
              />

              <IconButton
                variant="outline"
                colorScheme="teal"
                aria-label="Call Sage"
                border="none"
                fontSize="30px"
                zIndex="2"
                icon={
                  passwordType == 'password' ? (
                    <AiFillEye />
                  ) : (
                    <AiFillEyeInvisible />
                  )
                }
                position="absolute"
                right="10px"
                onClick={() =>
                  setPasswordType(passwordType =>
                    passwordType === 'password' ? 'text' : 'password'
                  )
                }
              />
            </FormControl>
          </Box>

          <FormControl isRequired>
            <Checkbox
              isChecked={input.termsTick}
              onChange={() =>
                setInput(input => ({ ...input, termsTick: !input.termsTick }))
              }
            >
              I accept all Terms & Conditions*
            </Checkbox>
          </FormControl>

          <Button
            isLoading={authState.status === STATUSES.LOADING}
            loadingText={
              authState.status === STATUSES.LOADING && `Loading...Please wait`
            }
            type="submit"
            colorScheme="brand"
            size="lg"
          >
            Create New Account
          </Button>
        </Flex>
        <Divider marginTop="10px" borderWidth="1px" borderColor="grey.50" />
        <Flex direction="column">
          <Button
            colorScheme="whatsapp"
            size="md"
            variant="solid"
            margin={['1rem 2.5rem', '1rem 4.5rem', '1rem 5.5rem']}
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
