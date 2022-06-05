import { Container, Flex, Input } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';

export const SearchBar = () => {
  return (
    <>
      <Container
        // w="379px"
        h="56px"
        bg="#D3D3D3"
        color="black"
        border="2px"
        borderColor="#D3D3D3"
        borderRadius={5}
        _hover={{ border: '2px', borderColor: 'brand.300' }}
      >
        <Flex
          alignItems="center"
          paddingTop="2px"
          justifyContent="space-between"
        >
          <AiOutlineSearch size="2rem" />
          <Input
            placeholder="Search"
            size="lg"
            marginLeft="10px"
            width="100%"
            color="black"
            variant="outline"
            _placeholder={{ color: 'black' }}
            _focus={{}}
            border="none"
            _hover={{}}
          />
        </Flex>
      </Container>
    </>
  );
};
