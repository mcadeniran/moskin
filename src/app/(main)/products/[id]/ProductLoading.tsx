import {Skeleton} from '@/components/ui/skeleton';
import React from 'react';

const ims = [
  {id: 1},
  {id: 2},
];

export default function ProductLoading() {
  return (
    <div className='min-h-[calc(100vh-200px)] mx-auto max-w-2xl px-4 mb-8 sm:px-6  lg:max-w-7xl lg:px-8'>
      <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-start mt-6">
        <div className="flex flex-col gap-6 lg:w-2/5">
          <div className="relative w-full  aspect-h-1 aspect-w-1">
            <Skeleton className='w-full h-[400px]' />
          </div>
          <div className="flex flex-row gap-4 h-24">
            {
              ims.map(im => (
                <Skeleton key={im.id} className='h-24 w-24' />
              ))
            }
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:w-3/5">
          <div className=" whitespace-pre-line">
            <Skeleton className='w-1/6 h-4' />
            <Skeleton className='mt-6 w-3/5 h-10' />
            <Skeleton className='mt-8  w-1/5 h-6' />
            <div className="mt-6 flex flex-row items-center gap-16">
              <div className="flex flex-row gap-4 items-center">
                <Skeleton className=" w-12 h-12 text-primary py-2 px-5 rounded-lg text-2xl" />
                <Skeleton className=" w-12 h-12 text-primary py-2 px-5 rounded-lg text-2xl" />
                <Skeleton className=" w-12 h-12 text-primary py-2 px-5 rounded-lg text-2xl" />
              </div>
            </div>
            <Skeleton className="mt-6 w-5/6 h-2 text-primary py-2 px-5 rounded-lg text-2xl" />
            <Skeleton className="mt-2 w-5/6 h-2 text-primary py-2 px-5 rounded-lg text-2xl" />
            <Skeleton className="mt-2 w-5/6 h-2 text-primary py-2 px-5 rounded-lg text-2xl" />
            <Skeleton className="mt-2 w-3/6 h-2 text-primary py-2 px-5 rounded-lg text-2xl" />
            <Skeleton className="mt-10 h-6 w-1/6" />
            <Skeleton className="mt-4 w-5/6 h-2 text-primary py-2 px-5 rounded-lg text-2xl" />
            <Skeleton className="mt-2 w-3/6 h-2 text-primary py-2 px-5 rounded-lg text-2xl" />
            <Skeleton className="mt-10 h-6 w-1/6" />
            <Skeleton className="mt-4 w-5/6 h-2 text-primary py-2 px-5 rounded-lg text-2xl" />
          </div>
        </div>
      </div >
    </div>
  );

}
