import {
  Container,
  Flex,
  Avatar,
  Box,
  Text,
  Image,
  useBoolean,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineHeart, AiOutlineShareAlt, AiFillHeart } from 'react-icons/ai';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import { GoComment } from 'react-icons/go';
import { PostCardOptions } from '../PostCardOptions';
import {
  likeSingleBookmarksPostState,
  likeSingleHomePostState,
  unLikeSingleBookmarksPostState,
  unLikeSingleHomePostState,
  likeSingleUserPostsState,
  unLikeSingleUserPostsState,
} from '../../features/post/postSlice';
import {
  likePost,
  unLikePost,
  bookmarkPost,
  UnBookmarkPost,
} from '../../features/post/postModalSlice';
import {
  setBookmarkState,
  setUnBookmarkState,
} from '../../features/auth/authSlice';

export const Post = ({ postData, currentUserId, index, pageName }) => {
  const {
    postId,
    textContent,
    imageUrl,
    profileImageUrl,
    name,
    userName,
    uploadDate,
    likes,
    uid,
  } = postData;

  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const bookmarksList = authState.userData.bookmarks;
  const isInBookmarksList = bookmarksList.includes(postId);
  const isInLikesList = likes.includes(currentUserId);
  const [isLiked, setIsLiked] = useBoolean(isInLikesList);
  const [isBookmarked, setIsBookmarked] = useBoolean(isInBookmarksList);

  const dispatchLikeAction = isLiked => {
    setIsLiked.toggle();
    if (isLiked) {
      dispatch(unLikePost({ postId, currentUserId })); //updates the firestore db
      // updates the state of post likes in home post array
      if (pageName == 'home') {
        dispatch(unLikeSingleHomePostState({ index, currentUserId }));
      }
      if (pageName == 'bookmarks') {
        dispatch(unLikeSingleBookmarksPostState({ index, currentUserId }));
      }
      if (pageName == 'profile') {
        dispatch(unLikeSingleUserPostsState({ index, currentUserId }));
      }
    } else {
      dispatch(likePost({ postId, currentUserId })); //updates the firestore db
      if (pageName == 'home') {
        dispatch(likeSingleHomePostState({ index, currentUserId }));
      }
      if (pageName == 'bookmarks') {
        dispatch(likeSingleBookmarksPostState({ index, currentUserId }));
      }
      if (pageName == 'profile') {
        dispatch(likeSingleUserPostsState({ index, currentUserId }));
      }
    }
  };
  const dispatchBookmarkAction = isBookmarked => {
    setIsBookmarked.toggle();
    if (isBookmarked) {
      dispatch(UnBookmarkPost({ postId, currentUserId })); //updates the firestore db
      dispatch(setUnBookmarkState(postId)); // updates the state
    } else {
      dispatch(bookmarkPost({ postId, currentUserId }));
      dispatch(setBookmarkState(postId));
    }
  };
  return (
    <Container
      bg="#D3D3D3"
      p="1rem"
      borderRadius={5}
      marginY="5"
      color="black"
      id={postId}
    >
      <Flex>
        <Avatar
          as={Link}
          to={`/user/${uid}`}
          name={name}
          src={profileImageUrl}
        />
        <Box marginLeft="5" height={'max-content'} width="100%">
          <Flex alignItems={'center'} justifyContent="space-between">
            <Flex>
              <Text fontWeight="bold">{name}</Text>
              <Text>• @{userName}</Text>
              <Text>• {uploadDate}</Text>
            </Flex>
            {isBookmarked ? (
              <BsFillBookmarkFill
                size="1.25rem"
                cursor="pointer"
                color="purple"
                onClick={() => dispatchBookmarkAction(isBookmarked)}
              />
            ) : (
              <BsBookmark
                size="1.25rem"
                cursor="pointer"
                onClick={() => dispatchBookmarkAction(isBookmarked)}
              />
            )}
          </Flex>
          {imageUrl.length !== 0 && (
            <Image
              my="10px"
              boxSize="100%"
              // border="1px"
              objectFit="cover"
              src={imageUrl}
              alt="Indian Farmer"
              borderRadius={10}
            />
          )}
          <Box>{textContent}</Box>
          <Flex
            justifyContent="space-between"
            marginTop="1rem"
            marginBottom="5px"
          >
            <Flex alignItems={'center'} gap="2">
              {isLiked ? (
                <AiFillHeart
                  size="1.5rem"
                  color="red"
                  onClick={() => dispatchLikeAction(isLiked)}
                  cursor="pointer"
                />
              ) : (
                <AiOutlineHeart
                  size="1.5rem"
                  cursor="pointer"
                  onClick={() => dispatchLikeAction(isLiked)}
                />
              )}
              {likes.length}
            </Flex>
            <GoComment size="1.3rem" />
            <AiOutlineShareAlt size="1.3rem" />
            {currentUserId == uid && (
              <PostCardOptions postId={postId} postData={postData} />
            )}
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};
