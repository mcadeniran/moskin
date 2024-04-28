import React from 'react';
import {db} from '@/lib/db';
import PersonalDetailsComponent from '@/components/layout/MainComponents/PersonalDetailsComponent';
import AddressDetailsComponent from '@/components/layout/MainComponents/AddressDetailsComponent';
import {auth} from '@/auth';
import UsernameAndImageComponent from '@/components/layout/MainComponents/UsernameAndImageComponent';



export default async function ProfilePage() {
  const session = await auth();
  if (!session) return;

  const user = await db.user.findUnique({where: {email: session.user.email!}});

  if (!user) return <p className="">Error finding user details. Please try again</p>;


  return (
    <div className='mx-auto min-h-[calc(100vh-167px)] max-w-7xl px-4 lg:py-6 sm:px-6 lg:px-8'>
      <div className="flex flex-col gap-6">
        <UsernameAndImageComponent />
        {/* Personal details Container */}

        <PersonalDetailsComponent />
        {/* Addresses Container */}

        <AddressDetailsComponent />

      </div>
    </div>
  );
}
