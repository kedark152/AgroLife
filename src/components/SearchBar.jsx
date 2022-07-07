import {
  Container,
  Flex,
  Input,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { SearchQueryFlex } from './SearchQueryFlex';
import { useState } from 'react';
export const SearchBar = () => {
  const cardBgColor = useColorModeValue('#D3D3D3', 'gray.800');
  const searchResultBgColor = useColorModeValue('white', 'black');
  const cardTextColor = useColorModeValue('black', 'gray.200');
  const allUser = useSelector(state => state.user.allUser);
  const [searchQuery, setSearchQuery] = useState('');
  const getSearchUsers = allUser.filter(user =>
    user.name.toLowerCase().includes(searchQuery)
  );

  return (
    <>
      <Container
        // w="379px"
        h="56px"
        bg={cardBgColor}
        color={cardTextColor}
        // border="2px"
        // borderColor="#D3D3D3"
        borderRadius={5}
        // _hover={{ border: '2px', borderColor: 'brand.300' }}
        position="relative"
      >
        <Flex
          alignItems="center"
          paddingTop="2px"
          justifyContent="space-between"
        >
          <AiOutlineSearch size="2rem" />
          <Input
            placeholder="Search your friends.."
            size="lg"
            marginLeft="10px"
            width="100%"
            color={cardTextColor}
            variant="outline"
            _placeholder={{ color: { cardTextColor } }}
            _focus={{}}
            border="none"
            _hover={{}}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value.toLowerCase())}
          />
          <Box
            // border="black"
            position="absolute"
            top="3rem"
            zIndex={2}
            bg={searchResultBgColor}
            color={cardTextColor}
            width="90%"
            padding="2"
            borderRadius="5"
            display={searchQuery.length < 2 && `none`}
          >
            {getSearchUsers.length == 0 && `No users found`}
            {getSearchUsers.map(user => (
              <SearchQueryFlex key={user.uid} userData={user} />
            ))}
          </Box>
        </Flex>
      </Container>
    </>
  );
};
