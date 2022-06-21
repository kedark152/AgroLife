/* eslint-disable react-hooks/exhaustive-deps */
// Posts CRUD Operation Action Toast custom hook
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import { getAllPosts } from '../features/post/postSlice';
import { STATUSES } from '../utilities/statusesConstants';
import { setPostModalStatus } from '../features/post/postModalSlice';
import { useEffect } from 'react';

export const useCrudToast = sortPosts => {
  const dispatch = useDispatch();
  const toast = useToast();
  const allPosts = useSelector(state => state.post.allPosts);
  const allPostsStatus = useSelector(state => state.post.allPostsStatus);
  const postModalState = useSelector(state => state.postModal);

  useEffect(() => {
    dispatch(getAllPosts(sortPosts)); //Action to Fetch all post from firebase
    if (postModalState.statusMessage === STATUSES.POST_CREATED) {
      toast({
        title: postModalState.statusMessage,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      dispatch(setPostModalStatus({ status: STATUSES.IDLE, message: '' }));
    }
    if (postModalState.statusMessage === STATUSES.POST_DELETED) {
      toast({
        title: postModalState.statusMessage,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      dispatch(setPostModalStatus({ status: STATUSES.IDLE, message: '' }));
    }
    if (postModalState.statusMessage === STATUSES.POST_EDITED) {
      toast({
        title: postModalState.statusMessage,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      dispatch(setPostModalStatus({ status: STATUSES.IDLE, message: '' }));
    }
  }, [postModalState.status == STATUSES.SUCCESS]);

  return { allPosts, allPostsStatus };
};
