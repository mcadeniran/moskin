import {Product} from '@prisma/client';
import React from 'react';

interface ProductProp {
  data: Product;
}


const DetailsCompenent = ({data}: ProductProp) => {
  return (
    <div className='flex flex-col'>
      {/* DETAILS */}
      <div className="w-full border-t py-4 flex flex-col gap-4">
        <p className="italic text-lg font-medium text-gray-700 ">Description</p>
        <p className="text-sm text-gray-500 font-light">{data.description}</p>
      </div>
      <div className="w-full border-t py-4 flex flex-col gap-4">
        <p className="italic text-lg font-medium text-gray-700 ">How To Use</p>
        <p className="text-sm text-gray-500 font-light">{data.features}</p>
      </div>
      <div className="w-full border-t py-4 flex flex-col gap-4">
        <p className="italic text-lg font-medium text-gray-700 ">Active Ingredients</p>
        <p className="text-sm text-gray-500 font-light">{data.ingredients}</p>
      </div>
    </div>
  );
};

export default DetailsCompenent;