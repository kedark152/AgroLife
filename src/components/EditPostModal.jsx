/* eslint-disable react-hooks/exhaustive-deps */
import {
  Flex,
  IconButton,
  Box,
  Input,
  Image,
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Textarea,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { BsCardImage } from 'react-icons/bs';
// import { RiFileGifLine } from 'react-icons/ri';
import { GrEmoji, GrClose } from 'react-icons/gr';
import { useRef } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useState } from 'react';
import Picker, { SKIN_TONE_LIGHT } from 'emoji-picker-react';
import { editPost } from '../features/post/postModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from '../utilities/statusesConstants';
import { setPostModalStatus } from '../features/post/postModalSlice';

export const EditPostModal = ({ postData }) => {
  const { postId, textContent, imageUrl } = postData;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(imageUrl !== '');
  const [imageSrc, setImageSrc] = useState(imageUrl);
  const [postTextContent, setPostTextContent] = useState(textContent);

  const initialRef = useRef(null);

  const dispatch = useDispatch();
  const postModalState = useSelector(state => state.postModal);

  function onEmojiClick(event, emojiObject) {
    event.stopPropagation();
    setPostTextContent(postTextContent =>
      postTextContent.concat(emojiObject.emoji)
    );
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    let imageLink = imageSrc;
    const formData = new FormData(e.currentTarget);

    const file = formData.get('uploadImage');
    if (showImagePicker && file.size != 0) {
      formData.append('file', file);
      formData.append('upload_preset', 'agrolife-uploads');
      dispatch(setPostModalStatus({ status: STATUSES.LOADING, message: '' }));
      const data = await fetch(
        'https://api.cloudinary.com/v1_1/dvuh4fz9d/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      )
        .then(r => r.json())
        .catch(error => console.log(error));

      imageLink = data.secure_url;
      if (imageLink) {
        setImageSrc(imageLink);
      }
    }
    dispatch(
      editPost({
        textContent: postTextContent,
        imageUrl: imageLink ? imageLink : '',
        postId: postId,
      })
    );
    //reset the post modal
    setImageSrc('');
    setPostTextContent('');
    setShowImagePicker(false);

    onClose();
  }

  return (
    <>
      <Button
        variant="outline"
        colorScheme="teal"
        rightIcon={<FaEdit size="1.2rem" />}
        onClick={onOpen}
      >
        Edit Post
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Box as="form" onSubmit={handleOnSubmit}>
            <ModalHeader>Share your Story...</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Textarea
                value={postTextContent}
                onChange={e => setPostTextContent(e.target.value)}
                placeholder="Write your story..."
                size="md"
                resize="none"
                rows="7"
                name="textContent"
              />
              {showImagePicker && (
                <>
                  <Input
                    type="file"
                    name="uploadImage"
                    accept="image/png, image/gif, image/jpeg"
                    display="block"
                    width="20rem"
                    marginLeft="4rem"
                    marginTop="1rem"
                  />
                  {imageSrc !== '' && (
                    <Box position="relative">
                      <Image
                        my="10px"
                        boxSize="100%"
                        border="1px"
                        objectFit="cover"
                        src={imageSrc}
                        alt="Indian Farmer"
                      />
                      <IconButton
                        onClick={() => setImageSrc('')}
                        variant="solid"
                        colorScheme="red"
                        aria-label="Call Sage"
                        fontSize="15px"
                        icon={<GrClose size="1.1rem" />}
                        position="absolute"
                        borderRadius="30px"
                        size="sm"
                        top="3%"
                        right="2%"
                      />
                    </Box>
                  )}
                </>
              )}
            </ModalBody>

            <ModalFooter>
              <Flex
                align={'flex-start'}
                gap={4}
                marginRight="auto"
                position="relative"
              >
                <BsCardImage
                  fontSize="2rem"
                  cursor="pointer"
                  onClick={() =>
                    setShowImagePicker(showImagePicker => !showImagePicker)
                  }
                />

                {/* <RiFileGifLine fontSize="2rem" /> */}
                <GrEmoji
                  fontSize="2rem"
                  cursor="pointer"
                  onClick={() =>
                    setShowEmojiPicker(showEmojiPicker => !showEmojiPicker)
                  }
                />
                {showEmojiPicker && (
                  <Picker
                    native
                    disableSearchBar
                    skinTone={SKIN_TONE_LIGHT}
                    onEmojiClick={onEmojiClick}
                    pickerStyle={{
                      width: '228px',
                      height: '228px',
                      position: 'absolute',
                      left: '17%',
                      top: '155%',
                    }}
                  />
                )}
              </Flex>

              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={postModalState.status === STATUSES.LOADING}
                loadingText={
                  postModalState.status === STATUSES.LOADING && `Posting...`
                }
                disabled={postTextContent.length < 2}
              >
                Post
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};
