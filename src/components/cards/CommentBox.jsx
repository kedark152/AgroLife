import { Container, Flex, Avatar, Box, Text } from '@chakra-ui/react';
import { AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai';
import { GoComment } from 'react-icons/go';
import { BsThreeDots } from 'react-icons/bs';

export const CommentBox = () => {
  return (
    <>
      <Container
        bg="#c0c0c0"
        w="26rem"
        p="1rem"
        borderRadius={5}
        marginY="3"
        color="black"
      >
        <Flex>
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          <Box marginLeft="5" height={'max-content'} width="100%">
            <Flex>
              <Text fontWeight="bold">Tanay Pratap</Text>
              <Text>• @tanayPT</Text>
              <Text>• 2mins ago</Text>
            </Flex>
            <Text>Replying to • @tanayPT </Text>
            <Box>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id est
              explicabo, debitis perferendis, quos harum, non hic nesciunt rerum
              eius porro molestias? Nesciunt itaque, ab accusantium vel quis
              reiciendis quod, sapiente aliquam nisi molestiae facilis
              doloremque nemo enim ratione dolorem voluptatum voluptas!
              Consequuntur dolor perferendis quis, facere natus odit. Magnam.
            </Box>
            <Flex
              justifyContent="space-between"
              marginTop="1rem"
              marginBottom="5px"
            >
              <AiOutlineHeart size="1.3rem" />
              <GoComment size="1.3rem" />
              <AiOutlineShareAlt size="1.3rem" />
              <BsThreeDots size="1.3rem" />
            </Flex>
          </Box>
        </Flex>
      </Container>
    </>
  );
};
