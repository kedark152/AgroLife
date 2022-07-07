import {
  Avatar,
  Box,
  IconButton,
  Image,
  FormControl,
  FormLabel,
  Input,
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { STATUSES } from '../utilities/statusesConstants';
import { MdEdit } from 'react-icons/md';
import { BiCamera } from 'react-icons/bi';
import { useRef, useState } from 'react';
import { updateUserProfile } from '../features/users/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAuthUserName,
  setAuthUserProfileURL,
} from '../features/auth/authSlice';
export const EditProfileModal = () => {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);

  const userProfileStatus = userState.userProfileStatus;
  const userData = userState.userProfile;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputProfilePicRef = useRef(null);
  const inputCoverImgRef = useRef(null);
  const initialRef = useRef(null);

  const handleCoverImgClick = () => {
    inputCoverImgRef.current.click();
  };
  const handleProfilePicClick = () => {
    //  open file input box on click of other element
    inputProfilePicRef.current.click();
  };

  const { name, bio, uid, profileImageUrl, coverImageUrl, website } = userData;
  const [userProfileData, setUserProfileData] = useState({
    name,
    bio,
    website,
  });

  const [media, setMedia] = useState({
    headerImgURL:
      coverImageUrl.length == 0
        ? 'https://tiny.cc/defaultHeaderImg'
        : coverImageUrl,
    profileImgURL: profileImageUrl,
    headerImg: null,
    profileImg: null,
  });

  const handleMediaPreview = e => {
    const file = e.target.files[0];
    if (file) {
      if (file.size < 5000000) {
        setMedia(prev => ({
          ...prev,
          [e.target.name]: URL.createObjectURL(file),
          [e.target.id]: file,
        }));
      } else {
        console.error('Image size should not exceed 5MB');
      }
    }
  };
  // handleProfileModalSubmit;
  const handleProfileModalSubmit = updatedData => {
    dispatch(updateUserProfile(updatedData));
    //updates userData in auth State
    dispatch(setAuthUserName(updatedData.userProfileData.name));
    dispatch(setAuthUserProfileURL(updatedData.media.profileImgURL));

    onClose();
  };
  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="teal"
        variant="solid"
        marginY="2"
        isLoading={userProfileStatus == 'loading'}
        loadingText="Updating Profile..."
      >
        Edit Profile
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width={['18rem', '30rem', '40rem']}>
          <ModalHeader>Edit Profile Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box position="relative">
              <Image
                src={media.headerImgURL}
                boxSize="100%"
                objectFit="cover"
                height="7rem"
                borderRadius="14px"
              />
              <IconButton
                position="absolute"
                aria-label="Change Cover Image"
                icon={<MdEdit size="1.2rem" />}
                borderRadius="1rem"
                top="10px"
                right="1rem"
                colorScheme="teal"
                size="sm"
                onClick={handleCoverImgClick}
              />
              <Input
                type="file"
                display="none"
                name="headerImgURL"
                id="headerImg"
                accept="image/jpg, image/png, image/jpeg"
                ref={inputCoverImgRef}
                onChange={e => handleMediaPreview(e)}
              />
              <Avatar
                src={media.profileImgURL}
                position="absolute"
                size="xl"
                name={name}
                top="4rem"
                left={['5rem', '9rem', '9rem']}
              />
              <IconButton
                position="absolute"
                aria-label="Change Profile Pic"
                icon={<BiCamera size="1.2rem" />}
                borderRadius="1rem"
                top="8rem"
                left={['9rem', '13rem', '13rem']}
                colorScheme="teal"
                size="sm"
                onClick={handleProfilePicClick}
              />
              <Input
                type="file"
                display="none"
                name="profileImgURL"
                id="profileImg"
                accept="image/jpg, image/png, image/jpeg"
                ref={inputProfilePicRef}
                onChange={e => handleMediaPreview(e)}
              />
            </Box>
            <FormControl isRequired marginTop="4rem">
              <FormLabel>Your Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Your Full Name"
                value={userProfileData.name}
                onChange={e =>
                  setUserProfileData(userProfileData => ({
                    ...userProfileData,
                    name: e.target.value,
                  }))
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Bio</FormLabel>
              <Input
                placeholder="Bio"
                value={userProfileData.bio}
                onChange={e =>
                  setUserProfileData(userProfileData => ({
                    ...userProfileData,
                    bio: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Website</FormLabel>
              <Input
                placeholder="website"
                value={userProfileData.website}
                onChange={e =>
                  setUserProfileData(userProfileData => ({
                    ...userProfileData,
                    website: e.target.value,
                  }))
                }
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() =>
                handleProfileModalSubmit({ uid, media, userProfileData })
              }
              isLoading={userProfileStatus === STATUSES.LOADING}
              loadingText={
                userProfileStatus === STATUSES.LOADING && `Updating...`
              }
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
