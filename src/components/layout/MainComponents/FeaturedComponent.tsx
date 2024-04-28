'use client';
import {featuredProducts} from '@/app/data';
import {Button} from '@/components/ui/button';
import {Product} from '@prisma/client';
import {useQuery} from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';
import FeaturedLoadingComponent from './FeaturedLoadingComponent';
import {ArrowsOut, ShoppingCart} from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

export default function FeaturedComponent() {
  const {isLoading, error, data} = useQuery({
    queryKey: ['featured'],
    queryFn: () =>
      fetch('/api/featured').then(res => res.json())
  });

  if (isLoading) return <FeaturedLoadingComponent />;

  if (error) return '';

  return (
    <>
      <div className="mt-8 px-4 flex items-center justify-center gap-2">
        <h1 className=' text-slate-800 font-medium text-lg md:text-2xl'>Best Sellers</h1>
        <hr className='grow bg-slate-800' />
      </div>
      <div className='w-screen overflow-x-scroll'>
        {/* Wrapper */}
        <div className="w-max flex">
          {/* Single Item */}
          {
            data.map((item: Product) => (
              <div className="w-screen h-[50vh] flex flex-col items-center justify-around p-4 
            hover:bg-gray-100/50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[80vh]" key={item.id}>
                {/* Image Container */}
                <div className="relative basis-4/5 w-full">
                  <Image src={item.images[0]} alt='' fill className='object-cover' sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
                </div>
                {/* Text Container */}
                <div className="basis-1/5 flex flex-col justify-between py-4 gap-4 ">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <h1 className=" text-base font-bold uppercase xl:text-lg 2xl:text-xl">{item.name}</h1>
                      {
                        item.onSale && <p className="text-emerald-500">-{item.off}%</p>
                      }
                    </div>
                    {item.onSale === false &&
                      <p className='text-sm xl:text-base 2xl:text-lg font-semibold pt-2'>
                        ₦{item.price.toLocaleString()}
                      </p>
                    }
                    {
                      item.onSale === true &&
                      <div className="flex gap-2 items-center ">
                        <p className='text-xs xl:text-sm 2xl:text-base font-light text-gray-500 pt-2 line-through'>
                          ₦{item.price.toLocaleString()}
                        </p>
                        <p className='text-sm xl:text-base 2xl:text-lg font-semibold pt-2'>
                          ₦{(item.price - (item.price * (item.off! / 100))).toLocaleString()}
                        </p>
                      </div>
                    }
                  </div>
                  <p className="line-clamp-3 text-xs xl:text-small 2xl:text-base font-light">{item.description.trim()}</p>
                  <div className="flex items-center gap-4 justify-between">
                    <div className="border p-2 flex items-center rounded-lg cursor-pointer">
                      <Link
                        key={item.id}
                        href={'/products/' + item.id}
                        className='group'
                      >
                        <ArrowsOut size={22} weight="light" />
                      </Link>
                    </div>
                    <Button size='sm' className='p-2 bg-slate-800 grow'><ShoppingCart size={18} weight="light" className='mr-2' />Add to cart</Button>
                  </div>

                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}
