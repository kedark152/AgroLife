export const getCurrentDate = () => {
  const today = new Date();
  const date = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  const month = today.getMonth() + 1;
  const hours = today.getHours();
  const mins = today.getMinutes();
  const secs = today.getSeconds();
  return `${month}/${date}/${today.getFullYear()} ${hours}:${mins}:${secs}`;
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
};
