/* eslint-disable react-hooks/exhaustive-deps */
import { getCommentCount } from '../../utilities/utils';
import {
  Container,
  Flex,
  Avatar,
  Box,
  Text,
  Image,
  useBoolean,
  IconButton,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineHeart, AiOutlineShareAlt, AiFillHeart } from 'react-icons/ai';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import { GoComment } from 'react-icons/go';
import { PostCardOptions } from '../PostCardOptions';
import {
  likeSinglePostPageState,
  unLikeSinglePostPageState,
} from '../../features/post/singlePostPageSlice';
import {
  likeSingleBookmarksPostState,
  likeSingleHomePostState,
  unLikeSingleBookmarksPostState,
  unLikeSingleHomePostState,
  likeSingleUserPostsState,
  unLikeSingleUserPostsState,
  likeExplorePostsState,
  unLikeExplorePostsState,
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
import { useEffect, useState } from 'react';

export const Post = ({ postData, currentUserId, index, pageName }) => {
  const toast = useToast();
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
  const [commentCount, setCommentCount] = useState(0);

  const postBgColor = useColorModeValue('#FFFFFF', 'gray.800');
  const postTextColor = useColorModeValue('black', 'gray.200');
  const iconColor = useColorModeValue('black', 'gray.100');
  const likeColor = useColorModeValue('red', 'gray.100');
  const bookmarkColor = useColorModeValue('purple', 'gray.100');

  const dispatchLikeAction = isLiked => {
    setIsLiked.toggle();
    if (isLiked) {
      console.log(postId, currentUserId);
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
      if (pageName == 'singlePostPage') {
        dispatch(unLikeSinglePostPageState({ currentUserId }));
      }
      if (pageName == 'explore') {
        dispatch(unLikeExplorePostsState({ index, currentUserId }));
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
      if (pageName == 'singlePostPage') {
        dispatch(likeSinglePostPageState({ currentUserId }));
      }
      if (pageName == 'explore') {
        dispatch(likeExplorePostsState({ index, currentUserId }));
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
  const copyPostLink = postLink => {
    navigator.clipboard.writeText(window.location.origin.concat(postLink));

    toast({
      title: 'Link Copied to Clipboard',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
  };
  //Comments Count Code
  useEffect(() => {
    (async () => {
      let commentsCount = await getCommentCount(postId);
      setCommentCount(commentsCount);
    })();
  }, []);

  return (
    <Container
      bg={postBgColor}
      p="1rem"
      borderRadius={5}
      marginY="5"
      color="black"
      id={postId}
    >
      <Flex>
        <Avatar
          size="md"
          as={Link}
          to={`/user/${uid}`}
          name={name}
          src={profileImageUrl}
        />
        <Box
          marginLeft="5"
          height={'max-content'}
          width="100%"
          color={postTextColor}
        >
          <Flex alignItems={'center'} justifyContent="space-between">
            <Flex direction={['column', 'column', 'row']}>
              <Text fontWeight="bold">{name} •</Text>
              <Text> @{userName} •</Text>
              <Text>{uploadDate}</Text>
            </Flex>
            {isBookmarked ? (
              <BsFillBookmarkFill
                size="1.25rem"
                cursor="pointer"
                color={bookmarkColor}
                onClick={() => dispatchBookmarkAction(isBookmarked)}
              />
            ) : (
              <BsBookmark
                size="1.25rem"
                cursor="pointer"
                color={bookmarkColor}
                onClick={() => dispatchBookmarkAction(isBookmarked)}
              />
            )}
          </Flex>
          {imageUrl.length !== 0 && (
            <Image
              my="10px"
              boxSize="100%"
              // border="1px"
              width="100%"
              objectFit="cover"
              src={imageUrl}
              alt="Indian Farmer"
              borderRadius={10}
            />
          )}
          <Box as={Link} to={`/post/${uid}/${postId}`} cursor="pointer">
            {textContent}
          </Box>
          <Flex
            justifyContent="space-between"
            marginTop="1rem"
            marginBottom="5px"
          >
            <Flex alignItems={'center'} gap="2">
              {isLiked ? (
                <AiFillHeart
                  size="1.5rem"
                  color={likeColor}
                  onClick={() => dispatchLikeAction(isLiked)}
                  cursor="pointer"
                />
              ) : (
                <AiOutlineHeart
                  size="1.5rem"
                  cursor="pointer"
                  color={likeColor}
                  onClick={() => dispatchLikeAction(isLiked)}
                />
              )}
              {likes.length}
            </Flex>
            <Flex alignItems="center">
              <IconButton
                as={Link}
                to={`/post/${uid}/${postId}`}
                aria-label="Comment-button"
                colorScheme="transparent"
                color={iconColor}
                icon={<GoComment size="1.3rem" />}
              ></IconButton>
              <Text> {commentCount}</Text>
            </Flex>
            <IconButton
              onClick={() => copyPostLink(`/post/${uid}/${postId}`)}
              aria-label="share-button"
              colorScheme="transparent"
              color={iconColor}
              size="lg"
              icon={<AiOutlineShareAlt size="1.3rem" />}
            />

            {currentUserId == uid && pageName !== 'singlePostPage' && (
              <PostCardOptions postId={postId} postData={postData} />
            )}
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};
