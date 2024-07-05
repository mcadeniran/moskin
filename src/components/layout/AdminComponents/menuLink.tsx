'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import React from 'react';

export default function MenuLink({item}: {
  item: {
    path: string,
    icon: any,
    title: string;
  };
}) {
  const pathname = usePathname();

  return (
    <Link href={item.path} className={`flex p-3 text-base font-light items-center my-1 gap-3 rounded-lg hover:bg-gray-300 ${pathname === item.path && 'bg-gray-300'}`}>
      {item.icon}
      {item.title}
    </Link>
  );
}
