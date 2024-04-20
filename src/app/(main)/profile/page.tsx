import {getAuthSession} from '@/lib/auth';
import femaleAvatar from '/public/female_avatar.png';
import Image from 'next/image';
import React from 'react';
import {db} from '@/lib/db';
import PersonalDetailsComponent from '@/components/layout/MainComponents/PersonalDetailsComponent';
import AddressDetailsComponent from '@/components/layout/MainComponents/AddressDetailsComponent';


export default async function ProfilePage() {
  const session = await getAuthSession();
  if (!session) return <p>Login</p>;

  const user = await db.user.findUnique({where: {email: session.user.email!}});

  if (!user) return <p className="">Error findind user details. Please try again</p>;


  return (
    <div className='mx-auto min-h-[calc(100vh-130px)] max-w-7xl px-4 lg:py-6 sm:px-6 lg:px-8'>
      <div className="flex flex-col gap-6">
        <div className="flex flex-row grow gap-4 justify-start items-start p-4  rounded-lg bg-accent shadow-sm">
          {/* Image Container */}
          <div className="relative">
            <Image
              src={user.image === '' ? femaleAvatar : user.image}
              alt='avatar'
              height={60}
              width={60}
              className='rounded-full h-14 w-14 md:h-16 md:w-16 object-cover'
            />
          </div>
          {/* User name and email Container */}
          <div className="">
            <p className="text-base font-medium text-gray-700">{user.username}</p>
            <span className="text-sm font-light text-gray-700">{user.email}</span>
          </div>
        </div>
        {/* Personal details Container */}

        <PersonalDetailsComponent />
        {/* Addresses Container */}

        <AddressDetailsComponent />

      </div>
    </div>
  );
}
