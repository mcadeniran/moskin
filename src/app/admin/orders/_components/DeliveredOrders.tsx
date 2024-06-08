'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Order} from '@prisma/client';
import {useQuery} from '@tanstack/react-query';
import DateConverter from '@/components/date';
import {Badge} from '@/components/ui/badge';
import {CreditCard} from '@phosphor-icons/react/dist/ssr/CreditCard';
import {Bank} from '@phosphor-icons/react/dist/ssr/Bank';

const fetchDeliveredOrders = (): Promise<Order[]> => fetch('/api/admin/orders/status/DELIVERED', {method: 'GET'}).then(res => res.json());


const DeliveredOrders = () => {
  const {isLoading, data: orders, error} = useQuery({queryKey: ['deliveredOrders'], queryFn: fetchDeliveredOrders});

  if (isLoading) return <p className="">Loading Delivered Orders</p>;
  if (error) return <p className="">Unknown error occured</p>;

  console.log(orders);

  return (
    <div className='mt-4 min- h-[calc(100vh-23.8rem)]'>
      {
        orders?.length === 0 ?
          <div>No delivered order found</div>
          :
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order#</TableHead>
                <TableHead>Placed At</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Delivered At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                orders?.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className='font-bold'>#{order.id.substring(-6, 6)}</TableCell>
                    {/* <TableCell>{order.User.username}</TableCell> */}
                    <TableCell><DateConverter dateString={order.createdAt.toString()} /></TableCell>
                    <TableCell>{order.items.map((item: any) => (
                      <div className="" key={item.id}>{item.name} x {item.quantity}<br /></div>
                    ))}</TableCell>
                    <TableCell>₦{order.totalPrice.toLocaleString()}</TableCell>
                    <TableCell>
                      {!order.deliveredAt ? ''
                        : <Badge variant='delivered'>
                          <DateConverter dateString={order.deliveredAt.toString()} />
                        </Badge>}
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
      }
    </div>
  );
};

export default DeliveredOrders;