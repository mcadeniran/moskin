'use client';
import {BankTransferIcon} from '@/components/Icons/BankTransferIcon';
import {CreditCardIcon} from '@/components/Icons/CreditCardIcon';
import {Button} from '@/components/ui/button';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Minus} from '@phosphor-icons/react/dist/ssr/Minus';
import {Plus} from '@phosphor-icons/react/dist/ssr/Plus';
import {Trash} from '@phosphor-icons/react/dist/ssr/Trash';
import Image from 'next/image';
import React, {useEffect} from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {useCartStore} from '@/lib/store';


export default function CartPage() {
  const {products, totalItems, totalPrice, removeFromCart} = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <div className='mx-auto min-h-[calc(100vh-180px)] max-w-7xl pt-6  px-4 sm:px-6 lg:px-8' >
      <div className='flex flex-col lg:flex-row gap-4'>
        <div className="flex flex-col basis-3/4">
          <div className="bg-accent rounded-xl p-4">
            <h2 className='text-base  font-medium text-gray-900 mb-4'>
              Shopping Cart
            </h2>
            <div className=" border-t border-gray-300 pt-4">
              {products.length === 0 && <p className='text-center text-sm text-gray-500'>Your cart is empty 😔</p>}
              {products.length > 0 && <>
                <Table className='w-full'>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="">Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-right"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="max-w-[350px] font-medium">
                          <div className="flex gap-2 justify-items-start">
                            <Image
                              src={item.image}
                              alt='avatar'
                              width={40}
                              height={40}
                              className='rounded-sm h-10 w-10 object-cover'
                            />
                            <div className=" max-w-[350px] p-0">
                              <p className="text-sm font-normal">{item.name}</p>
                              {/* <span className=' text-xs line-clamp-1 mt-1 text-black font-extralight'>{item.description}</span> */}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex max-w-[80px] py-1 px-2 bg-slate-200 rounded-lg justify-between items-center ">
                            <Minus size={12} className='hover:underline cursor-pointer' />
                            <p className="text-xs">
                              {item.quantity}
                            </p>
                            <Plus size={12} className='hover:underline cursor-pointer' />

                          </div>
                        </TableCell>
                        <TableCell className='font-semibold text-sm'>₦{item.price.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <Trash
                            size={20} weight="light"
                            onClick={() => removeFromCart(item)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex">
                  <Button variant={'destructive'} className='ml-4 mt-4 text-xs'>Clear Cart</Button>
                </div>
              </>
              }
            </div>

          </div>
        </div>
        <div className="flex flex-col gap-4 basis-1/4">
          <div className="bg-accent rounded-xl p-4 ">
            <h2 className='text-base  font-medium text-gray-900 mb-4'>
              Cart Summary
            </h2>
            <div className=" border-t border-gray-300 pt-4">
              <div className="flex justify-between">
                <p className="text-xs font-light">Discount</p>
                <p className="text-sm font-normal">₦0</p>
              </div>
              <div className="flex justify-between mt-1">
                <p className="text-xs font-light">Delivery</p>
                <p className="text-sm font-normal">₦3,000</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-xs font-light">Total</p>
                <p className="text-sm font-normal">₦{totalPrice === 0 ? 0 : (totalPrice + 3000).toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-accent rounded-xl p-4">
            <h2 className='text-base  font-medium text-gray-900 mb-4'>
              Payment Method
            </h2>
            <div className=" border-t border-gray-300 pt-4 justify-center items-center flex gap-4 mb-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant={'outline'} className='bg-slate-200'><CreditCardIcon /></Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Online Payment</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant={'outline'} className='bg-slate-200'><BankTransferIcon /></Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Bank Transfer</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Button className='w-full bg-slate-600'>Check Out</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
