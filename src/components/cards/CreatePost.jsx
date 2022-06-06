import {
  Container,
  Flex,
  Avatar,
  Box,
  Divider,
  Button,
} from '@chakra-ui/react';
import { BsCardImage } from 'react-icons/bs';
import { RiFileGifLine } from 'react-icons/ri';
import { GrEmoji } from 'react-icons/gr';

export const CreatePost = () => {
  return (
    <Container
      bg="#D3D3D3"
      // w="30rem"
      p="1rem"
      borderRadius={5}
      color="black"
    >
      <Flex>
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        <Box marginLeft="5" height={'6rem'} width="100%" bg="#DCDCDC" p="2">
          Write Something Interesting...
        </Box>
      </Flex>
      <Divider my="2" borderColor="black" />
      <Flex align={'center'} gap={2}>
        <BsCardImage fontSize="1.5rem" />
        <RiFileGifLine fontSize="1.5rem" />
        <GrEmoji fontSize="1.5rem" />
        <Button colorScheme="brand" size="sm" marginLeft="auto">
          Post
        </Button>
      </Flex>
    </Container>
  );
};
