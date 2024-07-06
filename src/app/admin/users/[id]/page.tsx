'use client';
import Image from 'next/image';
import femaleAvatar from '/public/female_avatar.png';
import {useQuery} from '@tanstack/react-query';
import {AspectRatio} from '@/components/ui/aspect-ratio';
import OrdersCalculator from './calculater';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Order} from '@prisma/client';
import DateConverter from '@/components/date';
import OrderStatusBadge from '@/components/OrderStatusBadge';
import RoleForm from './RoleForm';

export default function SingleUserPage({params}: any) {
  const pid = params.id;


  const {isLoading, error, data: user} = useQuery({
    queryKey: ['user'],
    queryFn: () =>
      fetch('/api/admin/users/' + pid).then(res => res.json())
  });

  if (isLoading) return <p>Loading user details</p>;

  if (error) return 'No user found!';

  if (!user) return <div className='mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8'>No user found!</div>;

  return (
    <div className='flex gap-4  min-h-[calc(100vh-12.6rem)]'>
      <div className=" basis-1/5 bg-muted h-min rounded-lg gap-4 p-4">
        <div className="relative  w-full rounded-lg overflow-hidden">
          <AspectRatio ratio={4 / 4} >
            <Image
              src={user.image !== '' ? user.image : femaleAvatar}
              alt=''
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              fill
              className=" object-cover rounded-lg"
            />
          </AspectRatio>
        </div>
        <span className="text-base font-bold">{user.username}</span>
        <p className="text-sm font-light">{user.email}</p>
        <RoleForm role={user.isAdmin.toString()} uid={user.id} />
      </div>
      <div className=" basis-4/5 bg-muted rounded-lg p-4">
        <OrdersCalculator orders={user.orders} />
        <Table className='mt-4'>
          <TableHeader>
            <TableRow>
              <TableHead className="">Invoice</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {user.orders.map((order: Order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  <div className="">
                    #{order.id.substring(-6, 6)}
                  </div>
                  <div className="text-xs text-gray-500">
                    <DateConverter dateString={order.createdAt.toString()} />
                  </div>
                </TableCell>
                <TableCell>{order.items.map((item: any) => (
                  <div className="" key={item.id}>{item.name} x {item.quantity}<br /></div>
                ))}</TableCell>
                <TableCell><OrderStatusBadge order={order} /></TableCell>
                <TableCell>{order.paymentMethod === 'OnlinePayment' ? 'Credit Card' : 'Bank Transfer'}</TableCell>
                <TableCell className="text-right">₦{order.totalPrice.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
