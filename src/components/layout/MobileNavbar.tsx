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
  List,
} from "@phosphor-icons/react/dist/ssr";
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

export async function MobileNavbar() {
  const session = await auth();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost'><span className='sr-only text-rosegold'>Open main menu</span>
          <List size={26} className='h-5 w-5' color="#B9A46D" />
        </Button>
      </SheetTrigger>
      <SheetContent className='p-0 w-[300px]'>
        <SheetHeader className='mt-8 '>
          {session?.user &&
            <SheetClose asChild  >
              <Link href='/profile' className='flex  justify-start font-light px-4 py-0  hover:bg-accent'>
                <div className="flex justify-between">
                  <div className="flex flex-row py-2 gap-2">
                    <Avatar className='border-rosegold/25 border p-0 cursor-pointer h-12 w-12'>
                      <AvatarImage src={session?.user.image} className='object-cover' alt="@shadcn" />
                      <AvatarFallback className=''>{session?.user.username.substring(0, 1).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <p className="text-sm font-light">{session.user.username}</p>
                      <p className="text-xs font-light">Edit profile</p>
                    </div>
                  </div>
                </div>
              </Link>
            </SheetClose>
          }
          <SheetClose asChild className='border-t border-rosegold/25 '  >
            <Link href='/' className='flex  justify-start font-light p-4  hover:bg-accent'>
              <SheetTitle className='font-light  flex items-center text-sm '><House className='mr-4 h-4 w-4' weight="light" />Home</SheetTitle>
            </Link>
          </SheetClose>
          <SheetClose asChild  >
            <Link href='#' className='flex justify-start font-light p-4  hover:bg-accent'>
              <SheetTitle className='font-light  flex items-center text-sm '><Info className='mr-4 h-4 w-4' weight="light" />About Us</SheetTitle>
            </Link>
          </SheetClose>
          <SheetClose asChild  >
            <Link href='/shop' className='flex justify-start font-light p-4  hover:bg-accent'>
              <SheetTitle className='font-light  flex items-center text-sm '><Storefront className='mr-4 h-4 w-4' weight="light" />Our Products</SheetTitle>
            </Link>
          </SheetClose>
        </SheetHeader>

        <SheetHeader className='border-t border-rosegold/25 '>
          <SheetClose asChild >
            <Link href={'/cart'} className='flex justify-start  font-light p-4  hover:bg-accent'>
              <SheetTitle className='font-light flex items-center  text-sm'><ShoppingBag className='mr-4 h-4 w-4' weight="light" />Cart</SheetTitle>
            </Link>
          </SheetClose>
          {
            session?.user &&
            <SheetClose asChild >
              <Link href={'/orders'} className='flex justify-start  font-light p-4  hover:bg-accent'>
                <SheetTitle className='font-light flex items-center  text-sm'><Basket className='mr-4 h-4 w-4' weight="light" />Orders</SheetTitle>
              </Link>
            </SheetClose>
          }
        </SheetHeader>

        <SheetHeader className='border-t border-rosegold/25 '>
          {
            session?.user.isAdmin &&
            <SheetClose asChild >
              <Link href={'/admin'} className='flex justify-start font-light p-4  hover:bg-accent'>
                <SheetTitle className='font-light flex items-center  text-sm'><UserSwitch className='mr-4 h-4 w-4' weight="light" />Switch to Admin</SheetTitle>
              </Link>
            </SheetClose>
          }
          {
            !session?.user &&
            <SheetClose asChild >
              <Link href={'/login'} className='flex justify-start  font-light p-4  hover:bg-accent'>
                <SheetTitle className='font-light flex  items-center text-sm'><SignIn className='mr-4 h-4 w-4' weight="light" /> Log in</SheetTitle>
              </Link>
            </SheetClose>
          }
          {
            session?.user &&
            <SheetClose asChild  >
              <AccountSignout >
                <Power className="ml-2 mr-4 h-4 w-4" weight="light" />
                <span className='text-sm font-light'>Sign Out</span>
              </AccountSignout>
            </SheetClose>
          }
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
