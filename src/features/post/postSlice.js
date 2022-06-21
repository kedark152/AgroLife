import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../../firebase/firebaseConfig';
import { STATUSES } from '../../utilities/statusesConstants';
import { getDocs, collection } from 'firebase/firestore';
import { sortPostsBy } from '../../utilities/utils';

export const getAllPosts = createAsyncThunk(
  'post/getAllPosts',
  async (sortPosts, thunkAPI) => {
    try {
      const querySnapshot = await getDocs(collection(database, 'posts'));
      let posts = [];
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        posts.push({ ...doc.data(), postId: doc.id });
        console.log(doc.id, ' => ', doc.data());
      });
      console.log(posts);

      return sortPostsBy(posts, sortPosts);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  allPosts: [],
  allPostsStatus: STATUSES.IDLE,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    setAllPostsStatus: (state, action) => {
      state.allPostsStatus = action.payload;
    },
  },
  extraReducers: {
    [getAllPosts.pending]: state => {
      state.allPostsStatus = STATUSES.LOADING;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.allPostsStatus = STATUSES.SUCCESS;
      state.allPosts = action.payload;
    },
    [getAllPosts.rejected]: (state, action) => {
      console.log('getAllPosts Rejected', action.payload);
      state.allPostsStatus = STATUSES.ERROR;
    },
  },
});
export const { setAllPosts, setAllPostsStatus } = postSlice.actions;
export default postSlice.reducer;
