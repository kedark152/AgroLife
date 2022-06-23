import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../../firebase/firebaseConfig';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { STATUSES } from '../../utilities/statusesConstants';
import { getCurrentDate } from '../../utilities/utils';

export const createPost = createAsyncThunk(
  'postModal/createPost',
  async ({ textContent, imageUrl, uid, name, userName }, thunkAPI) => {
    try {
      const postData = {
        textContent,
        imageUrl,
        uid,
        name,
        userName,
        uploadDate: getCurrentDate(),
      };
      console.log('postData', postData);
      const uploadPost = await addDoc(collection(database, 'posts'), postData);
      console.log('Upload Post id', uploadPost.id);

      return { ...postData, postId: uploadPost.id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deletePost = createAsyncThunk(
  'postModal/deletePost',
  async (postId, thunkAPI) => {
    try {
      const docRef = doc(database, 'posts', postId);
      await deleteDoc(docRef);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editPost = createAsyncThunk(
  'postModal/editPost',
  async (postData, thunkAPI) => {
    try {
      const docRef = doc(database, 'posts', postData.postId);
      await updateDoc(docRef, postData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  postModalData: null,
  status: STATUSES.IDLE,
  statusMessage: '',
};

const postModalSlice = createSlice({
  name: 'postModal',
  initialState,
  reducers: {
    setPostModalStatus: (state, action) => {
      state.status = action.payload.status;
      state.statusMessage = action.payload.message;
    },
  },
  extraReducers: {
    [createPost.pending]: state => {
      state.status = STATUSES.LOADING;
    },
    [createPost.fulfilled]: (state, action) => {
      state.status = STATUSES.SUCCESS;
      state.postModalData = action.payload;
      state.statusMessage = STATUSES.POST_CREATED;
    },
    [createPost.rejected]: (state, action) => {
      console.log('createPost Rejected', action.payload);
      state.status = STATUSES.ERROR;
      state.statusMessage = action.payload;
    },

    [deletePost.pending]: state => {
      state.status = STATUSES.LOADING;
    },
    [deletePost.fulfilled]: state => {
      state.status = STATUSES.SUCCESS;
      state.statusMessage = STATUSES.POST_DELETED;
    },
    [deletePost.rejected]: (state, action) => {
      console.log('deletePost Rejected', action.payload);
      state.status = STATUSES.ERROR;
      state.statusMessage = action.payload;
    },
    [editPost.pending]: state => {
      state.status = STATUSES.LOADING;
    },
    [editPost.fulfilled]: state => {
      state.status = STATUSES.SUCCESS;
      state.statusMessage = STATUSES.POST_EDITED;
    },
    [editPost.rejected]: (state, action) => {
      console.log('editPost Rejected', action.payload);
      state.status = STATUSES.ERROR;
      state.statusMessage = action.payload;
    },
  },
});

export const { setPostModalStatus } = postModalSlice.actions;
export default postModalSlice.reducer;
