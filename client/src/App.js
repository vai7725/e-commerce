import React, { useEffect } from 'react';
import logo from './logo.svg';

import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { fetchCartItemsByUserIdAsync } from './features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import PageNotFound from './pages/PageNotFound';
import OrderSuccess from './pages/OrderSuccess';
import UserOrderPage from './pages/UserOrderPage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import LogOut from './features/auth/components/LogOut';
import RecoverPassPage from './pages/RecoverPassPage';
import AdminHome from './pages/adminPages/AdminHome';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import UserProfilePage from './pages/UserProfilePage';
import AdminProductFormPage from './pages/adminPages/ProductFormPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedAdmin>
        <AdminHome />
      </ProtectedAdmin>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/cart',
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: '/checkout',
    element: (
      <Protected>
        <Checkout />
      </Protected>
    ),
  },
  {
    path: '/product-details/:id',
    element: (
      <Protected>
        <ProductDetailPage />
      </Protected>
    ),
  },
  {
    path: '/order-success/:orderId',
    element: <OrderSuccess />,
  },
  {
    path: '/orders',
    element: <UserOrderPage />,
  },
  {
    path: '/profile',
    element: <UserProfilePage />,
  },
  {
    path: '/logout',
    element: <LogOut />,
  },
  {
    path: '/recover',
    element: <RecoverPassPage />,
  },
  {
    path: '/admin/product-form',
    element: <AdminProductFormPage />,
  },
  {
    path: '/admin/product-form/edit/:productId',
    element: <AdminProductFormPage />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  });

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
