'use client';
import {featuredProducts} from '@/app/data';
import {Button} from '@/components/ui/button';
import {Product} from '@prisma/client';
import {useQuery} from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';
import FeaturedLoadingComponent from './FeaturedLoadingComponent';

export default function FeaturedComponent() {
  const {isLoading, error, data} = useQuery({
    queryKey: ['featured'],
    queryFn: () =>
      fetch('/api/featured').then(res => res.json())
  });

  if (isLoading) return <FeaturedLoadingComponent />;

  if (error) return '';

  return (
    <div className='w-screen overflow-x-scroll'>
      {/* Wrapper */}
      <div className="w-max flex">
        {/* Single Item */}
        {
          data.map((item: Product) => (
            <div className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-slate-100 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]" key={item.id}>
              {/* Image Container */}
              <div className="relative flex-1 w-full">
                <Image src={item.images[0]} alt='' fill className='object-cover' sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
              </div>
              {/* Text Container */}
              <div className="flex-1 flex flex-col justify-center items-center gap-4">
                <h1 className="text-xl font-medium uppercase xl:text-2xl 2xl:text-3xl">{item.name}</h1>
                <p className="p-4 text-sm text-center 2xl:p-8 line-clamp-4 font-light">{item.description}</p>
                <span className="text-xl font-medium">₦{item.price}</span>
                <Button>Add to Cart</Button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
