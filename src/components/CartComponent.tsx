'use client';
import {useCartStore} from '@/lib/store';
import {ShoppingBag} from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import React, {useEffect} from 'react';

export default function CartComponent() {
  const {totalItems} = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <Link href={'/cart'}>
      <div className="relative inline-flex items-center text-center">
        <ShoppingBag
          size={24}
          className='text-sm font-medium leading-6 text-gray-900'
        />
        <div className="absolute inline-flex items-center justify-center w-5 h-5 bg-slate-100  text-xs font-medium text-black  rounded-full -top-3 -end-2">
          {totalItems}
        </div>
      </div>
    </Link>

  );
}
