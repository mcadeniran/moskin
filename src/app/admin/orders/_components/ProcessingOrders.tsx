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
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import DateConverter from '@/components/date';
import {Badge} from '@/components/ui/badge';
import {CreditCard} from '@phosphor-icons/react/dist/ssr/CreditCard';
import {Bank} from '@phosphor-icons/react/dist/ssr/Bank';
import {Button} from '@/components/ui/button';
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from '@/components/ui/alert-dialog';
import {toast} from 'sonner';

const fetchProcessingOrders = (): Promise<Order[]> => fetch('/api/admin/orders/status/PROCESSING', {method: 'GET'}).then(res => res.json());

const ProcessingOrders = () => {
  const {isLoading, data: orders, error} = useQuery({queryKey: ['processingOrders'], queryFn: fetchProcessingOrders});

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return fetch('/api/admin/orders', {
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(data),
        method: 'PATCH'
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ['processingOrders']});
      toast.success("Order status has been updated to SHIPPED");
    },
    onError() {
      toast.error("An error occured.");
    }
  });

  const updateOrder = (id: string, type: string, reason?: string) => {
    const data = {id: id, type: type, reason};
    console.log(data);
    mutation.mutate(data);
  };

  if (isLoading) return <p className="">Loading Processing Orders</p>;
  if (error) return <p className="">Unknown error occured</p>;


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
                    <TableCell>
                      <div className="flex flex-col gap-2">
                        <AlertDialog >
                          <AlertDialogTrigger>
                            <div className='flex items-center justify-center text-xs border-transparent bg-slate-500/15 text-slate-500 hover:bg-slate-500/30 px-2 py-2 rounded-sm'>
                              Confirm shipping
                            </div>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will set the status of the order to shipped and cannot be reverted.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  updateOrder(order.id, 'SHIPPED')
                                }>Confirm</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <Button className='flex gap-2 text-xs border-transparent bg-red-500/15 text-red-500 hover:bg-red-500/30 px-2 py-1'>
                          Reject order
                        </Button>
                      </div>
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

export default ProcessingOrders;