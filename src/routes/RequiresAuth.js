import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { STATUSES } from '../utilities/statusesConstants';

export const RequiresAuth = () => {
  const authState = useSelector(state => state.auth);
  const location = useLocation();

  return authState.userData && authState.status !== STATUSES.LOADING ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
