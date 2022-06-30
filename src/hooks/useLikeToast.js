/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { STATUSES } from '../utilities/statusesConstants';
import { useSelector, useDispatch } from 'react-redux';
import { setPostModalStatus } from '../features/post/postModalSlice';
export const useLikeToast = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const postModalState = useSelector(state => state.postModal);

  useEffect(() => {
    if (postModalState.statusMessage === STATUSES.POST_LIKED) {
      toast({
        title: postModalState.statusMessage,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      dispatch(setPostModalStatus({ status: STATUSES.IDLE, message: '' }));
    }
    if (postModalState.statusMessage === STATUSES.POST_UNLIKED) {
      toast({
        title: postModalState.statusMessage,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      dispatch(setPostModalStatus({ status: STATUSES.IDLE, message: '' }));
    }
  }, [
    postModalState.status == STATUSES.SUCCESS_LIKE,
    postModalState.status == STATUSES.SUCCESS_UNLIKE,
  ]);
};
