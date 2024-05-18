'use client';

import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Order} from '@prisma/client';
import {useQuery} from '@tanstack/react-query';
import DateConverter from '@/components/date';
import {useRouter} from 'next/navigation';
import {Badge} from '@/components/ui/badge';


const fetchUserOrders = (): Promise<Order[]> => fetch('/api/orders/mine').then(res => res.json());
export default function MyOrders() {
  const router = useRouter();
  const {isLoading, data: orders, error} = useQuery({queryKey: ['orders'], queryFn: fetchUserOrders});

  if (isLoading) return <p className="">Loading Orders</p>;
  if (error) return <p className="">Unknown error occured</p>;



  return (
    <div className='min-h-[calc(100vh-200px)] mx-auto max-w-2xl px-4 mb-8 sm:px-6  lg:max-w-7xl lg:px-8 my-4'>
      <h1 className="text-2xl font-medium">
        Order History
      </h1>
      {
        orders?.length === 0 ?
          <div className="mt-6 bg-accent w-full p-4 rounded-lg">No order history</div>
          :
          <Table className='mt-6 w-full  rounded-lg'>
            <TableHeader>
              <TableRow>
                <TableHead className="">Order#</TableHead>
                <TableHead>Placed At</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="  text-right">Delivered At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className=' cursor-pointer'>
              {orders?.map(order => (
                <TableRow key={order.id} onClick={() => router.push(`/orders/${order.id}`)}>

                  <TableCell className="max-w-[350px] font-bold">
                    <span className="">#{order.id.substring(-6, 6)}</span>
                  </TableCell>
                  <TableCell className="max-w-[350px] font-normal">
                    <span className=""><DateConverter dateString={order.createdAt.toString()} /></span>
                  </TableCell>
                  <TableCell className="max-w-[350px] font-normal">
                    <span className="">{order.items.length}{' '}{order.items.length > 1 ? 'items' : 'item'}</span>
                  </TableCell>
                  <TableCell className="max-w-[350px] font-normal">
                    <span className="">₦{order.totalPrice.toLocaleString()}</span>
                  </TableCell>
                  <TableCell className="max-w-[350px] font-normal">
                    <Badge variant={order.isPaid ? 'delivered' : 'pending'} className='w-20 items-center justify-center' >{order.isPaid ? 'Paid' : 'Not Paid'}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[350px] font-normal">
                    <Badge variant={order.status === 'CANCELLED' ? 'destructive' :
                      order.status === 'REJECTED' ? 'destructive' : order.status === 'PENDING' ? 'pending' :
                        order.status === 'PROCESSING' ? 'processing' : order.status === 'DELIVERED' ? 'delivered' : 'default'
                    } className='w-24 items-center justify-center'>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[350px] font-normal   text-right">
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      }
    </div>
  );
}
