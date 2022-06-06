import { Login } from '../pages/Login';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Explore } from '../pages/Explore';
import { MyProfile } from '../pages/MyProfile';
import { Signup } from '../pages/Signup';

export const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/myprofile" element={<MyProfile />} />
    </Routes>
  );
};
