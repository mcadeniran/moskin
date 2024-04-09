'use client';

import {useState} from 'react';
import {Dialog} from '@headlessui/react';
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline';
import logo from '/public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import {Icon} from '@iconify/react/dist/iconify.js';

const navigation = [
  {name: 'Home', href: '/'},
  {name: 'About', href: '#'},
  {name: 'Shop', href: '/shop'},
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className='inset-x-0 top-0 z-50 bg-secondary sticky bg-white'>
      <nav
        className='flex items-center justify-between p-4 lg:px-8'
        aria-label='Global'
      >
        <div className='flex lg:flex-1'>
          <a
            href='#'
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
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon
              className='h-6 w-6'
              aria-hidden='true'
            />
          </button>
        </div>
        <div className='hidden lg:flex lg:gap-x-12'>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='text-sm font-semibold leading-6 text-gray-900'
            >
              {item.name}
            </a>
          ))}
          <a
            href={'/admin'}
            className='text-sm font-semibold leading-6 text-gray-900'
          >
            Switch to Admin
          </a>
        </div>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end gap-6 items-baseline'>
          <Link href={''}>
            <Icon icon={'carbon:search'} height={22} width={22} className='text-sm font-semibold leading-6 text-gray-900' />
          </Link>
          <Link href={''}> <Icon icon={'ph:shopping-bag-light'} height={26} width={26} className='text-sm font-semibold leading-6 text-gray-900' /></Link>
          <Link href={'/login'}> <Icon icon={'healthicons:ui-user-profile-outline'} height={26} width={26} className='text-sm font-semibold leading-6 text-gray-900' /></Link>

        </div>
      </nav>
      <Dialog
        as='div'
        className='lg:hidden'
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className='fixed inset-0 z-50' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <a
              href='#'
              className='-m-1.5 p-1.5'
            >
              <span className='sr-only'>Your Company</span>
              <Image
                src={logo}
                className='h-12 w-auto'
                alt='logo'
              />
            </a>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <XMarkIcon
                className='h-6 w-6'
                aria-hidden='true'
              />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6'>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                  >
                    {item.name}
                  </a>
                ))}
                <a
                  href={'/admin'}
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                >
                  Switch to Admin
                </a>
              </div>
              <div className='py-6'>
                <Link href={''}
                  className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                >Cart</Link>
                <Link href={''} className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>Search</Link>
                <Link
                  href='/login'
                  className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
