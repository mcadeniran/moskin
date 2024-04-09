import {Badge} from '@/components/ui/badge';
import Image from 'next/image';
import React from 'react';

const transactions = [
  {
    id: 1,
    name: 'Brooke Hamilton',
    avatar: 'https://images.unsplash.com/photo-1611432579402-7037e3e2c1e4?q=80&w=3330&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: 'Pending',
    date: '09.04.2024',
    amount: 49500,
  },
  {
    id: 2,
    name: 'Rebecca Savage',
    avatar: 'https://images.unsplash.com/photo-1507152832244-10d45c7eda57?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: 'Pending',
    date: '06.04.2024',
    amount: 86000,
  },
  {
    id: 3,
    name: 'Tilly Thomas',
    avatar: 'https://images.unsplash.com/photo-1523825036634-aab3cce05919?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: 'Completed',
    date: '05.04.2024',
    amount: 59000,
  },
  {
    id: 4,
    name: 'Ruby Wilson',
    avatar: 'https://images.unsplash.com/photo-1508002366005-75a695ee2d17?q=80&w=3368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: 'Completed',
    date: '01.04.2024',
    amount: 128360,
  },
  {
    id: 5,
    name: 'Hollie Clements',
    avatar: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: 'Cancelled',
    date: '01.04.2024',
    amount: 29750,
  },
];

export default function TransactionWidget() {
  return (
    <div className='mt-8 p-5 border rounded-xl'>
      <h2 className='text-xl font-extralight text-gray-700'>Latest Transactions</h2>
      <table className="w-full">
        <thead>
          <tr>
            <td className='p-2'>Name</td>
            <td className='p-2'>Status</td>
            <td className='p-2'>Date</td>
            <td className='p-2'>Amount</td>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id}>
              <td className='p-2'>
                <div className="flex gap-2 items-center">
                  <Image
                    src={t.avatar}
                    alt='avatar'
                    width={40}
                    height={40}
                    className='rounded-full h-10 w-10 object-cover'
                  />
                  {t.name}

                </div>
              </td>
              <td className='p-2'>
                <Badge className='px-4 py-2' variant={t.status === 'Completed' ? 'default' : t.status === 'Pending' ? 'outline' : 'destructive'} >{t.status}</Badge>
              </td>
              <td className='p-2'>{t.date}</td>
              <td className='p-2'>₦{t.amount.toLocaleString()}</td>
            </tr>

          ))}
        </tbody>
      </table>
    </div>
  );
}
