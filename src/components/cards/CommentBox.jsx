import {
  Container,
  Flex,
  Avatar,
  Box,
  Text,
  IconButton,
  Button,
  Input,
  useBoolean,
  useColorModeValue,
} from '@chakra-ui/react';

import { MdEdit } from 'react-icons/md';
import { MdCancel } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import {
  deleteComment,
  updateComment,
  deleteCommentFromState,
  editCommentFromState,
} from '../../features/post/singlePostPageSlice';
import { useState } from 'react';
export const CommentBox = ({ commentData, postId, index }) => {
  const commentCardBgColor = useColorModeValue('#DBD7D2', 'gray.700');
  const iconColor = useColorModeValue('black', 'gray.100');
  const cardTextColor = useColorModeValue('black', 'gray.200');
  const {
    name,
    commentId,
    commentUserProfileUrl,
    commentText,
    commentUID,
    commentUserName,
    // createdAt,
  } = commentData;
  const dispatch = useDispatch();
  const [isEditing, setisEditing] = useBoolean();
  const [editComment, setEditComment] = useState(commentText);
  const authUserId = useSelector(state => state.auth.userData.uid);

  const handleDeleteComment = () => {
    dispatch(deleteComment({ postId, commentId })); //deletes comment from firebase
    dispatch(deleteCommentFromState(commentId));
  };

  const handleEditComment = () => {
    dispatch(updateComment({ postId, commentId, commentText: editComment }));
    dispatch(editCommentFromState({ index, commentText: editComment }));
    setisEditing.toggle();
  };

  return (
    <>
      <Container
        bg={commentCardBgColor}
        w="100%"
        p="1rem"
        borderRadius={5}
        marginY="3"
        color={cardTextColor}
      >
        <Flex>
          <Avatar name={name} src={commentUserProfileUrl} />
          <Box marginLeft="5" height={'max-content'} width="100%">
            <Flex alignItems="center" justifyContent="space-between">
              <Flex direction={['column', 'row', 'row']}>
                <Text fontWeight="bold">{name} •</Text>
                <Text> @{commentUserName}</Text>
              </Flex>
              {authUserId == commentUID && (
                <Flex alignItems="center" gap="0">
                  <IconButton
                    aria-label="edit-button-icon"
                    color={iconColor}
                    icon={
                      !isEditing ? (
                        <MdEdit size="1.3rem" />
                      ) : (
                        <MdCancel color="red" size="1.3rem" />
                      )
                    }
                    onClick={setisEditing.toggle}
                    colorScheme="transparent"
                    size="sm"
                  />
                  <IconButton
                    aria-label="delete-button-icon"
                    icon={<AiFillDelete size="1.3rem" />}
                    onClick={handleDeleteComment}
                    colorScheme="transparent"
                    color={iconColor}
                    size="sm"
                  />
                </Flex>
              )}
            </Flex>
            {isEditing && (
              <Flex alignItems="center" gap="2" marginY="2">
                <Input
                  type="text"
                  placeholder="Add your comment"
                  width="90%"
                  // marginX="10px"
                  value={editComment}
                  borderRadius="7px"
                  onChange={e => setEditComment(e.target.value)}
                  _placeholder={{ color: cardTextColor }}
                  borderColor="black"
                />
                <Button
                  colorScheme="brand"
                  disabled={editComment.length < 2}
                  onClick={handleEditComment}
                  size="md"
                >
                  Save
                </Button>
              </Flex>
            )}
            {!isEditing && <Box>{commentText}</Box>}
          </Box>
        </Flex>
      </Container>
    </>
  );
};
