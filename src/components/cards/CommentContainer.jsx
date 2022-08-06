import {
  Container,
  Flex,
  Avatar,
  Input,
  Button,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { CommentBox } from './CommentBox';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../features/post/singlePostPageSlice';
import { v4 as uuid } from 'uuid';
import { addCommentToState } from '../../features/post/singlePostPageSlice';
import { getCurrentDate } from '../../utilities/utils';
export const CommentContainer = ({ postId }) => {
  const cardBgColor = useColorModeValue('#FFFFFF', 'gray.800');
  const inputBorderColor = useColorModeValue('black', 'gray.200');
  const cardTextColor = useColorModeValue('black', 'gray.200');
  const initialCommentInputState = '';
  const dispatch = useDispatch();
  const [commentInput, setCommentInput] = useState(initialCommentInputState);
  const authUserData = useSelector(state => state.auth.userData);
  const { name, profileImageUrl, userName, uid } = authUserData;
  const commentStatus = useSelector(
    state => state.singlePostPage.commentStatus
  );
  const postStatus = useSelector(state => state.singlePostPage.postStatus);
  const showAllComments = useSelector(
    state => state.singlePostPage.commentsData
  );

  //commentText,commentUID, commentUserName,commentUserProfileUrl,name,
  const handleSaveComment = () => {
    let commentData = {
      postId,
      commentText: commentInput,
      commentId: uuid(), //random comment id
      commentUID: uid, //uid is userId
      commentUserName: userName,
      commentUserProfileUrl: profileImageUrl,
      name,
      createdAt: getCurrentDate(),
    };

    dispatch(createComment(commentData)); //create new comment in firebase
    dispatch(addCommentToState(commentData)); //add comment to state

    setCommentInput(initialCommentInputState);
  };

  return (
    <Container
      bg={cardBgColor}
      // w={['25rem', '30rem', '40rem']}
      p="1rem"
      borderRadius={5}
      marginBottom="12"
      color={cardTextColor}
    >
      <Flex alignItems="center">
        <Avatar name={name} src={profileImageUrl} />
        <Input
          bg={cardBgColor}
          color={cardTextColor}
          type="text"
          placeholder="Add your comment"
          width="90%"
          marginX="10px"
          value={commentInput}
          borderRadius="7px"
          onChange={e => setCommentInput(e.target.value)}
          _placeholder={{ color: { cardTextColor } }}
          borderColor={inputBorderColor}
        />
        <Button
          colorScheme="brand"
          disabled={commentInput.length < 2}
          onClick={handleSaveComment}
        >
          Reply
        </Button>
      </Flex>
      <Text margin="3">
        {postStatus !== 'loading' &&
          commentStatus !== 'loading' &&
          showAllComments.length}{' '}
        Comments
      </Text>
      {commentStatus == 'loading' && (
        <Spinner
          position="absolute"
          thickness="4px"
          speed="0.25s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          left="35rem"
          top="20rem"
        />
      )}
      {postStatus !== 'loading' &&
        commentStatus !== 'loading' &&
        showAllComments.length > 0 &&
        showAllComments.map((comment, index) => (
          <CommentBox
            key={comment.commentId}
            commentData={comment}
            postId={postId}
            index={index}
          />
        ))}
      {/* <CommentBox />
      <CommentBox /> */}
    </Container>
  );
};
