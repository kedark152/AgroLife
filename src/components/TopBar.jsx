import { HStack, Heading } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { NavLink } from 'react-router-dom';
export const TopBar = () => {
  return (
    <HStack
      width="100%"
      bg="#4a4e69"
      color="white"
      position="fixed"
      top="0"
      left="0"
      zIndex="9999"
    >
      <Heading
        as={NavLink}
        to="/"
        size="xl"
        noOfLines="2"
        lineHeight={1.6}
        fontFamily="Dancing Script, cursive"
        marginX="2rem"
      >
        AgroLife
      </Heading>
      <ColorModeSwitcher position="absolute" right="2rem" />
    </HStack>
  );
};
