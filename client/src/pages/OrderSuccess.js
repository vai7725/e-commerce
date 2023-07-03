import { Link, Navigate, useParams } from 'react-router-dom';
import successfullGIF from '../assets/successful.gif';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from '../features/auth/authSlice';
import { resetOrder } from '../features/order/orderSlice';
import { resetCartAsync } from '../features/cart/cartSlice';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  console.log(user);

  useEffect(() => {
    dispatch(resetCartAsync(user.id));
    dispatch(resetOrder());
  }, [dispatch]);

  return (
    <>
      {!orderId && <Navigate to="/" replace={true} />}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <div className="text-base font-semibold text-indigo-600 flex justify-center items-center">
            <img src={successfullGIF} alt="Successful" className="w-[300px] " />
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Order placed successfully.
          </h1>
          <div className="text-base font-semibold text-indigo-600">
            Order ID: {orderId}
          </div>
          <p className="mt-6 text-base leading-7 text-gray-600">
            You can check your order in My Account {'>'} My orders
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default OrderSuccess;
