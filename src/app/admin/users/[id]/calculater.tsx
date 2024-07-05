import {Order} from '@prisma/client';
import React from 'react';

const OrdersCalculator = ({orders}: {orders: Order[];}) => {
  const totalOrders = orders.length;
  const totalPrice = orders.reduce((acc, order) => acc + order.totalPrice, 0);

  const deliveredOrders = orders.filter(order => order.status === 'DELIVERED');
  const numberOfDeliveredOrders = deliveredOrders.length;

  const pendingOrders = orders.filter(order => order.status === 'PROCESSING');
  const numberOfPendingOrders = pendingOrders.length;

  return (
    <div className="flex gap-2">
      <div className="p-5 flex rounded-lg gap-3  bg-slate-300 cursor-pointer hover:bg-slate-300/90 basis-1/4">
        <div className="flex flex-col gap-3">
          <span className=" text-lg font-medium">{totalOrders}</span>
          <span className="text-sm font-light">Total Orders</span>
        </div>
      </div>
      <div className="p-5 flex rounded-lg gap-3  bg-slate-300 cursor-pointer hover:bg-slate-300/90 basis-1/4">
        <div className="flex flex-col gap-3">
          <span className=" text-lg font-medium">₦{totalPrice.toLocaleString()}</span>
          <span className="text-sm font-light">Total Invoices</span>
        </div>
      </div>
      <div className="p-5 flex rounded-lg gap-3  bg-slate-300 cursor-pointer hover:bg-slate-300/90 basis-1/4">
        <div className="flex flex-col gap-3">
          <span className=" text-lg font-medium">{numberOfDeliveredOrders}</span>
          <span className="text-sm font-light">Completed Orders</span>
        </div>
      </div>
      <div className="p-5 flex rounded-lg gap-3  bg-slate-300 cursor-pointer hover:bg-slate-300/90 basis-1/4">
        <div className="flex flex-col gap-3">
          <span className=" text-lg font-medium">{numberOfPendingOrders}</span>
          <span className="text-sm font-light">Processing Orders</span>
        </div>
      </div>
    </div>
  );
};

export default OrdersCalculator;