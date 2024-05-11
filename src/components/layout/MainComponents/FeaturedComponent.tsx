'use client';

import {Button} from '@/components/ui/button';
import {Product} from '@prisma/client';
import {useQuery} from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';
import FeaturedLoadingComponent from './FeaturedLoadingComponent';
import {ArrowRight, ArrowsOut, ShoppingCart} from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import TitleComponenet from './TitleComponenet';
import {AspectRatio} from '@/components/ui/aspect-ratio';

export default function FeaturedComponent() {
  const {isLoading, error, data} = useQuery({
    queryKey: ['featured'],
    queryFn: () =>
      fetch('/api/featured').then(res => res.json())
  });

  if (isLoading) return <FeaturedLoadingComponent />;


  if (error) return '';

  return (
    <div className='px-8 py-4 '>
      <TitleComponenet title='Best Selling Products' />
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4  md:grid-cols-3 lg:grid-cols-4 ">
        {
          data.map((item: any) => (
            <div className="flex flex-col gap-2 " key={item.id}>
              {/* IMAGE CONTAINER */}
              <AspectRatio ratio={1} className="relative">
                <Image src={item.images[0]} alt='' fill className='object-cover rounded-lg' sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
              </AspectRatio>
              {/* DETAILS CONTAINER */}
              <div className="flex flex-col ">
                <div className="flex flex-col items-start">
                  <div className="flex w-full justify-between items-center">
                    <h1 className=" text-sm font-normal  xl:text-base 2xl:text-lg">{item.name}</h1>
                    {
                      item.onSale && <p className="text-destructive/80 text-xs">-{item.off}%</p>
                    }
                  </div>
                  <h1 className=" text-xs font-light xl:text-sm 2xl:text-base text-gray-700/70">{item.Category.name}</h1>
                </div>
                <div className="flex justify-between items-center">
                  {item.onSale === false ?
                    <p className='text-xs xl:text-sm 2xl:text-base font-light'>
                      ₦{item.price.toLocaleString()}
                    </p> :
                    <p className='text-xs xl:text-sm 2xl:text-base font-light '>
                      ₦{(item.price - (item.price * (item.off! / 100))).toLocaleString()}
                    </p>
                  }
                  <Button variant='ghost' size='icon' asChild>
                    <Link
                      key={item.id}
                      href={'/products/' + item.id}
                      className='group p-0'
                    >
                      <ArrowRight size={18} weight="light" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div >
  );
}
