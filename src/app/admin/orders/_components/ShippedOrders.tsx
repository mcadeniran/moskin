'use client';
import React, {useState} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import DateConverter from '@/components/date';
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from '@/components/ui/alert-dialog';
import {toast} from 'sonner';
import {CircleNotch} from '@phosphor-icons/react/dist/ssr';

const fetchAllOrders = (): Promise<any[]> => fetch('/api/admin/orders/status/SHIPPED', {method: 'GET'}).then(res => res.json());


const ShippedOrders = () => {
  const {isLoading, data: orders, error} = useQuery({queryKey: ['shippedOrders'], queryFn: fetchAllOrders});
  const [pending, setPending] = useState(false);
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
      queryClient.invalidateQueries({queryKey: ['shippedOrders']});
      toast.success("Order status has been updated to DELIVERED");
      setPending(false);
    },
    onError() {
      toast.error("An error occured.");
      setPending(false);
    }

  });

  const updateOrder = (id: string, type: string) => {
    const data = {id: id, type: type};
    setPending(true);
    mutation.mutate(data);
  };

  if (isLoading) return <p className="">Loading Orders</p>;
  if (error) return <p className="">Unknown error occured</p>;

  console.log(orders);

  return (
    <div className='mt-4 min-h-[calc(100vh-23.8rem)]'>
      {
        orders?.length === 0 ?
          <div>No shipped order found</div>
          :
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order#</TableHead>
                <TableHead>Shipped On</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Reciever</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                orders?.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className='font-bold'>#{order.id.substring(-6, 6)}</TableCell>
                    <TableCell><DateConverter dateString={order.updatedAt.toString()} /></TableCell>
                    <TableCell>{order.items.map((item: any) => (
                      <div className="" key={item.id}>{item.name} x {item.quantity}<br /></div>
                    ))}</TableCell>
                    <TableCell><div className="text-xs">
                      <p className="">
                        {order.shippingAddress?.fullName}
                      </p>
                      <p className="">
                        {order.shippingAddress?.house}{' '}
                        {order.shippingAddress?.street}
                      </p>
                      <p className="">
                        {order.shippingAddress?.city},{' '}
                        {order.shippingAddress?.state},
                      </p>
                      <p className="">
                        {order.shippingAddress?.postalCode},{' '}
                        {order.shippingAddress?.country}
                      </p>
                    </div></TableCell>
                    <TableCell>₦{order.totalPrice.toLocaleString()}</TableCell>
                    <TableCell>
                      <AlertDialog >
                        <AlertDialogTrigger disabled={pending}>
                          <div className='flex items-center justify-center text-xs border-transparent bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/30 px-2 py-2 rounded-sm cursor-pointer'>
                            {pending ? <CircleNotch size={22} className='animate-spin' /> : 'Mark as Delivered'}
                          </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Delivery?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Confirming means the order has been completed and marked as delivered.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className='bg-slate-800'
                              onClick={() =>
                                updateOrder(order.id, 'DELIVERED')
                              }>
                              Confirm
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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

export default ShippedOrders;