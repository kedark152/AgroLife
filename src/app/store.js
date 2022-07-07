import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import postModalReducer from '../features/post/postModalSlice';
import postReducer from '../features/post/postSlice';
import singlePostPageReducer from '../features/post/singlePostPageSlice';
import userReducer from '../features/users/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    postModal: postModalReducer,
    post: postReducer,
    singlePostPage: singlePostPageReducer,
    user: userReducer,
  },
});
