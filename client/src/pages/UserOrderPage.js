import React from 'react';
import Navbar from '../features/navbar/Navbar';
import UserOrders from '../features/user/components/UserOrders';

const UserOrderPage = () => {
  return (
    <Navbar>
      <UserOrders />
    </Navbar>
  );
};

export default UserOrderPage;
