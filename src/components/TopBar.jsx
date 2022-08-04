import { HStack, Heading, useColorModeValue } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { NavLink } from 'react-router-dom';
export const TopBar = () => {
  const cardBgColor = useColorModeValue('teal', '#4a4e69');
  const cardTextColor = useColorModeValue('white', 'gray.200');
  return (
    <HStack
      width="100%"
      bg={cardBgColor}
      color={cardTextColor}
      position="fixed"
      top="0"
      left="0"
      zIndex="9999"
    >
      <Heading
        as={NavLink}
        to="/home"
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
