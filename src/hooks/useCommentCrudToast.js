/* eslint-disable react-hooks/exhaustive-deps */
// Comment CRUD Operation Action Toast custom hook
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import { STATUSES } from '../utilities/statusesConstants';
import { setSinglePostCommentStatus } from '../features/post/singlePostPageSlice';
import { useEffect } from 'react';

export const useCommentCrudToast = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const commentStatus = useSelector(
    state => state.singlePostPage.commentStatus
  );
  const statusMessage = useSelector(
    state => state.singlePostPage.statusMessage
  );

  useEffect(() => {
    if (statusMessage === STATUSES.COMMENT_CREATED) {
      toast({
        title: statusMessage,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      dispatch(
        setSinglePostCommentStatus({ status: STATUSES.IDLE, message: '' })
      );
    }
    if (statusMessage === STATUSES.COMMENT_DELETED) {
      toast({
        title: statusMessage,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      dispatch(
        setSinglePostCommentStatus({ status: STATUSES.IDLE, message: '' })
      );
    }
    if (statusMessage === STATUSES.COMMENT_EDITED) {
      toast({
        title: statusMessage,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      dispatch(
        setSinglePostCommentStatus({ status: STATUSES.IDLE, message: '' })
      );
    }
  }, [commentStatus == STATUSES.SUCCESS]);
};
