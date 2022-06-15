import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { auth, database } from '../../firebase/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

//enum like mechnaism
export const STATUSES = Object.freeze({
  IDLE: 'idle',
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
  LOGGED_IN: 'loggedIn',
  LOGGED_OUT: 'loggedOut',
});
export const BOOL = Object.freeze({
  TRUE: true,
  FALSE: false,
});

const createUserProfile = (uid, name, userName, email) => {
  return {
    uid,
    name,
    userName,
    email,
    profileImageUrl: '',
    bio: '',
    website: '',
    following: [],
    followers: [],
    posts: [],
    likes: [],
    comments: [],
    bookmarks: [],
  };
};

export const userSignup = createAsyncThunk(
  'auth/userSignup',
  async ({ fullName, userName, email, password }, thunkAPI) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = response.user.uid;
      const userProfile = createUserProfile(userId, fullName, userName, email);

      await setDoc(doc(database, 'users', userId), userProfile);
      return userProfile;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  'auth/userLogin',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const userId = response.user.uid;

      const userObj = await getDoc(doc(database, `users/${userId}`));
      const userProfile = userObj.data();
      return userProfile;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const userLogout = createAsyncThunk(
  'auth/userLogout',
  async thunkAPI => {
    try {
      await signOut(auth);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  userData: null,
  status: STATUSES.IDLE,
  statusMessage: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload.status;
      state.statusMessage = action.payload.message;
    },
  },
  extraReducers: {
    [userSignup.pending]: state => {
      state.status = STATUSES.LOADING;
    },
    [userSignup.fulfilled]: state => {
      state.status = STATUSES.SUCCESS;
    },
    [userSignup.rejected]: (state, action) => {
      console.log('userSignup Rejected', action.payload);
      state.status = STATUSES.ERROR;
      state.statusMessage = action.payload;
    },
    [userLogin.pending]: state => {
      state.status = STATUSES.LOADING;
    },
    [userLogin.fulfilled]: state => {
      state.statusMessage = STATUSES.LOGGED_IN;
    },

    [userLogin.rejected]: (state, action) => {
      console.log('userLogin Rejected', action.payload);
      state.userData = null;
      state.status = STATUSES.ERROR;
      state.statusMessage = action.payload;
    },
    [userLogout.pending]: state => {
      state.status = STATUSES.LOADING;
    },
    [userLogout.fulfilled]: state => {
      state.userData = null;
      state.statusMessage = STATUSES.LOGGED_OUT;
    },
    [userLogout.rejected]: (state, action) => {
      console.log('userLogout Rejected', action.payload);
      state.status = STATUSES.ERROR;
      state.statusMessage = action.payload;
    },
  },
});

export const { setUserData, setStatus } = authSlice.actions;
export default authSlice.reducer;
