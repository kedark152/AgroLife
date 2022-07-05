import { Login } from '../pages/Login';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Explore } from '../pages/Explore';
import { MyProfile } from '../pages/MyProfile';
import { Signup } from '../pages/Signup';
import { Bookmarks } from '../pages/Bookmarks';
import { RequiresAuth } from './RequiresAuth';
import { SinglePostPage } from '../pages/SinglePostPage';

export const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<RequiresAuth />}>
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/user/:userId" element={<MyProfile />} />
        <Route path={'/post/:userId/:postId'} element={<SinglePostPage />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Route>
    </Routes>
  );
};
// /post/:userId/:postId
