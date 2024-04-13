import {BankTransferIcon} from '@/components/Icons/BankTransferIcon';
import {CreditCardIcon} from '@/components/Icons/CreditCardIcon';
import {Button} from '@/components/ui/button';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Minus} from '@phosphor-icons/react/dist/ssr/Minus';
import {Plus} from '@phosphor-icons/react/dist/ssr/Plus';
import {Trash} from '@phosphor-icons/react/dist/ssr/Trash';
import Image from 'next/image';
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


const invoices = [
  {
    id: 1,
    name: 'Advansd Neodermyl® Filler Serum',
    image: 'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Advansd Neodermyl® Filler Serum is the perfect choice for those concerned with signs of aging. This unique serum is formulated with Neodermyl®, which re-energizes aged fibroblasts and promotes the synthesis of collagen and elastin, resulting in firmer and smoother looking skin. ',
    quantity: 1,
    price: 62370
  },
  {
    id: 2,
    name: '2% Alpha Arbutin Face Serum',
    image: 'https://images.unsplash.com/photo-1601049413574-214d105b26e4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D',
    description: 'Our 2% Alpha Arbutin Face Serum is the perfect solution for brightening and evening out your skin tone. Our powerful formula is free of parabens, sulfates, and other harsh chemicals, offering a safe and natural skincare experience. Formulated with Alpha Arbutin, this serum helps to diminish the appearance of hyperpigmentation like age spots, acne marks, and melasma. Hyaluronic acid is also added to reduce dryness and leave your skin feeling hydrated and soft. Target spots, uneven skin tone, age spots, and free radical damage with this serum for a healthy, youthful complexion.',
    quantity: 2,
    price: 34800
  },
  {
    id: 3,
    name: 'AHA BHA Toner',
    image: 'https://images.unsplash.com/photo-1601049315503-07926a49f521?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'AHA BHA Toner is an effective toner made with natural ingredients from India. It is formulated for exfoliating and sloughing off dead skin cells while preventing pimples, acne, and blemishes. With gentle exfoliation, it helps to unclog pores while hydrating the skin. It stimulates cell renewal without drying the skin, yielding smoother and brighter results.',
    quantity: 4,
    price: 75200
  },
  {
    id: 4,
    name: 'AHA BHA Face Wash',
    image: 'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'This AHA BHA Face Wash is a perfect cleansing solution for those looking to maintain a healthy, clear complexion. It is a gel-based cleanser infused with Glycolic Acid, Lactic Acid, and Salicylic Acid, all of which help effectively remove makeup, excess oil, pollution, and grime from the skin while also helping treat and prevent acne. Its ingredients are formulated at an ideal, non-stripping pH level, making it gentle yet effective. Cruelty-free and vegan, this product is made in India.',
    quantity: 1,
    price: 45985
  },
  {
    id: 5,
    name: 'Multi-Peptide Moisturizer',
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'This peptide-rich moisturizer is specifically designed to lift, brighten, and energize your skin to give you a youthful glow. Non-greasy and lightweight, it moisturizes with 2% Matrixyl and purslane extract to firm and clear skin, while powerfully also fighting against free radical damage and soothing inflammation and irritation. Made in India, this moisturizer is an effective way to keep your skin looking and feeling its best.',
    quantity: 3,
    price: 47870
  },
  {
    id: 6,
    name: 'Jade Quartz Face Roller & Gua Sha Set',
    image: 'https://images.unsplash.com/photo-1564594326930-17381130fd2e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Relax and rejuvenate your skin with this Jade Quartz Face Roller & Gua Sha Set. Made with 100% certified non-toxic and extra-smooth jade quartz, these two custom-sized stones work anywhere on your body – face, neck, arm, back, legs, etc. – for a tighter, younger, brighter complexion with a natural glow. Use on its own or with your favorite skincare product and get maximum absorption with an easy, refreshing massage. Refrigerate for best results.',
    quantity: 2,
    price: 36050
  },
];

export default function OrderPage() {
  return (
    <div className='mx-auto min-h-[calc(100vh-130px)] max-w-7xl py-6 sm:px-6 lg:px-8' >
      <div className='flex flex-col lg:flex-row gap-4'>
        <div className="flex flex-col bg-accent rounded-xl p-4 basis-3/4">
          <h2 className='text-base  font-medium text-gray-900 mb-4'>
            Shopping Cart
          </h2>
          <div className=" border-t border-gray-300 pt-4">
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
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="max-w-[350px] font-medium">
                      <div className="flex gap-2 justify-items-start">
                        <Image
                          src={invoice.image}
                          alt='avatar'
                          width={40}
                          height={40}
                          className='rounded-sm h-10 w-10 object-cover'
                        />
                        <div className=" max-w-[350px] p-0">
                          <p className="text-sm font-normal">{invoice.name}</p>
                          <span className=' text-xs line-clamp-1 mt-1 text-black font-extralight'>{invoice.description}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex max-w-[80px] py-1 px-2 bg-slate-200 rounded-lg justify-between items-center ">
                        <Minus size={12} className='hover:underline cursor-pointer' />
                        <p className="text-xs">
                          {invoice.quantity}
                        </p>
                        <Plus size={12} className='hover:underline cursor-pointer' />

                      </div>
                    </TableCell>
                    <TableCell className='font-semibold text-sm'>₦{invoice.price.toLocaleString()}</TableCell>
                    <TableCell className="text-right"><Trash size={20} weight="light" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex">
              <Button variant={'destructive'} className='ml-4 mt-4 text-xs'>Clear Cart</Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 basis-1/4">
          <div className="bg-accent rounded-xl p-4 ">
            <h2 className='text-base  font-medium text-gray-900 mb-4'>
              Order Summary
            </h2>
            <div className=" border-t border-gray-300 pt-4">
              <div className="flex justify-between">
                <p className="text-xs font-light">Discount</p>
                <p className="text-sm font-normal">$0</p>
              </div>
              <div className="flex justify-between mt-1">
                <p className="text-xs font-light">Delivery</p>
                <p className="text-sm font-normal">$2,700</p>
              </div>
              <div className="flex justify-between mt-1">
                <p className="text-xs font-light">Tax</p>
                <p className="text-sm font-normal">$3,000</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-xs font-light">Total</p>
                <p className="text-sm font-normal">$128,700</p>
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
