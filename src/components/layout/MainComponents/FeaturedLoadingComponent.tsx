import {Skeleton} from '@/components/ui/skeleton';
import React from 'react';

const empties = [
  {
    id: '1'
  },
  {
    id: '2'
  },
  {
    id: '3'
  },
  {
    id: '4'
  },
  {
    id: '5'
  },
];

export default function FeaturedLoadingComponent() {
  return (
    <div className='w-screen overflow-x-scroll'>
      {/* Wrapper */}
      <div className="w-max flex">
        {/* Single Item */}
        {
          empties.map((item) => (
            <div className="w-screen h-[50vh] flex flex-col justify-around p-4 
            hover:bg-gray-100/50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[80vh]" key={item.id}>
              {/* Image Container */}
              <div className="relative  basis-4/5 w-full">
                <Skeleton className='h-full w-full' />
              </div>
              {/* Text Container */}
              <div className="basis-1/5 flex flex-col justify-between py-4 gap-4 ">
                <Skeleton className=' w-[45%] h-8' />
                <div className="flex flex-col gap-2">
                  <Skeleton className=' w-full h-2' />
                  <Skeleton className=' w-full h-2' />
                  <Skeleton className=' w-[57%] h-2' />
                </div>
                <div className="flex gap-4">
                  <Skeleton className=' w-12 h-12' />
                  <Skeleton className=' w-full h-12' />
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
