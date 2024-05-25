'use client';
import {Badge} from '@/components/ui/badge';
import {Order} from '@prisma/client';
import {useQuery} from '@tanstack/react-query';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import React from 'react';

const fetchOrdersWidget = (): Promise<any[]> => fetch('/api/admin/orders').then(res => res.json());

export default function TransactionWidget() {
  const {isLoading, data: orders, error} = useQuery({queryKey: ['ordersWidget'], queryFn: fetchOrdersWidget});

  if (isLoading) return <p className="">Loading Orders</p>;
  if (error) return <p className="">Unknown error occured</p>;


  return (
    <div className='mt-8 p-5 border  bg-accent rounded-xl'>
      <h2 className='text-xl font-extralight text-gray-700'>Latest Transactions</h2>
      <table className="w-full">
        <thead>
          <tr>
            <td className='p-2'>Name</td>
            <td className='p-2'>Status</td>
            <td className='p-2'>Date</td>
            <td className='p-2'>Amount</td>
          </tr>
        </thead>
        <tbody>
          {orders!.map(order => (
            <tr key={order.id}>
              <td className='p-2'>
                <div className="flex gap-2 items-center">
                  <Avatar>
                    <AvatarImage src={order.User.image} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {order.User.username}
                </div>
              </td>
              <td className='p-2'>
                <Badge variant={order.status === 'CANCELLED' ? 'destructive' :
                  order.status === 'REJECTED' ? 'destructive' : order.status === 'PENDING' ? 'pending' :
                    order.status === 'PROCESSING' ? 'processing' : order.status === 'DELIVERED' ? 'delivered' : 'default'
                } className='min-w-24 items-center justify-center'>{order.status}</Badge>
              </td>
              <td className='p-2'>{order.createdAt.toString()}</td>
              <td className='p-2'>₦{order.totalPrice.toLocaleString()}</td>
            </tr>

          ))}
        </tbody>
      </table>
    </div>
  );
}
