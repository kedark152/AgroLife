import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../../firebase/firebaseConfig';
import { STATUSES } from '../../utilities/statusesConstants';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { sortPostsBy } from '../../utilities/utils';

export const getAllPosts = createAsyncThunk(
  'post/getAllPosts',
  async (sortPosts, thunkAPI) => {
    try {
      const querySnapshot = await getDocs(collection(database, 'posts'));
      let posts = [];
      querySnapshot.forEach(doc => {
        posts.push({ ...doc.data(), postId: doc.id });
      });

      return sortPostsBy(posts, sortPosts);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getHomePosts = createAsyncThunk(
  'post/getHomePosts',
  async ({ userId, followingIds, sortPosts }, thunkAPI) => {
    try {
      //get all posts
      const postsRef = collection(database, 'posts');
      const allPostsSnapshot = await getDocs(postsRef);
      let allPosts = [];
      allPostsSnapshot.forEach(doc => {
        allPosts.push({ ...doc.data(), postId: doc.id });
      });

      // filter following posts
      const followingPosts = allPosts.filter(post =>
        followingIds.some(item => item === post.uid)
      );

      //filter my posts
      const currentUserPostsQuery = query(postsRef, where('uid', '==', userId));
      const querySnapshot = await getDocs(currentUserPostsQuery);
      let posts = [];
      querySnapshot.forEach(doc => {
        posts.push({ ...doc.data(), postId: doc.id });
      });

      //concatinate following & my posts
      let homeFeed = posts.concat(followingPosts);

      return sortPostsBy(homeFeed, sortPosts);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getBookmarksPosts = createAsyncThunk(
  'post/getBookmarksPosts',
  async ({ bookmarksIds, sortPosts }, thunkAPI) => {
    try {
      //get all posts
      const postsRef = collection(database, 'posts');
      const allPostsSnapshot = await getDocs(postsRef);
      let allPosts = [];
      allPostsSnapshot.forEach(doc => {
        allPosts.push({ ...doc.data(), postId: doc.id });
      });

      // filter bookmarks posts
      const bookmarksPosts = allPosts.filter(post =>
        bookmarksIds.includes(post.postId)
      );

      return sortPostsBy(bookmarksPosts, sortPosts);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getSingleUserPosts = createAsyncThunk(
  'post/getSingleUserPosts',
  async ({ userId }, thunkAPI) => {
    try {
      //get single users posts
      const postsRef = collection(database, 'posts');
      const singleUserPostsQuery = query(postsRef, where('uid', '==', userId));
      const querySnapshot = await getDocs(singleUserPostsQuery);
      let posts = [];
      querySnapshot.forEach(doc => {
        posts.push({ ...doc.data(), postId: doc.id });
      });

      return sortPostsBy(posts, 'newest');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  allPosts: [],
  allPostsStatus: STATUSES.IDLE,
  homePosts: [],
  homePostsStatus: STATUSES.IDLE,
  bookmarksPosts: [],
  bookmarksPostsStatus: STATUSES.IDLE,
  singleUserPosts: [],
  singleUserPostsStatus: STATUSES.IDLE,
  explorePosts: [],
  explorePostsStatus: STATUSES.IDLE,
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
    setHomePosts: (state, action) => {
      state.homePosts = action.payload;
    },
    setHomePostsStatus: (state, action) => {
      state.homePostsStatus = action.payload;
    },
    setBookmarksPosts: (state, action) => {
      state.bookmarksPosts = action.payload;
    },
    setExplorePosts: (state, action) => {
      state.explorePosts = action.payload;
    },
    likeSingleHomePostState: (state, action) => {
      //directly updates in state
      const index = action.payload.index;
      const currentUserId = action.payload.currentUserId;
      state.homePosts[index].likes =
        state.homePosts[index].likes.concat(currentUserId);
    },
    unLikeSingleHomePostState: (state, action) => {
      //directly updates in homePosts state
      const index = action.payload.index;
      const currentUserId = action.payload.currentUserId;
      state.homePosts[index].likes = state.homePosts[index].likes.filter(
        id => id !== currentUserId
      );
    },
    likeSingleBookmarksPostState: (state, action) => {
      //directly updates in bookmarksPosts state
      const index = action.payload.index;
      const currentUserId = action.payload.currentUserId;
      state.bookmarksPosts[index].likes =
        state.bookmarksPosts[index].likes.concat(currentUserId);
    },
    unLikeSingleBookmarksPostState: (state, action) => {
      //directly updates in bookmarksPosts state
      const index = action.payload.index;
      const currentUserId = action.payload.currentUserId;
      state.bookmarksPosts[index].likes = state.bookmarksPosts[
        index
      ].likes.filter(id => id !== currentUserId);
    },
    likeSingleUserPostsState: (state, action) => {
      //directly updates in singleUserPosts state
      const index = action.payload.index;
      const currentUserId = action.payload.currentUserId;
      state.singleUserPosts[index].likes =
        state.singleUserPosts[index].likes.concat(currentUserId);
    },
    unLikeSingleUserPostsState: (state, action) => {
      //directly updates in singleUserPosts state
      const index = action.payload.index;
      const currentUserId = action.payload.currentUserId;
      state.singleUserPosts[index].likes = state.singleUserPosts[
        index
      ].likes.filter(id => id !== currentUserId);
    },
    likeExplorePostsState: (state, action) => {
      //directly updates in allPosts state
      const index = action.payload.index;
      const currentUserId = action.payload.currentUserId;
      state.explorePosts[index].likes =
        state.explorePosts[index].likes.concat(currentUserId);
    },
    unLikeExplorePostsState: (state, action) => {
      //directly updates in allPosts state
      const index = action.payload.index;
      const currentUserId = action.payload.currentUserId;
      state.explorePosts[index].likes = state.explorePosts[index].likes.filter(
        id => id !== currentUserId
      );
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
    [getSingleUserPosts.pending]: state => {
      state.singleUserPostsStatus = STATUSES.LOADING;
    },
    [getSingleUserPosts.fulfilled]: (state, action) => {
      state.singleUserPostsStatus = STATUSES.SUCCESS;
      state.singleUserPosts = action.payload;
    },
    [getSingleUserPosts.rejected]: (state, action) => {
      console.log('get singleUserPosts Rejected', action.payload);
      state.singleUserPostsStatus = STATUSES.ERROR;
    },
    [getHomePosts.pending]: state => {
      state.homePostsStatus = STATUSES.LOADING;
    },
    [getHomePosts.fulfilled]: (state, action) => {
      state.homePostsStatus = STATUSES.SUCCESS;
      state.homePosts = action.payload;
    },
    [getHomePosts.rejected]: (state, action) => {
      console.log('get Home posts Rejected', action.payload);
      state.homePostsStatus = STATUSES.ERROR;
    },
    [getBookmarksPosts.pending]: state => {
      state.bookmarksPostsStatus = STATUSES.LOADING;
    },
    [getBookmarksPosts.fulfilled]: (state, action) => {
      state.bookmarksPostsStatus = STATUSES.SUCCESS;
      state.bookmarksPosts = action.payload;
    },
    [getBookmarksPosts.rejected]: (state, action) => {
      console.log('getbookmarksPosts Rejected', action.payload);
      state.bookmarksPostsStatus = STATUSES.ERROR;
    },
  },
});
export const {
  setAllPosts,
  setAllPostsStatus,
  setHomePosts,
  setHomePostsStatus,
  setBookmarksPosts,
  setExplorePosts,
  likeSingleHomePostState,
  unLikeSingleHomePostState,
  likeSingleBookmarksPostState,
  unLikeSingleBookmarksPostState,
  likeSingleUserPostsState,
  unLikeSingleUserPostsState,
  likeExplorePostsState,
  unLikeExplorePostsState,
} = postSlice.actions;
export default postSlice.reducer;

//note:idle status not handled after success
