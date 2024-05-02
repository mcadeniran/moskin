import {auth} from '@/auth';
import {Button} from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {Bars3Icon} from '@heroicons/react/24/outline';
import Link from 'next/link';
import AccountSignout from '../AccountSignout';
import {
  Info,
  House,
  Storefront,
  Power,
  ShoppingBag,
  SignIn,
  UserSwitch,
  Basket,
} from "@phosphor-icons/react/dist/ssr";
import Image from 'next/image';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

export async function MobileNavbar() {
  const session = await auth();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost'><span className='sr-only'>Open main menu</span>
          <Bars3Icon
            className='h-6 w-6'
            aria-hidden='true'
          /></Button>
      </SheetTrigger>
      <SheetContent className='p-0'>
        <SheetHeader className='mt-12'>
          {session?.user &&
            <SheetClose asChild  >
              <Link href='/profile' className='flex  justify-start font-light px-4 py-0  hover:bg-accent'>
                <div className="flex justify-between">
                  <div className="flex flex-row gap-2">
                    <Avatar className='p-0 cursor-pointer h-16 w-16'>
                      <AvatarImage src={session?.user.image} className=' object-cover' alt="@shadcn" />
                      <AvatarFallback className=''>{session?.user.username.substring(0, 1).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <p className="text-sm font-medium">{session.user.username}</p>
                      <p className="text-xs font-light">Edit profile</p>
                    </div>
                  </div>
                </div>
              </Link>
            </SheetClose>
          }
          <SheetClose asChild  >
            <Link href='/' className='flex  justify-start font-light p-4  hover:bg-accent'>
              <SheetTitle className='font-normal  flex items-center text-base '><House className='mr-4 h-6 w-6' weight="light" />Home</SheetTitle>
            </Link>
          </SheetClose>
          <SheetClose asChild  >
            <Link href='#' className='flex justify-start font-light p-4  hover:bg-accent'>
              <SheetTitle className='font-normal  flex items-center text-base '><Info className='mr-4 h-6 w-6' weight="light" />About Us</SheetTitle>
            </Link>
          </SheetClose>
          <SheetClose asChild  >
            <Link href='/shop' className='flex justify-start font-light p-4  hover:bg-accent'>
              <SheetTitle className='font-normal  flex items-center text-base '><Storefront className='mr-4 h-6 w-6' weight="light" />Our Products</SheetTitle>
            </Link>
          </SheetClose>
        </SheetHeader>

        <SheetHeader className='border-t '>
          <SheetClose asChild >
            <Link href={'/cart'} className='flex justify-start  font-light p-4  hover:bg-accent'>
              <SheetTitle className='font-normal flex items-center  text-base'><ShoppingBag className='mr-4 h-6 w-6' weight="light" />Cart</SheetTitle>
            </Link>
          </SheetClose>
          {
            session?.user &&
            <SheetClose asChild >
              <Link href={'#'} className='flex justify-start  font-light p-4  hover:bg-accent'>
                <SheetTitle className='font-normal flex items-center  text-base'><Basket className='mr-4 h-6 w-6' weight="light" />Orders</SheetTitle>
              </Link>
            </SheetClose>
          }
        </SheetHeader>

        <SheetHeader className='border-t '>
          {
            session?.user.isAdmin &&
            <SheetClose asChild >
              <Link href={'/admin'} className='flex justify-start font-light p-4  hover:bg-accent'>
                <SheetTitle className='font-normal flex items-center  text-base'><UserSwitch className='mr-4 h-6 w-6' weight="light" />Switch to Admin</SheetTitle>
              </Link>
            </SheetClose>
          }
          {
            !session?.user &&
            <SheetClose asChild >
              <Link href={'/login'} className='flex justify-start  font-light p-4  hover:bg-accent'>
                <SheetTitle className='font-normal flex  items-center text-base'><SignIn className='mr-4 h-6 w-6' weight="light" /> Log in</SheetTitle>
              </Link>
            </SheetClose>
          }
          {
            session?.user &&
            <SheetClose asChild  >
              <AccountSignout >
                <Power className="ml-2 mr-4 h-6 w-6" weight="light" />
                <span className='text-base'>Sign Out</span>
              </AccountSignout>
            </SheetClose>
          }
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
