import {getAuthSession} from '@/lib/auth';
import {PencilSimpleLine, Plus, Trash} from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const addresses = [
  {
    id: '1',
    title: 'Home',
    house: 'Suite 314',
    street: '9066 Wisoky Loaf',
    city: 'Lake Teressa',
    state: 'Winnipeg',
    postal: '21974',
    country: 'Nigeria',
  },
  {
    id: '2',
    title: 'Work',
    house: '42 Kayode Street',
    street: 'RemilekunVille',
    city: 'EsseVille',
    state: 'Osun',
    postal: '93708',
    country: 'Nigeria',
  },
  {
    id: '3',
    title: 'BF',
    house: 'Floor 6, Apartment 9',
    street: '30 Sekinat Street',
    city: 'TitilayoVille',
    state: 'Ekiti',
    postal: '78192',
    country: 'Nigeria',
  },
];

export default async function ProfilePage() {
  // const session = await getAuthSession();
  // if (!session) return <p>Login</p>;
  return (
    <div className='mx-auto min-h-[calc(100vh-130px)] max-w-7xl px-4 lg:py-6 sm:px-6 lg:px-8'>
      <div className="flex flex-col gap-6">
        <div className="flex flex-row grow gap-4 justify-start items-start p-4  rounded-lg bg-accent shadow-sm">
          {/* Image Container */}
          <div className="relative">
            <Image
              src={'https://images.unsplash.com/photo-1522938974444-f12497b69347?q=80&w=3418&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
              alt='avatar'
              height={60}
              width={60}
              className='rounded-full h-14 w-14 md:h-16 md:w-16 object-cover'
            />
          </div>
          {/* User name and email Container */}
          <div className="">
            <p className="text-base font-medium text-gray-700">Mr. Admin</p>
            <span className="text-sm font-light text-gray-700">admin@gmail.com</span>
            {/* <p className="text-base font-medium text-gray-700">{session.user.username}</p>
            <span className="text-sm font-light text-gray-700">{session.user.email}</span> */}
          </div>
        </div>
        {/* Personal details Container */}
        <div className="flex flex-col grow p-4 gap-4 rounded-lg  bg-accent shadow-sm">

          <div className="flex flex-col gap-0">
            <div className="flex">
              <div className="flex grow">
                Personal Information
              </div>
              <div className='flex items-center text-xs border px-2 py-1 rounded-xl cursor-pointer'>
                <span className="text-xs font-light">
                  Edit
                </span>
                <PencilSimpleLine size={12} weight="thin" className='ml-1' />
              </div>
            </div>
            <span className="text-xs text-gray-500 italic font-light">This will not be visible to the public</span>
          </div>
          {/* Name Container */}
          <div className="flex grow justify-between items-start">
            <div className="">
              <p className="text-xs font-light text-gray-500">
                First Name
              </p>
              <span className="text-sm">Jane</span>
            </div>
            <div className="">
              <p className="text-xs font-light text-gray-500">
                Last Name
              </p>
              <span className="text-sm">Doe</span>
            </div>
            <div className=""></div>
          </div>
          <div className="">
            <p className="text-xs font-light text-gray-500">
              Phone
            </p>
            <span className="text-sm">+2348036252321</span>
          </div>
        </div>
        {/* Addresses Container */}
        <div className="flex flex-col grow p-4 gap-4 rounded-lg  bg-accent shadow-sm">
          <div className="flex flex-col gap-0">
            <div className="flex">
              <div className="flex grow">
                Address
              </div>
              <div className='flex items-center text-xs border px-2 py-1 rounded-xl cursor-pointer'>
                <span className="text-xs font-light">
                  New
                </span>
                <Plus size={12} weight="thin" className='ml-1' />
              </div>
            </div>
            <span className="text-xs text-gray-500 italic font-light">This are for delivery purposes only.</span>
          </div>
          <Accordion type='single' collapsible className='w-full' >
            {
              addresses.map(address =>
                <AccordionItem value={address.id} key={address.id}>
                  <AccordionTrigger>{address.title}</AccordionTrigger>
                  <AccordionContent>
                    {/* Single Address Container */}
                    <div className="flex flex-col gap-4">

                      <div className="flex grow justify-between items-start">
                        <div className="basis-2/3">
                          <div className=""></div>
                          <p className="text-xs font-light text-gray-500">
                            House Address
                          </p>
                          <span className="text-sm">{address.house}</span>
                        </div>
                        {/* <div className=""></div> */}
                        <div className="flex justify-end gap-2 basis-1/3">
                          <div className='flex items-center text-xs border px-2 py-1 rounded-xl cursor-pointer'>
                            <span className="text-xs font-light">
                              Edit
                            </span>
                            <PencilSimpleLine size={12} weight="thin" className='ml-2' />
                          </div>
                          <div className='flex items-center text-xs border px-2 py-1 rounded-xl cursor-pointer'>
                            <span className="text-xs font-light">
                              Delete
                            </span>
                            <Trash size={12} weight="thin" className='ml-2' />
                          </div>
                        </div>
                      </div>
                      <div className="flex grow justify-between items-start">
                        <div className="basis-1/3">
                          <p className="text-xs font-light text-gray-500">
                            Street
                          </p>
                          <span className="text-sm">{address.street}</span>
                        </div>

                      </div>
                      <div className="flex grow justify-between items-start">
                        <div className="basis-1/3">
                          <p className="text-xs font-light text-gray-500">
                            City
                          </p>
                          <span className="text-sm">{address.city}</span>
                        </div>
                        <div className="basis-1/3">
                          <p className="text-xs font-light text-gray-500">
                            State
                          </p>
                          <span className="text-sm">{address.state}</span>
                        </div>
                        <div className=""></div>
                      </div>
                      <div className="flex grow justify-between items-start">
                        <div className="basis-1/3">
                          <p className="text-xs font-light text-gray-500">
                            Country
                          </p>
                          <span className="text-sm">{address.country}</span>
                        </div>
                        <div className="basis-1/3">
                          <p className="text-xs font-light text-gray-500">
                            Postal Code
                          </p>
                          <span className="text-sm">{address.postal}</span>
                        </div>
                        <div className=""></div>
                      </div>
                    </div>
                    {/* End of single address Container */}
                  </AccordionContent>
                </AccordionItem>
              )
            }

          </Accordion>
        </div>
      </div>
    </div>
  );
}
