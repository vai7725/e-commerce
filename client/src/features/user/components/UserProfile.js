import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo, updateUserAsync } from '../userSlice';
import { useForm } from 'react-hook-form';

export default function UserProfile() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  const handleEditForm = (i) => {
    const address = user.address[i];
    setSelectedEditIndex(i);
    setValue('name', address.name);
    setValue('email', address.email);
    setValue('phone', address.phone);
    setValue('street', address.street);
    setValue('city', address.city);
    setValue('state', address.state);
    setValue('pinCode', address.pinCode);
  };

  const handleRemove = (e, i) => {
    const newUser = { ...user, address: [...user.address] };
    newUser.address.splice(i, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleEditAdress = (updatedAddress, i) => {
    const updatedData = { ...user, address: [...user.address] };
    updatedData.address.splice(i, 1, updatedAddress);
    dispatch(updateUserAsync(updatedData));
    setSelectedEditIndex(-1);
    setShowAddAddressForm(false);
  };

  const handleAddNewAddress = (newAddress) => {
    const updatedData = { ...user, address: [...user.address, newAddress] };
    dispatch(updateUserAsync(updatedData));
  };

  return (
    <>
      <div className="mt-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900 ">
          Name: {user.name || 'User'}
        </h2>
        <h2 className="mt-2 text-xl font-bold leading-9 tracking-tight text-gray-900 ">
          Email: {user.email || "User's email"}
        </h2>
        {user.role === 'admin' && (
          <h2 className="mt-2 text-xl font-bold leading-9 tracking-tight text-gray-900 ">
            Role: {user.role || 'Role'}
          </h2>
        )}

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <p className=" text-lg font-semibold">Your addresses:</p>
          {user.address.map((address, i) => {
            return (
              <div key={crypto.randomUUID()}>
                {selectedEditIndex === i && (
                  <form
                    className="bg-white p-4 my-12"
                    onSubmit={handleSubmit((data) => {
                      setSelectedEditIndex(-1);
                      handleEditAdress(data, i);
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
                              {...register('name', {
                                required: 'Name is required',
                              })}
                              id="first-name"
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
                              type="number"
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
                              {...register('city', {
                                required: 'City is required',
                              })}
                              id="city"
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
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className=" flex items-center justify-end gap-x-6 border-b border-gray-900/10  pb-12">
                      <button
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={() => setSelectedEditIndex(-1)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Edit address
                      </button>
                    </div>
                  </form>
                )}
                <div className="flex justify-between items-end mb-6  p-3 rounded-md bg-slate-100">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm  leading-6 text-gray-900">
                      <span className="font-semibold">Name:</span>{' '}
                      {address.name}
                    </p>
                    <p className="mt-1 truncate text-sm leading-5 ">
                      <span className="font-semibold">Street:</span>{' '}
                      {address.street}
                    </p>
                    <p className="mt-1 truncate text-sm leading-5">
                      <span className="font-semibold">State:</span>{' '}
                      {address.state}
                    </p>
                    <p className="text-sm leading-6 text-gray-900">
                      <span className="font-semibold text-sm">Contact:</span>{' '}
                      {address.contact}
                    </p>
                    <p className="text-sm leading-6 ">
                      <span className="font-semibold text-sm">PIN Code:</span>{' '}
                      {address.pinCode}
                    </p>
                  </div>
                  <div className="flex justify-between  ">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-400 mx-2"
                      onClick={(e) => handleEditForm(i)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="font-medium text-red-600 hover:text-red-400 mx-2"
                      onClick={(e) => handleRemove(e, i)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {showAddAddressForm && (
            <form
              className="bg-white p-4 my-12"
              onSubmit={handleSubmit((data) => {
                handleAddNewAddress(data);
                setShowAddAddressForm(false);
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
                        {...register('name', {
                          required: 'Name is required',
                        })}
                        id="first-name"
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
                        type="number"
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
                        {...register('city', {
                          required: 'City is required',
                        })}
                        id="city"
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
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className=" flex items-center justify-end gap-x-6 border-b border-gray-900/10  pb-12">
                <button
                  className="text-sm font-semibold leading-6 text-gray-900"
                  onClick={() => setSelectedEditIndex(-1)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add address
                </button>
              </div>
            </form>
          )}
          <button
            title="Add address"
            className=" w-full flex justify-center items-center  mb-6  py-4 rounded-md bg-slate-100 font-bold text-2xl text-gray-600 hover:shadow-sm hover:shadow-gray-400 active:shadow-none"
            onClick={() => setShowAddAddressForm(true)}
          >
            Add new address
          </button>
        </div>
      </div>
    </>
  );
}
