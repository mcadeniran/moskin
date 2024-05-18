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
  MdCategory,
} from "react-icons/md";
import MenuLink from './menuLink';
import Image from 'next/image';
import {auth} from '@/auth';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

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
        title: "Categories",
        path: "/admin/categories",
        icon: <MdCategory />,
      },
      {
        title: "Orders",
        path: "/admin/orders",
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

export default async function AdminSidebar() {
  const session = await auth();
  return (
    <div className='sticky top-6'>
      <div className="flex items-center gap-5 mb-5">
        <Avatar className='p-0 h-12 w-12 md:h-16 md:w-16'>
          <AvatarImage src={session?.user.image} className=' object-cover' alt="@shadcn" />
          <AvatarFallback className=' text'>{session?.user.username.substring(0, 1).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className='font-semibold'>{session?.user.username}</span>
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
