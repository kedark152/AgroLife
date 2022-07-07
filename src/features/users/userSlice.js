import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { database, storage } from '../../firebase/firebaseConfig';
import {
  getDoc,
  getDocs,
  collection,
  arrayUnion,
  arrayRemove,
  updateDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { STATUSES } from '../../utilities/statusesConstants';

export const getAllUsers = createAsyncThunk(
  'userSlice/getAllUsers',
  async thunkAPI => {
    try {
      const querySnapshot = await getDocs(collection(database, 'users'));
      let users = [];
      querySnapshot.forEach(doc => {
        users.push({ ...doc.data(), userId: doc.id });
      });
      return users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const followUser = createAsyncThunk(
  'userSlice/followUser',
  async ({ currentUserId, followUserId }, thunkAPI) => {
    try {
      const currentUserRef = doc(database, 'users', currentUserId);
      const followUserRef = doc(database, 'users', followUserId);

      await updateDoc(currentUserRef, {
        following: arrayUnion(followUserId),
      });
      await updateDoc(followUserRef, {
        followers: arrayUnion(currentUserId),
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const unFollowUser = createAsyncThunk(
  'userSlice/unFollowUser',
  async ({ currentUserId, unFollowUserId }, thunkAPI) => {
    try {
      const currentUserRef = doc(database, 'users', currentUserId);
      const unFollowUserRef = doc(database, 'users', unFollowUserId);

      await updateDoc(currentUserRef, {
        following: arrayRemove(unFollowUserId),
      });
      await updateDoc(unFollowUserRef, {
        followers: arrayRemove(currentUserId),
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//to get any user profile
export const getUserProfile = createAsyncThunk(
  'userSlice/getUserProfile',
  async ({ userId }, thunkAPI) => {
    try {
      const userObj = await getDoc(doc(database, `users/${userId}`));
      const userProfile = userObj.data();
      return userProfile;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'userSlice/updateUserProfile',
  async ({ uid, media, userProfileData }, thunkAPI) => {
    let headerImgUrl = media.headerImgURL;
    let profileImgUrl = media.profileImgURL;

    try {
      if (media.headerImg) {
        //uploads header image to firebase storage
        const headerImgRef = ref(
          storage,
          `headerImages/${media.headerImg.name}`
        );
        const uploadHeaderImg = await uploadBytesResumable(
          headerImgRef,
          media.headerImg
        );
        headerImgUrl = await getDownloadURL(uploadHeaderImg.ref);
      }
      if (media.profileImg) {
        //uploads profile image to firebase storage
        const profileImgRef = ref(
          storage,
          `profileImages/${media.profileImg.name}`
        );
        const uploadProfileImg = await uploadBytesResumable(
          profileImgRef,
          media.profileImg
        );
        profileImgUrl = await getDownloadURL(uploadProfileImg.ref);
      }
      const updatedDetails = {
        name: userProfileData.name,
        bio: userProfileData.bio,
        website: userProfileData.website,
        coverImageUrl: headerImgUrl,
        profileImageUrl: profileImgUrl,
      };
      //updates the user document
      const currentUserRef = doc(database, 'users', uid);
      await updateDoc(currentUserRef, { ...updatedDetails });

      //updates profile details in posts
      const postsListRef = collection(database, 'posts');
      const singleUserPostsQuery = query(postsListRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(singleUserPostsQuery);
      if (querySnapshot.size > 0) {
        for (let i in querySnapshot.docs) {
          const post = querySnapshot.docs[i];
          let postRef = doc(database, 'posts', post.id);
          await updateDoc(postRef, {
            name: userProfileData.name,
            profileImageUrl: profileImgUrl,
          });
        }
      }

      //updates profile details in comments with same userId
      //gets all posts ids
      const allPostsRef = await getDocs(collection(database, 'posts'));
      let postsIdsArray = [];
      allPostsRef.forEach(doc => {
        postsIdsArray.push(doc.id);
      });
      for (let i in postsIdsArray) {
        const commentsListRef = collection(
          database,
          `posts/${postsIdsArray[i]}/comments/`
        );
        const sameUserCommentsQuery = query(
          commentsListRef,
          where('commentUID', '==', uid)
        );
        const commentsSnapshot = await getDocs(sameUserCommentsQuery);
        if (commentsSnapshot.size > 0) {
          for (let j in commentsSnapshot.docs) {
            const comment = commentsSnapshot.docs[j];
            let commentRef = doc(
              database,
              `posts/${postsIdsArray[i]}/comments/${comment.id}`
            );
            await updateDoc(commentRef, {
              name: userProfileData.name,
              commentUserProfileUrl: profileImgUrl,
            });
          }
        }
      }

      return updatedDetails;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const initialState = {
  allUser: [],
  allUserStatus: STATUSES.IDLE,
  followStatus: STATUSES.IDLE,
  followStatusMessage: '',
  userProfile: {
    profileImageUrl: '',
    coverImageUrl: '',
    bio: '',
    following: [],
    followers: [],
    posts: [],
    likes: [],
    comments: [],
    bookmarks: [],
  }, //to get any user profile data
  userProfileStatus: STATUSES.IDLE,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setFollowStatus: (state, action) => {
      state.followStatus = action.payload.status;
      state.followStatusMessage = action.payload.message;
    },
    setUserProfileStatus: (state, action) => {
      state.userProfileStatus = action.payload;
    },
  },
  extraReducers: {
    [getAllUsers.pending]: state => {
      state.allUserStatus = STATUSES.LOADING;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.allUserStatus = STATUSES.SUCCESS;
      state.allUser = action.payload;
    },
    [getAllUsers.rejected]: (state, action) => {
      console.log('getAllUsers Rejected', action.payload);
      state.allUserStatus = STATUSES.ERROR;
    },
    [updateUserProfile.pending]: state => {
      state.userProfileStatus = STATUSES.LOADING;
    },
    [updateUserProfile.fulfilled]: state => {
      state.userProfileStatus = STATUSES.SUCCESS;
    },
    [updateUserProfile.rejected]: (state, action) => {
      console.log('updateUserProfile Rejected', action.payload);
      state.userProfileStatus = STATUSES.ERROR;
    },
    [getUserProfile.pending]: state => {
      state.userProfileStatus = STATUSES.LOADING;
    },
    [getUserProfile.fulfilled]: (state, action) => {
      state.userProfileStatus = STATUSES.IDLE;
      state.userProfile = action.payload;
    },
    [getUserProfile.rejected]: (state, action) => {
      console.log('getUserProfile Rejected', action.payload);
      state.userProfileStatus = STATUSES.ERROR;
    },
    [followUser.pending]: state => {
      state.followStatus = STATUSES.LOADING;
    },
    [followUser.fulfilled]: state => {
      state.followStatus = STATUSES.SUCCESS;
      state.followStatusMessage = STATUSES.IS_FOLLOWING;
    },
    [followUser.rejected]: (state, action) => {
      console.log('followUser Rejected', action.payload);
      state.followStatus = STATUSES.ERROR;
    },
    [unFollowUser.pending]: state => {
      state.followStatus = STATUSES.LOADING;
    },
    [unFollowUser.fulfilled]: state => {
      state.followStatus = STATUSES.SUCCESS;
      state.followStatusMessage = STATUSES.IS_UNFOLLOWING;
    },
    [unFollowUser.rejected]: (state, action) => {
      console.log('unFollowUser Rejected', action.payload);
      state.followStatus = STATUSES.ERROR;
    },
  },
});

export const { setFollowStatus, setUserProfileStatus } = userSlice.actions;
export default userSlice.reducer;
