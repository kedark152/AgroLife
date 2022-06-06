import { Container, Flex, Avatar, Box, Text, Image } from '@chakra-ui/react';
import { AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai';
import { GoComment } from 'react-icons/go';
import { BsThreeDots } from 'react-icons/bs';

export const Post = () => {
  return (
    <>
      <Container
        bg="#D3D3D3"
        // w="30rem"
        p="1rem"
        borderRadius={5}
        marginY="5"
        color="black"
      >
        <Flex>
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          <Box marginLeft="5" height={'max-content'} width="100%">
            <Flex>
              <Text fontWeight="bold">Indian Farmer</Text>
              <Text>• @indianFarmer</Text>

              <Text>• 2mins ago</Text>
            </Flex>
            <Image
              my="10px"
              boxSize="100%"
              border="1px"
              objectFit="cover"
              src="https://scontent.fbom6-1.fna.fbcdn.net/v/t39.30808-6/271792179_464422788584916_3789902073184369007_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=730e14&_nc_ohc=acgh2UqnrnUAX8vroqZ&tn=2WTMVR8BG9yAbLU2&_nc_ht=scontent.fbom6-1.fna&oh=00_AT9Woo2XJwBWPAjtFk24dycsFxOC1r8KtUzNyAqpLcrGrQ&oe=62A0BE01"
              alt="Indian Farmer"
            />
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
