import Pagination from '@/components/layout/AdminComponents/Pagination';
import SearchBar from '@/components/layout/AdminComponents/SearchBar';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const users = [
  {id: 1, avatar: 'https://images.unsplash.com/photo-1611432579402-7037e3e2c1e4?q=80&w=3330&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', name: "Robbi Le Port", email: "rle0@adobe.com", createdAt: "09-Feb-2024", status: 'Active', role: 'Client'},
  {id: 2, avatar: 'https://images.unsplash.com/photo-1507152832244-10d45c7eda57?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', name: "Sinclair Morefield", email: "smorefield1@whitehouse.gov", createdAt: "03-Apr-2024", status: 'Active', role: 'Client'},
  {id: 3, avatar: 'https://images.unsplash.com/photo-1523825036634-aab3cce05919?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', name: "Loralie Lineen", email: "llineen2@sciencedaily.com", createdAt: "18-Mar-2024", status: 'Active', role: 'Admin'},
  {id: 4, avatar: 'https://images.unsplash.com/photo-1508002366005-75a695ee2d17?q=80&w=3368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', name: "Ode Barrott", email: "obarrott3@nytimes.com", createdAt: "10-Mar-2024", status: 'Active', role: 'Client'},
  {id: 5, avatar: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', name: "Quincy Highman", email: "qhighman4@ox.ac.uk", createdAt: "19-Mar-2024", status: 'Active', role: 'Client'},
  {id: 6, avatar: 'https://images.unsplash.com/photo-1599529044570-6dc4ffa3661c?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', name: "Romy Erley", email: "rerley5@bbc.co.uk", createdAt: "23-Mar-2024", status: 'Active', role: 'Client'},
  {id: 7, avatar: 'https://images.unsplash.com/photo-1599529005318-04f3fee27f8d?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', name: "Annabela Younglove", email: "ayounglove6@sitemeter.com", createdAt: "19-Mar-2024", status: 'Active', role: 'Client'},
  {id: 8, avatar: 'https://images.unsplash.com/photo-1540257037661-80bafa07ffd9?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', name: "Loni Geale", email: "lgeale7@spiegel.de", createdAt: "30-Mar-2024", status: 'Active', role: 'Client'},
  {id: 9, avatar: 'https://images.unsplash.com/photo-1539702169544-c0bcff87fcd7?q=80&w=3415&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', name: "Glendon Bonwell", email: "gbonwell8@ning.com", createdAt: "03-Feb-2024", status: 'Inactive', role: 'Admin'},
  {id: 10, avatar: 'https://images.unsplash.com/photo-1495490140452-5a226aef25d4?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', name: "Lamar Farrear", email: "lfarrear9@technorati.com", createdAt: "26-Feb-2024", status: 'Inactive', role: 'Client'}
];


export default function UsersPage() {
  return (
    <div className=''>
      <div className="">
        <div className="flex justify-between items-center mb-8">
          <SearchBar placeholder='Search users' />
          <Link href={'/admin/users/add'} className='border rounded-xl bg-slate-800 text-white px-3 py-2'>Add New</Link>
        </div>
        <table className='w-full mb-5'>
          <thead>
            <td className='p-3'>Name</td>
            <td className='p-3'>Email</td>
            <td className='p-3'>Created At</td>
            <td className='p-3'>Role</td>
            <td className='p-3'>Status</td>
            <td className='p-3'>Action</td>
          </thead>
          <tbody>
            {
              users.map(user => (
                <tr key={user.id}>
                  <td className='p-3'>
                    <div className="flex gap-2 items-center">
                      <Image
                        src={user.avatar}
                        alt='avatar'
                        width={40}
                        height={40}
                        className='rounded-full h-10 w-10 object-cover'
                      />
                      {user.name}
                    </div>
                  </td>
                  <td className='p-3'>
                    {user.email}
                  </td>
                  <td className='p-3'>
                    {user.createdAt}
                  </td>
                  <td className='p-3'>
                    {user.role}
                  </td>
                  <td className='p-3'>{user.status}</td>
                  <td className='p-3'>
                    <div className="flex gap-3">
                      <Link href='' className='py-2 px-3 rounded-lg   bg-slate-800 text-white'>View</Link>
                      <Link href='' className='py-2 px-3 rounded-lg bg-red-500 text-white'>Delete</Link>
                    </div>
                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
        <Pagination />
      </div>
    </div>
  );
}
