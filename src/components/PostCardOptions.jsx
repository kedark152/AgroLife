import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverFooter,
  useDisclosure,
  IconButton,
  ButtonGroup,
  Flex,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deletePost } from '../features/post/postModalSlice';
import { EditPostModal } from './EditPostModal';

export const PostCardOptions = ({ postId, postData }) => {
  const iconColor = useColorModeValue('black', 'gray.100');
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
          aria-label="more-options"
          icon={<BsThreeDots size="1.3rem" />}
          onClick={onToggle}
          colorScheme="transparent"
          color={iconColor}
        />
      </PopoverTrigger>
      <PopoverContent w="10rem">
        <PopoverArrow />
        <PopoverBody>
          <Flex direction="column" gap="1rem">
            <EditPostModal postData={postData} />
            <Button
              variant="outline"
              colorScheme="red"
              rightIcon={<MdDelete size="1.2rem" />}
              onClick={() => dispatch(deletePost(postId))}
            >
              Delete Post
            </Button>
          </Flex>
        </PopoverBody>
        <PopoverFooter display="flex" justifyContent="flex-end">
          <ButtonGroup size="sm">
            <Button variant="outline" onClick={onToggle}>
              Cancel
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
