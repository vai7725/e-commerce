import React, { useEffect } from 'react';
import { selectLoggedInUser, signOutUserAsync } from '../authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const LogOut = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    dispatch(signOutUserAsync());
  }, []);
  return <>{!user && <Navigate to={'/login'} replace={true} />}</>;
};

export default LogOut;
