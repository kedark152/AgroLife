import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../../firebase/firebaseConfig';

import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { STATUSES } from '../../utilities/statusesConstants';
import { sortCommentsBy } from '../../utilities/utils';

export const getSinglePost = createAsyncThunk(
  'singlePostPage/getSinglePost',
  async ({ postId }, thunkAPI) => {
    try {
      const querySnapshot = await getDoc(doc(database, 'posts', postId));
      const postData = querySnapshot.data();
      return { ...postData, postId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createComment = createAsyncThunk(
  'singlePostPage/createComment',
  async (
    {
      postId,
      commentText,
      commentId,
      commentUID,
      commentUserName,
      commentUserProfileUrl,
      name,
      createdAt,
    },
    thunkAPI
  ) => {
    try {
      const commentData = {
        commentText,
        commentId,
        commentUID,
        commentUserName,
        commentUserProfileUrl,
        name,
        createdAt,
      };
      await setDoc(
        doc(database, `posts/${postId}/comments/`, commentData.commentId),
        commentData
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getSinglePostComments = createAsyncThunk(
  'singlePostPage/getSinglePostComments',
  async ({ postId }, thunkAPI) => {
    try {
      const commentsRef = collection(database, `posts/${postId}/comments/`);
      const allCommentsSnapshot = await getDocs(commentsRef);

      let allComments = [];
      allCommentsSnapshot.forEach(doc => {
        allComments.push({ ...doc.data(), commentId: doc.id });
      });
      return sortCommentsBy(allComments, 'newest');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  'singlePostPage/deleteComment',
  async ({ postId, commentId }, thunkAPI) => {
    try {
      const docRef = doc(database, `posts/${postId}/comments/${commentId}`);
      await deleteDoc(docRef);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateComment = createAsyncThunk(
  'singlePostPage/updateComment',
  async ({ postId, commentId, commentText }, thunkAPI) => {
    try {
      const docRef = doc(database, `posts/${postId}/comments/${commentId}`);
      await updateDoc(docRef, {
        commentText,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  postStatus: STATUSES.IDLE,
  commentStatus: STATUSES.IDLE,
  statusMessage: '',
  postData: null, //obj
  commentsData: null, //array of objs
};

const singlePostPageSlice = createSlice({
  name: 'singlePostPage',
  initialState,
  reducers: {
    setSinglePostCommentStatus: (state, action) => {
      state.commentStatus = action.payload.status;
      state.statusMessage = action.payload.message;
    },
    likeSinglePostPageState: (state, action) => {
      //directly updates in state
      const currentUserId = action.payload.currentUserId;
      state.postData.likes = state.postData.likes.concat(currentUserId);
    },
    unLikeSinglePostPageState: (state, action) => {
      //directly updates in homePosts state
      const currentUserId = action.payload.currentUserId;
      state.postData.likes = state.postData.likes.filter(
        id => id !== currentUserId
      );
    },
    addCommentToState: (state, action) => {
      state.commentsData = [action.payload, ...state.commentsData];
    },
    deleteCommentFromState: (state, action) => {
      state.commentsData = state.commentsData.filter(
        comment => comment.commentId !== action.payload
      );
    },
    editCommentFromState: (state, action) => {
      let index = action.payload.index;
      state.commentsData[index].commentText = action.payload.commentText;
    },
  },
  extraReducers: {
    [getSinglePost.pending]: state => {
      state.postStatus = STATUSES.LOADING;
    },
    [getSinglePost.fulfilled]: (state, action) => {
      state.postStatus = STATUSES.SUCCESS;
      state.postData = action.payload;
    },
    [getSinglePost.rejected]: (state, action) => {
      console.log('getSinglePost Rejected', action.payload);
      state.postStatus = STATUSES.ERROR;
      state.statusMessage = action.payload;
    },
    [createComment.pending]: state => {
      state.commentStatus = STATUSES.LOADING;
    },
    [createComment.fulfilled]: state => {
      state.commentStatus = STATUSES.SUCCESS;
      state.statusMessage = STATUSES.COMMENT_CREATED;
      //   state.postData = action.payload;
    },
    [createComment.rejected]: (state, action) => {
      console.log('getSinglePost Rejected', action.payload);
      state.commentStatus = STATUSES.ERROR;
      state.statusMessage = action.payload;
    },
    [getSinglePostComments.pending]: state => {
      state.commentStatus = STATUSES.LOADING;
    },
    [getSinglePostComments.fulfilled]: (state, action) => {
      state.commentStatus = STATUSES.SUCCESS;
      state.commentsData = action.payload;
    },
    [getSinglePostComments.rejected]: (state, action) => {
      console.log('getSinglePostComments Rejected', action.payload);
      state.commentStatus = STATUSES.ERROR;
    },
    [deleteComment.fulfilled]: state => {
      state.commentStatus = STATUSES.SUCCESS;
      state.statusMessage = STATUSES.COMMENT_DELETED;
    },
    [deleteComment.rejected]: (state, action) => {
      console.log('delete comment Rejected', action.payload);
      state.commentStatus = STATUSES.ERROR;
      state.statusMessage = action.payload;
    },
    [updateComment.fulfilled]: state => {
      state.commentStatus = STATUSES.SUCCESS;
      state.statusMessage = STATUSES.COMMENT_EDITED;
    },
    [updateComment.rejected]: (state, action) => {
      console.log('edit comment Rejected', action.payload);
      state.commentStatus = STATUSES.ERROR;
      state.statusMessage = action.payload;
    },
  },
});

export default singlePostPageSlice.reducer;
export const {
  setSinglePostCommentStatus,
  likeSinglePostPageState,
  unLikeSinglePostPageState,
  addCommentToState,
  deleteCommentFromState,
  editCommentFromState,
} = singlePostPageSlice.actions;
