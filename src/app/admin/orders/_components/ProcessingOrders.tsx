'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Order} from '@prisma/client';
import {useRouter} from 'next/navigation';
import {useQuery} from '@tanstack/react-query';
import DateConverter from '@/components/date';
import {Badge} from '@/components/ui/badge';
import {CreditCard} from '@phosphor-icons/react/dist/ssr/CreditCard';
import {Bank} from '@phosphor-icons/react/dist/ssr/Bank';

const fetchProcessingOrders = (): Promise<Order[]> => fetch('/api/admin/orders/status/PROCESSING', {method: 'GET'}).then(res => res.json());

const ProcessingOrders = () => {
  const router = useRouter();
  const {isLoading, data: orders, error} = useQuery({queryKey: ['processingOrders'], queryFn: fetchProcessingOrders});

  if (isLoading) return <p className="">Loading Processing Orders</p>;
  if (error) return <p className="">Unknown error occured</p>;

  console.log(orders);

  return (
    <div className='mt-4 min- h-[calc(100vh-23.8rem)]'>
      {
        orders?.length === 0 ?
          <div>No order in process found</div>
          :
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order#</TableHead>
                {/* <TableHead>By</TableHead> */}
                <TableHead>Placed At</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Delivered At</TableHead>
                <TableHead>Action</TableHead>
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
                    <TableCell>₦{order.totalPrice}</TableCell>
                    <TableCell className=''>
                      <div className="flex gap-2 items-center">
                        <Badge variant={order.isPaid ? 'delivered' : 'pending'} className='min-w-20 items-center justify-center' >
                          {order.isPaid ? 'Paid' : 'Not Paid'}
                        </Badge>
                        {order.paymentMethod === 'OnlinePayment' ? <CreditCard size={18} /> : <Bank size={18} />}

                      </div>

                    </TableCell>
                    <TableCell>
                      <Badge variant={order.status === 'CANCELLED' ? 'destructive' :
                        order.status === 'REJECTED' ? 'destructive' : order.status === 'PENDING' ? 'pending' :
                          order.status === 'PROCESSING' ? 'processing' : order.status === 'DELIVERED' ? 'delivered' : 'default'
                      } className='min-w-24 items-center justify-center'>{order.status}</Badge>
                    </TableCell>
                    <TableCell>{order.deliveredAt ? <DateConverter dateString={order.deliveredAt.toString()} /> : <Badge variant='pending'>Not Delivered</Badge>}</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
      }
    </div>
  );
};

export default ProcessingOrders;