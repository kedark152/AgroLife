import { Button, Image, Flex } from '@chakra-ui/react';
import { AiFillHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
export const ErrorPage = () => {
  return (
    <>
      <ColorModeSwitcher position="absolute" left="1rem" />
      <Flex
        direction="column"
        width={['22rem', '30rem', '50rem']}
        marginTop="2rem"
        marginLeft={['2rem', '5rem', '16rem']}
        gap="5"
        alignItems="center"
      >
        <Image
          boxSize={['90%', '80%', '60%']}
          objectFit="cover"
          src="https://res.cloudinary.com/dvuh4fz9d/image/upload/v1657180587/404_error_with_person_looking_for-amico_pbiwro.svg"
        />
        <Button
          leftIcon={<AiFillHome size="1.25rem" />}
          size={['md', 'md', 'lg']}
          colorScheme="brand"
          as={Link}
          to="/home"
        >
          Go to Home Page
        </Button>
      </Flex>
    </>
  );
};
