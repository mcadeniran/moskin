import logo from '/public/logo3.png';
import Image from 'next/image';
import Link from 'next/link';
import {MobileNavbar} from './MobileNavbar';
import {Basket, ClockCounterClockwise, Gear, MagnifyingGlass, Power, ShoppingBag, SignIn, User, UserCircle} from "@phosphor-icons/react/dist/ssr";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AccountSignout from '../AccountSignout';
import CartComponent from '../CartComponent';
import {auth, signOut} from '@/auth';



const navigation = [
  {name: 'Home', href: '/'},
  {name: 'About', href: '#'},
  {name: 'Our Products', href: '/shop'},
];

export default async function Header() {
  const session = await auth();
  return (
    <header className='inset-x-0 top-0 z-50 bg-secondary sticky bg-white'>
      <nav
        className='flex items-center justify-between p-4 lg:px-8'
        aria-label='Global'
      >
        <div className='flex lg:flex-1'>
          <a
            href='/'
            className='-m-1.5 p-1.5'
          >
            <span className='sr-only'>MOS</span>

            <Image
              src={logo}
              className='h-12 w-auto'
              alt='logo'
            />
          </a>
        </div>
        <div className='flex lg:hidden'>
          {/* Implement Shadcn menu side */}
          <MobileNavbar />
        </div>
        <div className='hidden lg:flex lg:gap-x-12'>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='text-sm font-medium leading-6 text-gray-900'
            >
              {item.name}
            </a>
          ))}
          {
            session?.user && session?.user.isAdmin &&
            <a
              href={'/admin'}
              className='text-sm font-medium leading-6 text-gray-900'
            >
              Switch to Admin
            </a>
          }
        </div>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end gap-6 items-center'>
          {/* <Link href={''}>
            <MagnifyingGlass size={22} className='text-sm font-medium leading-6 text-gray-900' />
          </Link> */}
          <CartComponent />
          {
            session?.user ?
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className='p-0 cursor-pointer'>
                    <AvatarImage src={session?.user.image} className=' object-cover' alt="@shadcn" />
                    <AvatarFallback className=' text'>{session?.user.username.substring(0, 1).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mr-4">
                  <DropdownMenuLabel>{session?.user.username}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className='py-4 cursor-pointer' asChild>
                      <Link href={'/profile'} className=''>
                        <UserCircle className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='py-4 cursor-pointer'>
                      <Basket className="mr-2 h-4 w-4" />
                      <span>Orders</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='py-4  cursor-pointer'>
                      <Gear className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='py-4 cursor-pointer' asChild>
                    <AccountSignout >
                      <Power className="mr-2 h-4 w-4" />
                      <span className='text-sm'>Sign Out</span>
                    </AccountSignout>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              :
              <Link href={'/login'}> <SignIn size={24} className='text-sm font-medium leading-6 text-gray-900' /></Link>
          }
        </div>
      </nav>
    </header>
  );
}
