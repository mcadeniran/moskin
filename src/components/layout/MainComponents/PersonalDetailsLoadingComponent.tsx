import {Skeleton} from '@/components/ui/skeleton';
import {PencilSimpleLine} from '@phosphor-icons/react/dist/ssr';
import React from 'react';

export default function PersonalDetailsLoadingComponent() {
  return (
    <div className="flex flex-col grow p-4 gap-4 rounded-lg  bg-accent shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0">
          <div className="flex">
            <div className="flex grow">
              Personal Information
            </div>
            <div className='flex items-center text-xs border px-2 py-1 rounded-xl cursor-pointer'>
              <span className="text-xs font-light">
                Edit
              </span>
              <PencilSimpleLine size={12} weight="thin" className='ml-2' />
            </div>
          </div>
          <span className="text-xs   text-gray-500 italic font-light">This will not be visible to the public</span>
        </div>

        <div className="flex gap-4">
          <div className="basis-1/3">
            <p className="text-xs font-light text-gray-500">
              First Name
            </p>
            <Skeleton className="mt-2 py-2 h-2 w-12 rounded-full bg-gray-300" />
          </div>
          <div className="basis-1/3">
            <p className="text-xs font-light text-gray-500">
              Last Name
            </p>
            <Skeleton className="mt-2 py-2 h-2 w-12 rounded-full bg-gray-300" />
          </div>
          <div className=""></div>

        </div>

        <div className="flex grow justify-between items-start">

          <div className="basis-1/3">
            <p className="text-xs font-light text-gray-500">
              Phone
            </p>
            <Skeleton className="mt-2 py-2 h-2 w-12 rounded-full bg-gray-300" />
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
}
