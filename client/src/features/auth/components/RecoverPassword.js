import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { checkUserAsync, selectError, selectLoggedInUser } from '../authSlice';

export default function RecoverPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const error = useSelector(selectError);

  return (
    <>
      {user && <Navigate to="/" replace={true} />}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Recover your password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              console.log(data);
            })}
          >
            <div>
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
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/,
                      message: 'Enter a valid email',
                    },
                  })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value="vaibhav.prajapat.7725@gmail.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send mail
              </button>
            </div>
          </form>

          <p className="mt-3 text-center text-sm text-gray-500">
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
