import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../authSlice';
import { Navigate } from 'react-router-dom';

const ProtectedAdmin = ({ children }) => {
  const user = useSelector(selectLoggedInUser);

  if (!user) return <Navigate t0="/login" replace={true} />;

  if (user && user.role !== 'admin') return <Navigate t0="/" replace={true} />;

  return children;
};

export default ProtectedAdmin;
