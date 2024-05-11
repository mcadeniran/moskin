'use client';
import {createOrder} from '@/actions/create-order';
import {FormError} from '@/components/FormError';
import CheckoutSteps from '@/components/layout/CheckoutSteps';
import {Button} from '@/components/ui/button';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import useCartStore from '@/lib/store';
import {getAddressDeliveryPrice} from '@/lib/utils';
import {CircleNotch} from '@phosphor-icons/react/dist/ssr';
import {useQuery} from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState, useTransition} from 'react';
import {toast} from 'sonner';

const Form = () => {
  const router = useRouter();
  const {paymentMethod, deliveryAddress, items, totalPrice, clear} = useCartStore();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [shippingPrice, setShippingPrice] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sPrice = getAddressDeliveryPrice(deliveryAddress.country, deliveryAddress.state);
    const t = sPrice + totalPrice;
    setTotal(t);
    setShippingPrice(sPrice);
  }, [deliveryAddress, totalPrice]);

  useEffect(() => {
    if (!paymentMethod) {
      return router.push('/payment');
    }
    if (items.length === 0) {
      return router.push('/');
    }
  }, [items.length, paymentMethod, router]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;


  const handlePlaceOrder = () => {
    setError('');
    setSuccess('');

    const data = {items, paymentMethod, deliveryAddress, totalPrice};
    startTransition(() => {
      createOrder(data)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
            toast.success(data.success);
            router.push(`/orders/${data.data}`);
            clear();
          }
        }).catch(() => setError('Something went wrong!'));
    });
  };

  return (
    <div className="flex flex-col w-full items-center justify-center gap-6 p-4 sm:p-6 md:p-8 lg:p-10">
      <CheckoutSteps current={4} />
      <div className="grid gap-4 md:grid-cols-3 md:gap-4 my-4 w-full max-w-7xl">
        <div className="overflow-x-auto md:col-span-2 ">
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
              <div className="flex items-end justify-end my-4">
                <Link href='/cart' className='underline'>Edit</Link>
              </div>
            </div>
          }
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-accent p-4 rounded-xl">
            <h2 className="text-lg font-medium">Shipping Address</h2>
            <p className="pt-4">{deliveryAddress.fullName}</p>
            <p className="pt-4">
              {deliveryAddress.house},{' '}
              {deliveryAddress.street},{' '}
              <p className="">
                {deliveryAddress.city},{' '}
                {deliveryAddress.state},
              </p>
            </p>
            <p>
              {deliveryAddress.country},{' '}
              {deliveryAddress.postalCode}.
            </p>
            <div className="flex justify-end">
              <Link href='/shipping' className='underline'>Edit</Link>
            </div>
          </div>
          <div className="">
            <div className="bg-accent p-4 rounded-xl">
              <h2 className="text-lg font-medium">Payment Method</h2>
              <p className="pt-4">{paymentMethod === 'OnlinePayment' ? 'Online Payment' : 'Bank Transfer'}</p>
              <div className="flex justify-end">
                <Link href='/payment' className='underline'>Edit</Link>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex flex-col bg-accent p-4 gap-2 rounded-xl">
              <h2 className="text-lg font-medium">Order Summary</h2>
              <div className="flex justify-between">
                <p className="">Items</p>
                <p className="">₦{totalPrice.toLocaleString()}</p>
              </div>
              <div className="flex justify-between">
                <p className="">Shipping</p>
                <p className="">₦{shippingPrice.toLocaleString()}</p>
              </div>
              <div className="flex justify-between">
                <p className="">Total</p>
                <p className="">₦{total.toLocaleString()}</p>
              </div>
              {
                error && <div className="my-2">
                  <FormError message={error} />
                </div>
              }
              <Button className='bg-slate-800 mt-2' onClick={handlePlaceOrder} disabled={isPending}>{isPending ? <CircleNotch size={22} className='animate-spin' /> : 'Place Order'}</Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Form;