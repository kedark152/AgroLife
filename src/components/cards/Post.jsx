import { Container, Flex, Avatar, Box, Text, Image } from '@chakra-ui/react';
import { AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai';
import { GoComment } from 'react-icons/go';
import { PostCardOptions } from '../PostCardOptions';

export const Post = ({ postData }) => {
  const { postId, textContent, imageUrl, name, userName, uploadDate } =
    postData;
  return (
    <Container
      bg="#D3D3D3"
      p="1rem"
      borderRadius={5}
      marginY="5"
      color="black"
      id={postId}
    >
      <Flex>
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        <Box marginLeft="5" height={'max-content'} width="100%">
          <Flex>
            <Text fontWeight="bold">{name}</Text>
            <Text>• @{userName}</Text>

            <Text>• {uploadDate}</Text>
          </Flex>
          {imageUrl.length !== 0 && (
            <Image
              my="10px"
              boxSize="100%"
              // border="1px"
              objectFit="cover"
              src={imageUrl}
              alt="Indian Farmer"
              borderRadius={10}
            />
          )}
          <Box>{textContent}</Box>
          <Flex
            justifyContent="space-between"
            marginTop="1rem"
            marginBottom="5px"
          >
            <AiOutlineHeart size="1.3rem" />
            <GoComment size="1.3rem" />
            <AiOutlineShareAlt size="1.3rem" />
            <PostCardOptions postId={postId} postData={postData} />
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};
