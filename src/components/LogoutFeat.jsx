import {
  Popover,
  PopoverTrigger,
  PopoverHeader,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  useDisclosure,
  IconButton,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../features/auth/authSlice';

export const LogoutFeat = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const userProfileState = useSelector(state => state.user);
  const userProfileStatus = userProfileState.userProfileStatus;
  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={onClose}
      placement="top"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <IconButton
          aria-label="Logout icon"
          icon={<FiLogOut size="1.2rem" />}
          onClick={onToggle}
          disabled={userProfileStatus == 'loading'}
        />
      </PopoverTrigger>
      <PopoverContent w="10rem">
        <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>Are you sure you want to logout?</PopoverBody>
        <PopoverFooter display="flex" justifyContent="flex-start">
          <ButtonGroup size="sm">
            <Button variant="outline" onClick={onToggle}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={() => dispatch(userLogout())}>
              Yes
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
