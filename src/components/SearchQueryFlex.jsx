import { Flex, Avatar, Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const SearchQueryFlex = ({ userData }) => {
  const { name, userName, userId, profileImageUrl } = userData;
  return (
    <Flex align="center" marginY={2}>
      <Avatar
        as={Link}
        to={`/user/${userId}`}
        name={name}
        src={profileImageUrl}
      />
      <Box
        as={Link}
        to={`/user/${userId}`}
        marginLeft="5"
        height={'max-content'}
        width="100%"
        cursor="pointer"
      >
        <Flex direction="column">
          <Text fontWeight="bold">{name}</Text>
          <Text>@{userName}</Text>
        </Flex>
      </Box>
    </Flex>
  );
};
