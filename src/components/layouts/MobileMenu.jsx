import { HStack, IconButton, useColorModeValue } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { MdExplore } from 'react-icons/md';
import { BsBookmark } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { useSelector } from 'react-redux';

export const MobileMenu = () => {
  const menuBgColor = useColorModeValue('#f7f7f7', '#1a202c');
  const authState = useSelector(state => state.auth);
  const { uid } = authState.userData;
  //   const getActiveStyle = ({ isActive }) => {};
  const getActiveStyle = ({ isActive }) => ({
    backgroundColor: isActive ? 'teal' : 'none',
    color: isActive ? 'white' : 'none',
  });
  return (
    <HStack
      justifyContent="space-between"
      width="full"
      backgroundColor={menuBgColor}
      paddingY={4}
      paddingX={5}
      position="fixed"
      left="0"
      bottom="0"
      display={['flex', 'flex', 'none']}
    >
      <IconButton
        as={NavLink}
        to="/home"
        aria-label="home"
        icon={<AiOutlineHome size="1.2rem" />}
        borderRadius="1rem"
        size="sm"
        style={getActiveStyle}
      />
      <IconButton
        as={NavLink}
        to="/explore"
        aria-label="explore"
        icon={<MdExplore size="1.2rem" />}
        borderRadius="1rem"
        style={getActiveStyle}
        size="sm"
      />
      <IconButton
        as={NavLink}
        to="/bookmarks"
        aria-label="bookmark"
        icon={<BsBookmark size="1.2rem" />}
        borderRadius="1rem"
        style={getActiveStyle}
        size="sm"
      />
      <IconButton
        as={NavLink}
        to={`/user/${uid}`}
        aria-label="Change Profile Pic"
        icon={<CgProfile size="1.2rem" />}
        borderRadius="1rem"
        style={getActiveStyle}
        size="sm"
      />
    </HStack>
  );
};
