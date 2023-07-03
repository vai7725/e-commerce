import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createOrderAsync } from './orderSlice';

export default function Order() {
  const count = useSelector(createOrderAsync);
  const dispatch = useDispatch();

  return <></>;
}
