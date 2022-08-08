/* eslint-disable react-hooks/exhaustive-deps */
import {
  Flex,
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
  IconButton,
} from '@chakra-ui/react';
import { BsCardImage } from 'react-icons/bs';
import { GrEmoji } from 'react-icons/gr';
import { useRef } from 'react';
import { MdCreate } from 'react-icons/md';
import { useState } from 'react';
import Picker, { SKIN_TONE_LIGHT } from 'emoji-picker-react';
import { createPost } from '../features/post/postModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from '../utilities/statusesConstants';
import { setPostModalStatus } from '../features/post/postModalSlice';
import { IoMdCreate } from 'react-icons/io';

export const CreatePostModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [postData, setPostData] = useState('');

  const initialRef = useRef(null);

  const dispatch = useDispatch();
  const authUserData = useSelector(state => state.auth.userData);
  const postModalState = useSelector(state => state.postModal);

  function onEmojiClick(event, emojiObject) {
    event.stopPropagation();
    setPostData(postData => postData.concat(emojiObject.emoji));
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    let imageLink;
    const formData = new FormData(e.currentTarget);
    const file = formData.get('uploadImage');
    //Image Upload & get link from Cloudinary
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
      createPost({
        textContent: postData,
        imageUrl: imageLink ? imageLink : '',
        profileImageUrl: authUserData.profileImageUrl,
        uid: authUserData.uid,
        name: authUserData.name,
        userName: authUserData.userName,
      })
    );
    //reset the post modal
    setImageSrc('');
    setPostData('');
    setShowImagePicker(false);

    onClose();
  }

  return (
    <>
      <Button
        leftIcon={<MdCreate size="1.2rem" />}
        colorScheme="brand"
        display={['none', 'none', 'block']}
        size="md"
        w="100%"
        onClick={onOpen}
      >
        Create New Post
      </Button>
      <IconButton
        display={['block', 'block', 'none']}
        colorScheme="brand"
        icon={<IoMdCreate size="1.1rem" />}
        position="fixed"
        right="16px"
        bottom="90px"
        padding={3}
        borderRadius="2rem"
        size="md"
        onClick={onOpen}
      />

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Box as="form" onSubmit={handleOnSubmit}>
            <ModalHeader>Share your Story...</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Textarea
                value={postData}
                onChange={e => setPostData(e.target.value)}
                placeholder="Write your story here..."
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
                    <Image
                      my="10px"
                      boxSize="100%"
                      border="1px"
                      objectFit="cover"
                      src={imageSrc}
                      alt="Indian Farmer"
                    />
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
                disabled={postData.length < 2}
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
