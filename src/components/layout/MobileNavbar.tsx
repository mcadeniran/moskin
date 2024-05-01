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
import {Info, House, Storefront, Power, ShoppingBag, SignIn, UserSwitch, MagnifyingGlass} from "@phosphor-icons/react/dist/ssr";

const navigation = [
  {name: 'Home', href: '/'},
  {name: 'About', href: '#'},
  {name: 'Our Products', href: '/shop'},
];


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
          <SheetClose asChild >
            <Link href={'/cart'} className='flex justify-start  font-light p-4  hover:bg-accent'>
              <SheetTitle className='font-normal flex items-center  text-base'><ShoppingBag className='mr-4 h-6 w-6' weight="light" />Cart</SheetTitle>
            </Link>
          </SheetClose>
          <SheetClose asChild >
            <Link href={'#'} className='flex justify-start  font-light p-4  hover:bg-accent'>
              <SheetTitle className='font-normal flex items-center  text-base'><MagnifyingGlass className='mr-4 h-6 w-6' weight="light" />Search</SheetTitle>
            </Link>
          </SheetClose>
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
