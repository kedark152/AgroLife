import {
  Button,
  Container,
  Text,
  Flex,
  Divider,
  Avatar,
  Box,
} from '@chakra-ui/react';

export const WhoToFollow = () => {
  return (
    <Container bg="#D3D3D3" marginY="3" p="4" borderRadius={5} color="black">
      <Flex align="center" justifyContent="space-between" paddingY="2">
        <Text fontWeight="bold">Who to Follow</Text>
        <Button size="sm" colorScheme="brand">
          Show More
        </Button>
      </Flex>
      <Divider />
      {/* Users to follow */}
      <Flex align="center" marginY={2}>
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        <Box marginLeft="5" height={'max-content'} width="100%">
          <Flex direction="column">
            <Text fontWeight="bold">Tanay Pratap</Text>
            <Text>@tanayPT</Text>
          </Flex>
        </Box>
        <Button size="sm" colorScheme="brand" paddingX="1.2rem">
          Follow +
        </Button>
      </Flex>
      <Flex align="center" marginY={2}>
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        <Box marginLeft="5" height={'max-content'} width="100%">
          <Flex direction="column">
            <Text fontWeight="bold">Tanay Pratap</Text>
            <Text>@tanayPT</Text>
          </Flex>
        </Box>
        <Button size="sm" colorScheme="brand" paddingX="1.2rem">
          Follow +
        </Button>
      </Flex>
      <Flex align="center" marginY={2}>
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        <Box marginLeft="5" height={'max-content'} width="100%">
          <Flex direction="column">
            <Text fontWeight="bold">Tanay Pratap</Text>
            <Text>@tanayPT</Text>
          </Flex>
        </Box>
        <Button size="sm" colorScheme="brand" paddingX="1.2rem">
          Follow +
        </Button>
      </Flex>
      <Flex align="center" marginY={2}>
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        <Box marginLeft="5" height={'max-content'} width="100%">
          <Flex direction="column">
            <Text fontWeight="bold">Tanay Pratap</Text>
            <Text>@tanayPT</Text>
          </Flex>
        </Box>
        <Button size="sm" colorScheme="brand" paddingX="1.2rem">
          Follow +
        </Button>
      </Flex>
    </Container>
  );
};
