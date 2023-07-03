import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from '../userSlice';
import { selectLoggedInUser } from '../../auth/authSlice';
import { Link } from 'react-router-dom';

const UserOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, []);
  return (
    <div>
      {orders.map((order) => {
        return (
          <div className="mt-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
            <h2 className="mt-10 text-3xl font-bold leading-9 tracking-tight text-gray-900 ">
              Order ID: #{order.id}
            </h2>
            <h2 className="mt-2 text-xl font-bold leading-9 tracking-tight text-gray-900 ">
              Order Status: {order.status}
            </h2>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.cartItems.map((product) => (
                    <li key={product.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={product.href}>{product.title}</a>
                            </h3>
                            <p className="ml-4">${product.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500 flex justify-center items-center">
                            Qty: {product.quantity}
                          </div>

                          <div className="flex"></div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${order.totalAmount}</p>
              </div>

              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p className="text-gray-500">Total items</p>
                <p className="text-gray-500">{order.totalItems}</p>
              </div>

              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h2 className="text-xl font-semibold mb-2">
                Order will be delivered at -{' '}
              </h2>

              <div className="flex gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm  leading-6 text-gray-900">
                    <span className="font-semibold">Name:</span>{' '}
                    {order.selectedAddress.name}
                  </p>
                  <p className="mt-1 truncate text-sm leading-5 ">
                    <span className="font-semibold">Street:</span>{' '}
                    {order.selectedAddress.street}
                  </p>
                  <p className="mt-1 truncate text-sm leading-5">
                    <span className="font-semibold">State:</span>{' '}
                    {order.selectedAddress.state}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    <span className="font-semibold text-sm">Contact:</span>{' '}
                    {order.selectedAddress.phone}
                  </p>
                  <p className="text-sm leading-6 ">
                    <span className="font-semibold text-sm">PIN Code:</span>{' '}
                    {order.selectedAddress.pinCode}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h2 className="text-xl font-semibold mb-2">
                Selected payment mode - {order.paymentMethod}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserOrders;
