import React from 'react';
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdSwitchAccount,
  MdLogout,
} from "react-icons/md";
import MenuLink from './menuLink';
import Image from 'next/image';

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/admin",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/admin/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Products",
        path: "/admin/products",
        icon: <MdShoppingBag />,
      },
      {
        title: "Transactions",
        path: "/admin/transactions",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/admin/revenue",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "/admin/reports",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "/admin/teams",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/admin/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Switch to shop",
        path: "/",
        icon: <MdSwitchAccount />,
      },
    ],
  },
];

export default function AdminSidebar() {
  return (
    <div className='sticky top-6'>
      <div className="flex items-center gap-5 mb-5">
        <Image
          src={'https://images.unsplash.com/photo-1522938974444-f12497b69347?q=80&w=3418&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
          alt='avatar'
          height={48}
          width={48}
          className='rounded-full h-12 w-12 md:h-16 md:w-16 object-cover'
        />
        <div className="flex flex-col">
          <span className='font-semibold'>Jessica Felicio</span>
          <span className='text-xs text-gray-500'>Administrator</span>
        </div>
      </div>
      <ul className=''>
        {menuItems.map(cat => (
          <li key={cat.title}>
            <span className="text-gray-500 font-bold text-sm my-3">{cat.title}</span>
            {cat.list.map(item => (<MenuLink item={item} key={item.title} />))}
          </li>
        ))}
      </ul>
      <button className='flex p-4 items-center my-1 gap-3 rounded-lg w-full hover:bg-gray-100'><MdLogout /> Logout</button>
    </div>
  );
}
