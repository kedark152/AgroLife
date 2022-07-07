import { collection, getDocs } from 'firebase/firestore';
import { database } from '../firebase/firebaseConfig';
export const getCurrentDate = () => {
  const today = new Date();
  const date = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  const month = today.getMonth() + 1;
  const hours = today.getHours();
  const mins = today.getMinutes();
  const secs = today.getSeconds();
  return `${month}/${date}/${today.getFullYear()} ${hours}:${mins}:${secs}`;
};

export const getCommentCount = async postId => {
  try {
    const commentsRef = collection(database, `posts/${postId}/comments/`);
    const allCommentsSnapshot = await getDocs(commentsRef);

    return allCommentsSnapshot.size;
  } catch (error) {
    console.log(error);
  }
};

export const sortTrendingPosts = posts => {
  return [...posts].sort(
    (post1, post2) => post2.likes.length - post1.likes.length
  );
};
export const sortPostsBy = (posts, sortBy) => {
  if (sortBy === 'newest') {
    return [...posts].sort(
      (post1, post2) => new Date(post2.uploadDate) - new Date(post1.uploadDate)
    );
  }
  if (sortBy === 'oldest') {
    return [...posts].sort(
      (post1, post2) => new Date(post1.uploadDate) - new Date(post2.uploadDate)
    );
  }
  if (sortBy === 'trending') {
    return sortTrendingPosts(posts);
  }
};
export const sortCommentsBy = (comments, sortBy) => {
  if (sortBy === 'newest') {
    return [...comments].sort(
      (comment1, comment2) =>
        new Date(comment2.createdAt) - new Date(comment1.createdAt)
    );
  }
  if (sortBy === 'oldest') {
    return [...comments].sort(
      (comment1, comment2) =>
        new Date(comment1.createdAt) - new Date(comment2.createdAt)
    );
  }
};

export const sortByCategories = (posts, categoryName) => {
  let filterCategory = categoryName.toLowerCase();
  let filteredPosts = posts.filter(post =>
    post.textContent.toLowerCase().includes(filterCategory)
  );

  if (filterCategory == 'trending') {
    filteredPosts = sortTrendingPosts(posts);
  }

  return filteredPosts;
};
