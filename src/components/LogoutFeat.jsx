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
import { useDispatch } from 'react-redux';
import { userLogout } from '../features/auth/authSlice';

export const LogoutFeat = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const dispatch = useDispatch();
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
        />
      </PopoverTrigger>
      <PopoverContent w="12rem">
        <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>Are you sure you want to logout?</PopoverBody>
        <PopoverFooter display="flex" justifyContent="flex-end">
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
