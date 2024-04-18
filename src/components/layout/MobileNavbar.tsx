import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {Bars3Icon} from '@heroicons/react/24/outline';
import Link from 'next/link';

const navigation = [
  {name: 'Home', href: '/'},
  {name: 'About', href: '#'},
  {name: 'Our Products', href: '/shop'},
];


export function MobileNavbar() {
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
          {
            navigation.map(n => (
              <SheetClose asChild key={n.name} >
                <Link href={n.href} className=' font-normal p-4  hover:bg-accent'>
                  <SheetTitle className='font-medium'>{n.name}</SheetTitle>
                </Link>
              </SheetClose>

            ))
          }
          <SheetClose asChild >
            <Link href={'/admin'} className=' mb-4 font-normal p-4  hover:bg-accent'>
              <SheetTitle className='font-medium'>Switch to Admin</SheetTitle>
            </Link>
          </SheetClose>
        </SheetHeader>

        <SheetHeader className='border-t '>
          <SheetClose asChild >
            <Link href={'/cart'} className='font-normal p-4  hover:bg-accent'>
              <SheetTitle className='font-medium'>Cart</SheetTitle>
            </Link>
          </SheetClose>
          <SheetClose asChild >
            <Link href={'#'} className=' font-normal p-4  hover:bg-accent'>
              <SheetTitle className='font-medium'>Search</SheetTitle>
            </Link>
          </SheetClose>
          <SheetClose asChild >
            <Link href={'/login'} className=' font-normal p-4  hover:bg-accent'>
              <SheetTitle className='font-medium'>Log in</SheetTitle>
            </Link>
          </SheetClose>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
