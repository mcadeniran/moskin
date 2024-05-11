'use client';
import {FormError} from '@/components/FormError';
import {Button} from '@/components/ui/button';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Order} from '@prisma/client';
import {useQuery} from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import React from 'react';

const fetchOrderDetails = (pid: string): Promise<Order> => fetch('/api/orders/' + pid).then(res => res.json());

export default function OrderDetails({id, paystackClientId, }: {id: string, paystackClientId: string;}) {
  const pid = id;
  const router = useRouter();

  const {isLoading, error, data} = useQuery({
    queryKey: ['order'],
    queryFn: () => fetchOrderDetails(pid)
  });

  if (isLoading) return <div className='mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8'>Loading Order Details!</div>;

  if (error) return <div className='mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8'>Unknown Error Occured!</div>;

  if (!data) return <div className='mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8'>No Product found!</div>;

  const shippingAddress = data.shippingAddress as ShippingAddress;
  const items = data.items as CartItem[];

  return (
    <>
      {data &&
        <div className='min-h-[calc(100vh-200px)] mx-auto max-w-2xl px-4 mb-8 sm:px-6  lg:max-w-7xl lg:px-8 my-4'>

          <h1 className="text-lg font-medium">
            Order {data.id}
          </h1>
          <div className="grid md:grid-cols-4 md:gap-4 my-4">
            <div className="md:col-span-2">
              <div className="bg-accent p-4 rounded-xl">
                <h2 className="text-base font-medium">Shipping Address</h2>

                <p className="pt-4">{shippingAddress.fullName}</p>
                <p className="pt-4">
                  {shippingAddress.house},{' '}
                  {shippingAddress.street},{' '}
                  <p className="">
                    {shippingAddress.city},{' '}
                    {shippingAddress.state},
                  </p>
                </p>
                <p>
                  {shippingAddress.country},{' '}
                  {shippingAddress.postalCode}.
                </p>
                {data.isDelivered ? (
                  <div className="text-emerald-500">Delivered at {data.deliveredAt!.toDateString()}</div>
                ) : (
                  <div className="mt-2 text-error">Not Delivered</div>
                )}
              </div>
            </div>
            <div className="p-4 bg-accent rounded-xl">
              <div className="">
                <h2 className="text-base font-medium">Payment Method</h2>
                <p className="mt-2">{data.paymentMethod === 'OnlinePayment' ? 'Online Payment' : 'Bank Transfer'}</p>
                {
                  data.isPaid ? (
                    <div className="mt-2text-emerald-500">Paid at {data.paidAt!.toDateString()}</div>
                  ) : (
                    <div className="mt-2 text-error">Not Paid</div>
                  )
                }
              </div>
            </div>
            <div className="">
              <div className="flex flex-col bg-accent p-4 gap-2 rounded-xl">
                <h2 className="text-lg font-medium">Order Summary</h2>
                <div className="flex justify-between">
                  <p className="">Items</p>
                  <p className="">₦{data.itemsPrice.toLocaleString()}</p>
                </div>
                <div className="flex justify-between">
                  <p className="">Shipping</p>
                  <p className="">₦{data.shippingPrice.toLocaleString()}</p>
                </div>
                <div className="flex justify-between">
                  <p className="">Total</p>
                  <p className="">₦{data.totalPrice.toLocaleString()}</p>
                </div>
                {
                  error && <div className="my-2">
                    <FormError message={error} />
                  </div>
                }
                {/* <Button className='bg-slate-800 mt-2' onClick={handlePlaceOrder} disabled={isPending}>{isPending ? <CircleNotch size={22} className='animate-spin' /> : 'Place Order'}</Button> */}
              </div>
            </div>
            <div className="overflow-x-auto md:col-span-3 ">
              {items.length > 0 &&
                <div className='w-full bg-accent p-4 rounded-xl'>
                  <Table className='w-full'>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="">Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="max-w-[350px] font-medium">
                            <Link href={`/products/${item.id}`}>
                              <div className="flex gap-2 justify-items-start">
                                <Image
                                  src={item.image}
                                  alt='avatar'
                                  width={50}
                                  height={50}
                                  className='rounded-sm h-10 w-10 object-cover'
                                />
                                <div className=" max-w-[350px] p-0">
                                  <p className="text-sm font-normal">{item.name}</p>
                                </div>
                              </div>
                            </Link>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-row justify-start items-center gap-2 mt-2">
                              <div className='text-center text-xs font-light  w-16 border rounded-2xl py-1 '>{item.quantity}</div>
                            </div>
                          </TableCell>

                          <TableCell className='font-semibold text-sm text-right'>₦{(item.price * item.quantity).toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              }
            </div>

          </div>
        </div>
      }
    </>
  );
}