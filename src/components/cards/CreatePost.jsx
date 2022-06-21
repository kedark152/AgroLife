//Create Post Card work in Progress.
import {
  Container,
  Flex,
  Avatar,
  Box,
  Divider,
  Button,
  Textarea,
  Input,
} from '@chakra-ui/react';

import { BsCardImage } from 'react-icons/bs';
import { RiFileGifLine } from 'react-icons/ri';
import { GrEmoji } from 'react-icons/gr';
import { useState } from 'react';
import Picker, { SKIN_TONE_LIGHT } from 'emoji-picker-react';

export const CreatePost = () => {
  const [postData, setPostData] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  function onEmojiClick(event, emojiObject) {
    event.stopPropagation();
    setPostData(postData => postData.concat(emojiObject.emoji));
  }
  return (
    <Container
      bg="#D3D3D3"
      // w="30rem"
      p="1rem"
      borderRadius={5}
      color="black"
    >
      <Flex>
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        <Box marginLeft="5" height={'6rem'} width="100%" marginBottom="2">
          <Textarea
            value={postData}
            onChange={e => setPostData(e.target.value)}
            placeholder="Share your story..."
            size="md"
            resize="none"
            rows="4"
          />
        </Box>
      </Flex>
      {showImagePicker && (
        <>
          <Input
            type="file"
            name="uploadImage"
            accept="image/png, image/gif, image/jpeg"
            display="block"
            width="20rem"
            marginLeft="10rem"
            marginTop="1rem"
          />
        </>
      )}
      <Divider my="2" borderColor="black" />
      <Flex align={'center'} gap={2} position="relative">
        <BsCardImage
          fontSize="1.5rem"
          cursor="pointer"
          onClick={() =>
            setShowImagePicker(showImagePicker => !showImagePicker)
          }
        />
        <RiFileGifLine fontSize="1.5rem" cursor="pointer" />
        <GrEmoji
          fontSize="1.5rem"
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
              top: '35%',
            }}
          />
        )}

        <Button colorScheme="brand" size="sm" marginLeft="auto">
          Post
        </Button>
      </Flex>
    </Container>
  );
};
