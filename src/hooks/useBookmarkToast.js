/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { STATUSES } from '../utilities/statusesConstants';
import { useSelector, useDispatch } from 'react-redux';
import { setPostModalStatus } from '../features/post/postModalSlice';
export const useBookmarkToast = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const postModalState = useSelector(state => state.postModal);

  useEffect(() => {
    if (postModalState.statusMessage === STATUSES.POST_BOOKMARKED) {
      toast({
        title: postModalState.statusMessage,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      dispatch(setPostModalStatus({ status: STATUSES.IDLE, message: '' }));
    }
    if (postModalState.statusMessage === STATUSES.POST_UNBOOKMARKED) {
      toast({
        title: postModalState.statusMessage,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      dispatch(setPostModalStatus({ status: STATUSES.IDLE, message: '' }));
    }
  }, [
    postModalState.status == STATUSES.SUCCESS_BOOKMARK,
    postModalState.status == STATUSES.SUCCESS_UNBOOKMARK,
  ]);
};
