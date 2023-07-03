import React from 'react';
import Navbar from '../features/navbar/Navbar';
import AdminProductDetail from '../../features/admin/components/AdminProductDetails';

const AdminProductDetailPage = () => {
  return (
    <Navbar>
      <AdminProductDetail />
    </Navbar>
  );
};

export default AdminProductDetailPage;
