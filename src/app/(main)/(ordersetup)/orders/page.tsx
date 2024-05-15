import React from 'react';
import MyOrders from './MyOrders';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Order History'
};

const OrdersPage = () => {
  return (
    <MyOrders />
  );
};

export default OrdersPage;