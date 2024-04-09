'use client';

import {usePathname} from "next/navigation";
import {MdNotifications, MdOutlineChat, MdPublic, MdSearch} from "react-icons/md";


export default function AdminNavbar() {
  const pathname = usePathname();
  let pageTitle = pathname.split('/').pop();

  if (pageTitle === 'admin') {
    pageTitle = 'dashboard';
  }
  return (
    <div className="flex justify-between items-center mb-5">
      <div className="text-gray-700 font-bold capitalize">
        {pageTitle}
        {/* {pathname.split("/").pop()} */}
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-x-2 bg-gray-100 p-1 rounded-lg">
          <MdSearch />
          <input type="text" placeholder="Search..." className="bg-transparent border-none px-2 py-1" />
        </div>
        <div className="flex gap-5">
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
        </div>
      </div>
    </div>
  );
}
