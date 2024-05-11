'use client';

import {Button} from '@/components/ui/button';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Minus} from '@phosphor-icons/react/dist/ssr/Minus';
import {Plus} from '@phosphor-icons/react/dist/ssr/Plus';
import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import useCartStore from '@/lib/store';
import {FormError} from '@/components/FormError';
import {cn, getAddressDeliveryPrice} from '@/lib/utils';
import {Bank} from '@phosphor-icons/react/dist/ssr/Bank';
import {CreditCard} from '@phosphor-icons/react/dist/ssr/CreditCard';
import {useQuery} from '@tanstack/react-query';
import {Address} from '@prisma/client';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Label} from '@/components/ui/label';
import {useSession} from 'next-auth/react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

const paymentTypes = [
  {
    value: 'BankTransfer',
    text: 'Bank Transfer',
    icon: Bank,
  },
  {
    value: 'OnlinePayment',
    text: 'Online Payment',
    icon: CreditCard,
  },
];

const fetchUserAddress = (): Promise<Address[]> => fetch('/api/user/address').then(res => res.json());
export default function CartPage() {
  const session = useSession();
  const {items, totalPrice, increase, decrease, saveDeliveryAddress, savePaymentMethod} = useCartStore();

  const {isLoading, data: userAddress, error} = useQuery({queryKey: ['addresses'], queryFn: fetchUserAddress});
  const [address, setSelectedAddress] = useState('');

  const [delivery, setDelivery] = useState(0);

  const [paymentType, setPaymentType] = useState('');
  const [LocalError, setLocalError] = useState('');

  const router = useRouter();

  const handlePaymentType = (pType: string) => {
    if (pType === paymentType) {
      setPaymentType('');
    } else {
      setPaymentType(pType);
    }
  };

  useEffect(() => {
    const selectedAddress = userAddress && userAddress.find((ad) => ad.id === address);
    if (!selectedAddress) return;
    const getDeliveryPrice = getAddressDeliveryPrice(selectedAddress.country, selectedAddress.state);
    setDelivery(getDeliveryPrice);
  }, [address, userAddress]);

  const handleAddressSelection = (ad: string) => {
    setSelectedAddress(ad);
  };

  const selectedColor = 'bg-slate-800 text-white';

  const handleCheckout = async () => {
    setLocalError('');
    if (!session.data) {
      return router.push('/login');
    }
    if (paymentType === '') {
      setLocalError('Please select a payment method');
      return;
    }
    if (address === '') {
      setLocalError('Please select a delivery address');
      return;
    }
    else {
      const selectedAddress = userAddress && userAddress.find((ad) => ad.id === address);


      if (!selectedAddress) {
        return;
      }
      savePaymentMethod(paymentType);
      saveDeliveryAddress({
        house: selectedAddress.house,
        street: selectedAddress.street,
        city: selectedAddress.city,
        state: selectedAddress.state,
        postalCode: selectedAddress.postal,
        country: selectedAddress.country,
        fullName: '',
      });
      router.push('/shipping');
    }
  };

  return (
    <div className='mx-auto min-h-[calc(100vh-180px)] max-w-7xl pt-6  px-4 sm:px-6 lg:px-8' >
      <div className='flex flex-col lg:flex-row gap-4'>
        {/* SHOPPING CART DETAILS */}
        <div className="flex flex-col basis-3/4">
          <div className="bg-accent rounded-xl p-4">
            <h2 className='text-base  font-medium text-gray-900 mb-4'>
              Shopping Cart
            </h2>
            <div className=" border-t border-gray-300 pt-4">
              {items.length === 0 && <p className='text-center text-sm text-gray-500'>Your cart is empty 😔</p>}
              {items.length > 0 && <>
                <Table className='w-full'>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="">Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit Price</TableHead>
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
                            <div
                              onClick={() => decrease(item)}
                              className="text-center text-xs font-light cursor-pointer h-6 w-6  flex border rounded-full items-center justify-center">
                              <Minus size={16} weight="light" />
                            </div>
                            <div className='text-center text-xs font-light  w-16 border rounded-2xl py-1 '>{item.quantity}</div>
                            <div
                              onClick={() => increase(item)}
                              className="text-center text-xs font-light cursor-pointer h-6 w-6  flex border rounded-full items-center justify-center">
                              <Plus size={16} weight="light" />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className='font-semibold text-sm'>₦{item.price.toLocaleString()}</TableCell>
                        <TableCell className='font-semibold text-sm text-right'>₦{(item.price * item.quantity).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {/* <div className="flex">
                  <Button variant={'destructive'} className='ml-4 mt-4 text-xs'>Clear Cart</Button>
                </div> */}
              </>
              }
            </div>

          </div>
        </div>
        <div className="flex flex-col gap-4 basis-1/4">
          {/* PRICE DETAILS */}
          <div className="bg-accent rounded-xl p-4 ">
            <h2 className='text-base  font-medium text-gray-900 mb-4'>
              Cart Summary
            </h2>
            <div className=" border-t border-gray-300 pt-4">
              <div className="flex justify-between">
                <p className="text-xs font-light">Sub Total</p>
                <p className="text-sm font-normal">₦{totalPrice.toLocaleString()}</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-xs font-light">Delivery</p>
                <p className="text-sm font-normal">₦{delivery.toLocaleString()}</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-xs font-light">Discount</p>
                <p className="text-sm font-normal">₦0</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-xs font-light">Total</p>
                <p className="text-sm font-normal">₦{totalPrice === 0 ? 0 : (totalPrice + delivery).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* ADDRESS SECTION */}
          {
            session.data?.user &&
            <div className="bg-accent rounded-xl p-4 w-full">
              <h2 className='text-base  font-medium text-gray-900 mb-4'>
                Select Delivery Address
              </h2>
              <div className=" border-t pt-4 justify-start items-start flex mb-4 w-full gap-2">
                {error && <FormError message='Error fetching address' />}
                {isLoading && <p className=' italic text-xs'>Loading addresses...</p>}
                {!error && !isLoading && userAddress?.length === 0 && <p className=' italic text-xs'>No address saved!</p>}
                {
                  !error && !isLoading && userAddress && userAddress?.length > 0 &&
                  <RadioGroup className='flex w-full flex-col gap-4' defaultValue={''} onValueChange={(value) => handleAddressSelection(value)}>
                    {
                      userAddress.map(ad => (
                        <div key={ad.id} className="flex flex-col w-full">
                          <div className="flex items-center gap-4">
                            <RadioGroupItem value={ad.id} id={ad.id} />
                            <Label htmlFor={ad.id}>
                              {ad.title}
                            </Label>
                          </div>
                          <div className="pl-8 mt-2">
                            {
                              ad.id === address &&
                              <div className="flex flex-col w-full rounded-lg grow">
                                <p className="flex text-sm  text-muted-foreground">{ad.house}</p>
                                <p className="flex text-sm  text-muted-foreground">{ad.street}</p>
                                <p className="flex text-sm  text-muted-foreground">{ad.city}</p>
                                <p className="flex text-sm  text-muted-foreground">{ad.state} State</p>
                                <p className="flex text-sm  text-muted-foreground">{ad.country}</p>
                                <p className="flex text-sm  text-muted-foreground">{ad.postal}</p>
                              </div>
                            }
                          </div>
                        </div>
                      ))
                    }
                  </RadioGroup>
                }
              </div>

            </div>
          }
          {/* PAYMENT METHOD */}
          {
            session.data?.user &&
            <div className="bg-accent rounded-xl p-4">
              <h2 className='text-base  font-medium text-gray-900 mb-4'>
                Payment Method
              </h2>
              <div className=" border-t pt-4 justify-center items-center flex mb-4 w-full gap-2">
                {
                  paymentTypes.map((pt) => (
                    <Button
                      variant='outline'
                      key={pt.value}
                      className={cn(
                        'group flex-1 bg-slate-300 items-center  flex justify-center hover:bg-slate-400 hover:text-white',
                        paymentType === pt.value && selectedColor)}
                      onClick={() => handlePaymentType(pt.value)}
                    >
                      <pt.icon className='h-5 w-5 ' />
                      <span className="ml-2">
                        {pt.text}
                      </span>
                    </Button>
                  ))
                }
              </div>
              {
                LocalError !== '' && <div className="mb-2">
                  <FormError message={LocalError} />
                </div>
              }
              <Button className='w-full bg-slate-600 cursor-pointer  disabled:cursor-not-allowed ' onClick={handleCheckout} disabled={items.length === 0}>Check Out</Button>
            </div>
          }
          {/* USER NOT LOGGED IN */}
          {
            !session.data?.user &&
            <div className="bg-accent rounded-xl w-full p-4">
              <h2 className='text-base  font-medium text-gray-900 mb-4'>
                Authentication Required
              </h2>
              <div className=" border-t pt-4 justify-center items-center flex flex-col mb-4 w-full gap-2">
                <FormError message='To complete your order, please sign in or create an account to proceed.' />
                <Button className='w-full mt-4 bg-slate-600' asChild>
                  <Link href='/login'>Login</Link>
                </Button>

              </div>
            </div>
          }
        </div>
      </div>
    </div >
  );
};
