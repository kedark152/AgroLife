import { Login } from '../pages/Login';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Explore } from '../pages/Explore';
import { MyProfile } from '../pages/MyProfile';
import { Signup } from '../pages/Signup';
import { RequiresAuth } from './RequiresAuth';

export const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<RequiresAuth />}>
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/myprofile" element={<MyProfile />} />
      </Route>
    </Routes>
  );
};
