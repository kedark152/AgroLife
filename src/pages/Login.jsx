/* eslint-disable react-hooks/exhaustive-deps */
import {
  FormControl,
  IconButton,
  Container,
  Flex,
  Box,
  Spacer,
  Heading,
  Input,
  FormLabel,
  Button,
  Divider,
  Image,
  Text,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { NavLink } from 'react-router-dom';
import { Footer } from '../components/layouts/Footer';
import '@fontsource/dancing-script';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../features/auth/authSlice';
import { useToast } from '@chakra-ui/react';
import { setStatus } from '../features/auth/authSlice';
import { STATUSES } from '../utilities/statusesConstants';

export const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/home';
  // Used to Show/Hide Password
  const [passwordType, setPasswordType] = useState('password');
  const initialInputState = {
    email: '',
    password: '',
  };

  const [input, setInput] = useState(initialInputState);
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);

  const handleSignin = e => {
    e.preventDefault();
    dispatch(userLogin(input));
  };

  useEffect(() => {
    if (authState.status === STATUSES.ERROR) {
      setInput(initialInputState);
      toast({
        title: 'Sorry, Unable to Login!',
        description: authState.statusMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      dispatch(setStatus({ status: STATUSES.IDLE, message: '' }));
    }
  }, [authState.status]);

  useEffect(() => {
    if (authState.statusMessage === STATUSES.LOGGED_IN) {
      setInput(initialInputState);

      toast({
        title: 'Login Successful.',
        description: 'You are logged in',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      dispatch(setStatus({ status: STATUSES.IDLE, message: '' }));
    }
    if (authState.statusMessage === STATUSES.LOGGED_OUT) {
      toast({
        title: 'Logout Success.',
        description: 'You are logged out',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      dispatch(setStatus({ status: STATUSES.IDLE, message: '' }));
    }
  }, [authState.statusMessage]);

  useEffect(() => {
    if (authState.userData) {
      navigate(from, { replace: true });
    }
  }, [authState.userData]);

  return (
    <>
      <ColorModeSwitcher position="absolute" right="2rem" />
      <Container minWidth="80vw" height="80vh" p="0">
        <Flex height="90%" direction={['column', 'row', 'row']}>
          <Box p="2" my={['2rem', '3rem', '5rem']}>
            <Image
              boxSize={['90px', '90px', '120px']}
              mx={['40vw', '4vw', '18vw']}
              src="https://res.cloudinary.com/dvuh4fz9d/image/upload/v1658239218/planet-earth_1_x4ukjv.png"
            />
            <Text
              fontSize={['5xl', '4xl', '6xl']}
              fontWeight="bold"
              noOfLines="1"
              fontFamily="Dancing Script, cursive"
              textAlign="center"
              marginBottom="2"
            >
              AgroLife
            </Text>
            <Spacer />
            <Heading
              as="h3"
              size={['md', 'md', 'xl']}
              noOfLines="4"
              textAlign="center"
            >
              Connect & share your agrolife stories with friends
            </Heading>
          </Box>
          <Spacer />
          <Box
            as="form"
            width={['90vw', '90vw', '30rem']}
            height="max-content"
            boxShadow="2xl"
            rounded="md"
            marginTop={['1rem', '2rem', '4rem']}
            marginX={['2rem', null, null]}
            padding="15px"
            borderRadius="10"
            onSubmit={handleSignin}
          >
            <Flex direction="column" gap="10px">
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
                      setInput(input => ({
                        ...input,
                        password: e.target.value,
                      }))
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
              <Button
                isLoading={authState.status === STATUSES.LOADING}
                loadingText={
                  authState.status === STATUSES.LOADING &&
                  `Signing in...Please wait`
                }
                type="submit"
                colorScheme="brand"
                size="lg"
              >
                Log In
              </Button>
              {/* {authState.status !== STATUSES.LOADING && (
                <Button
                  type="submit"
                  colorScheme="teal"
                  variant="outline"
                  onClick={() =>
                    setInput({
                      email: 'kedar@agrolife.com',
                      password: 'kedarInGoa@123',
                    })
                  }
                >
                  Test Login
                </Button>
              )} */}
            </Flex>
            <Divider marginTop="1rem" borderWidth="1px" borderColor="grey.50" />
            <Flex direction="column">
              <Button
                colorScheme="whatsapp"
                size="md"
                variant="solid"
                margin={['1rem 2.5rem', '1rem 4.5rem', '1rem 5.5rem']}
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
