import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import e403 from '/public/deny.jpg';

export default function DeniedPage() {
  return (
    <section className='flex min-h-[calc(100vh-130px)] w-full px-8  items-center justify-center'>
      <div className="flex flex-col   lg:flex-row ">
        <div className="flex relative justify-center items-center basis-2/3">
          <Image src={e403} alt='Forbidden' style={{maxWidth: '100%', height: 'auto'}} />
        </div>
        <div className="flex items-center flex-col justify-center gap-4 basis-1/3">
          <p className="text-2xl max-w-2xl font-light text-gray-700 text-center">
            You are logged in, but you do not have the required access level to view this page.
          </p>
          <Link href={'/'} className='text-lg underline'>Return to Home Page</Link>
        </div>
      </div>
    </section>
  );
}
