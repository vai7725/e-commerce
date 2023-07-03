import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Dialog, Transition } from '@headlessui/react';
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import {
  removeItemFromCartAsync,
  selectCartItem,
  updateCartAsync,
} from './cartSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItem);

  const totalAmount = cartItems.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  const totalItems = cartItems.reduce(
    (total, item) => item.quantity + total,
    0
  );

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(removeItemFromCartAsync(id));
  };

  return (
    <div className="mt-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
      <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 flex justify-center items-center">
        Cart
        <ShoppingCartIcon className="h-6 w-6 mx-2" aria-hidden="true" />
      </h2>
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cartItems.map((product) => (
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
                      Qty:
                      <select
                        name=""
                        id=""
                        className="mx-2  flex justify-center items-center border-none rounded-sm"
                        onChange={(e) => handleQuantity(e, product)}
                        value={product.quantity}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>

                    <div className="flex">
                      <button
                        onClick={(e) => handleRemove(e, product.id)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
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
          <p>${totalAmount}</p>
        </div>

        <div className="flex justify-between my-2 text-base font-medium text-gray-900">
          <p className="text-gray-500">Total items</p>
          <p className="text-gray-500">{totalItems}</p>
        </div>

        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 max-w-screen-sm m-auto"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{' '}
            <Link
              to="/"
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500 "
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
