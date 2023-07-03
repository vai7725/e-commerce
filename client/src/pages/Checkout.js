import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeItemFromCartAsync,
  selectCartItem,
  updateCartAsync,
} from '../features/cart/cartSlice';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  createOrderAsync,
  selectCurrentOrder,
} from '../features/order/orderSlice';
import { selectUserInfo, updateUserAsync } from '../features/user/userSlice';

const addresses = [
  {
    id: 1,
    name: 'John Wick',
    street: '88 xyz colony',
    city: 'Tonk',
    pinCode: '304804',
    state: 'Rajasthan',
    phone: '123456789',
  },
  {
    id: 2,
    name: 'John Cena',
    street: '8938 farziabad colony',
    city: 'Ahmdabad',
    pinCode: '893243',
    state: 'Gujarat',
    phone: '0987654321',
  },
];

const Checkout = () => {
  const cartItems = useSelector(selectCartItem);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const user = useSelector(selectUserInfo);
  const currentOrder = useSelector(selectCurrentOrder);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const totalAmount = cartItems.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  const totalItems = cartItems.reduce(
    (total, item) => item.quantity + total,
    0
  );

  const handleAddress = (e) => {
    setSelectedAddress(JSON.parse(e.target.value));
  };

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleOrder = (e) => {
    if (selectedAddress && paymentMethod) {
      const order = {
        cartItems,
        totalAmount,
        totalItems,
        user,
        paymentMethod,
        selectedAddress,
        status: 'pending', // other status can be delivered, received
      };
      dispatch(createOrderAsync(order));
    }
  };

  return (
    <>
      {cartItems.length < 1 && <Navigate to="/" replace={true} />}
      {currentOrder && (
        <Navigate to={`/order-success/${currentOrder.id}`} replace={true} />
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form
              className="bg-white p-4 my-12"
              onSubmit={handleSubmit((data) => {
                dispatch(
                  updateUserAsync({
                    ...user,
                    addresses: [...user.addresses, data],
                  })
                );
                reset();
              })}
            >
              <div className="pb-8">
                <h2 className=" font-semibold leading-7 text-2xl text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register('email', {
                          required: 'Email is required',
                        })}
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        {...register('phone', {
                          required: 'Phone number is required',
                        })}
                        type="tel"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Country
                    </label>
                    <div className="mt-2">
                      <select
                        id="country"
                        {...register('country', {
                          required: 'Country is required',
                        })}
                        autoComplete="country-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>India</option>
                        <option>USA</option>
                        <option>Spain</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('street', {
                          required: 'Street address is required',
                        })}
                        id="street-address"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('city', { required: 'City is required' })}
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('state', {
                          required: 'State is required',
                        })}
                        id="region"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="pinCode"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('pinCode', {
                          required: 'Pin code is required',
                        })}
                        id="pinCode"
                        autoComplete="pinCode"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className=" flex items-center justify-end gap-x-6 border-b border-gray-900/10  pb-12">
                <button
                  type="reset"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add address
                </button>
              </div>

              <div className="border-b border-gray-900/10 pb-12 pt-4">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Addresses
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Choose from existing address
                </p>

                <ul role="list" className="divide-y divide-gray-100">
                  {user.addresses.map((address, i) => (
                    <label
                      htmlFor={i}
                      key={i}
                      className="flex justify-between gap-x-6 py-5 border-gray-400 border-solid border-b-[1px]"
                    >
                      <div className="flex gap-x-4">
                        <input
                          id={i}
                          name="address"
                          type="radio"
                          className="h-4 w-4 border-gray-400 my-1 text-indigo-600 focus:ring-indigo-600"
                          onChange={handleAddress}
                          value={JSON.stringify(address)}
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {address.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.street}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.state}
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          {address.phone}
                        </p>
                        <p className="text-sm leading-6 text-gray-400">
                          {address.pinCode}
                        </p>
                      </div>
                    </label>
                  ))}
                </ul>

                <div className="mt-10 space-y-10">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                      Payment methods
                    </legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Select any kind of payment method you want
                    </p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="card"
                          name="payment"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          value={'card'}
                          onChange={(e) => handlePayment(e)}
                          checked={paymentMethod === 'card'}
                        />
                        <label
                          htmlFor="card"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Card
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="POD"
                          name="payment"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          value={'POD'}
                          onChange={(e) => handlePayment(e)}
                          checked={paymentMethod === 'POD'}
                        />
                        <label
                          htmlFor="POD"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Pay on delivery
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </form>
          </div>
          <div className="lg:col-span-2">
            <Cart
              handleOrder={handleOrder}
              cartItems={cartItems}
              totalItems={totalItems}
              totalAmount={totalAmount}
            />
          </div>
        </div>
      </div>
    </>
  );
};

// Cart component
const Cart = ({ handleOrder, cartItems, totalItems, totalAmount }) => {
  const dispatch = useDispatch();

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(removeItemFromCartAsync(id));
  };

  return (
    <>
      {cartItems.length < 1 && <Navigate to="/" replace={true} />}

      <div className="mt-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white sticky top-6">
        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 flex justify-center items-center">
          Cart
          <ShoppingCartIcon className="h-6 w-6 mx-2" aria-hidden="true" />
        </h2>
        <div className="border-t border-gray-200  py-6 sm:px-6">
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

          <div className="mt-6">
            <button
              onClick={handleOrder}
              className="flex items-center justify-center w-[100%] rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 max-w-screen-sm m-auto"
            >
              Place your order
            </button>
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
    </>
  );
};

export default Checkout;
