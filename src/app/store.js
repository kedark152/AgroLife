import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import postModalReducer from '../features/post/postModalSlice';
import postReducer from '../features/post/postSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    postModal: postModalReducer,
    post: postReducer,
  },
});
