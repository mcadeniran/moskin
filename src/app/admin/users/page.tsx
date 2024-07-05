'use client';
import Pagination from '@/components/layout/AdminComponents/Pagination';
import SearchBar from '@/components/layout/AdminComponents/SearchBar';
import Link from 'next/link';
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {User} from '@prisma/client';
import {useQuery} from '@tanstack/react-query';
import DateConverter from '@/components/date';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

const fetchAllUsers = (): Promise<User[]> => fetch('/api/admin/users').then(res => res.json());

export default function UsersPage() {
  const {isLoading, data: users, error} = useQuery({queryKey: ['allUsers'], queryFn: fetchAllUsers});

  if (isLoading) return <p className="">Loading users</p>;
  if (error) return <p className="">Unknown error occured</p>;

  return (
    <div className=' bg-accent p-4 rounded-xl'>
      <div className="">
        <div className="flex justify-between items-center mb-8">
          <SearchBar placeholder='Search users' />
          <Link href={'/admin/users/add'} className='border rounded-xl bg-slate-800 text-white px-3 py-2'>Add New</Link>
        </div>
        {
          users?.length === 0 ?
            <div>No users found</div>
            :
            <Table>
              <TableCaption>A list of users.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Date Registered</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users!.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex gap-2 items-center">
                        <Avatar>
                          <AvatarImage src={user.image} />
                          <AvatarFallback className=' uppercase bg-slate-500 text-white'>
                            {user.username.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        {user.username}
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <DateConverter dateString={user.createdAt.toString()} />
                    </TableCell>
                    <TableCell>{user.isAdmin === true ? 'Admin' : 'Client'}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/admin/users/${user.id}`} className='py-2 px-3 hover:underline '>View</Link>
                      <Link href='' className='py-2 pl-4 text-red-500 hover:underline'>Delete</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        }
        <Pagination />
      </div>
    </div>
  );
}
