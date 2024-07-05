'use client';
import Image from 'next/image';
import femaleAvatar from '/public/female_avatar.png';
import * as z from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form';
import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {AspectRatio} from '@/components/ui/aspect-ratio';
import OrdersCalculator from './calculater';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Order} from '@prisma/client';
import DateConverter from '@/components/date';
import OrderStatusBadge from '@/components/OrderStatusBadge';
import {RoleFormSchema} from '@/schemas';
import {toast} from 'sonner';
import {useState} from 'react';
import {FormError} from '@/components/FormError';
import {FormSuccess} from '@/components/FormSuccess';
import RoleForm from './RoleForm';

export default function SingleUserPage({params}: any) {
  const pid = params.id;
  const [pending, setPending] = useState(false);
  const [roleValue, setRoleValue] = useState("false");

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const form = useForm<z.infer<typeof RoleFormSchema>>({
    resolver: zodResolver(RoleFormSchema),
  });


  const handleSubmit = async (values: z.infer<typeof RoleFormSchema>) => {
    setErrorMessage('');
    setSuccessMessage('');
    setPending(true);
    const data = {...values, id: pid};
    mutation.mutate(data);
  };


  const {isLoading, error, data: user} = useQuery({
    queryKey: ['user'],
    queryFn: () =>
      fetch('/api/admin/users/' + pid).then(res => res.json())
  });


  // useEffect(() => {
  //   console.log(roleValue);
  //   setRoleValue(user.isAdmin);
  // }, [user, roleValue]);



  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return fetch('/api/admin/users/' + pid, {
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(data),
        method: 'PATCH'
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ['user']});
      setSuccessMessage('Role updated');
      toast.success("Role updated.");
      setPending(false);
    },
    onError() {
      setErrorMessage('Unknown error');
      toast.error("An error occured.");
      setPending(false);
    }
  });


  // const changeRole = () => {
  //   console.log(roleValue);
  // };

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
        {/* <div className="">
          <Select onValueChange={(e) => setRoleValue(e)} value={roleValue}>
            <SelectTrigger className="w-full bg-input">
              <SelectValue className='bg-input' placeholder='Select Role' />
            </SelectTrigger>

            <SelectContent className='bg-input'>
              <SelectItem value="true">Admin</SelectItem>
              <SelectItem value="false">Client</SelectItem>
            </SelectContent>
          </Select>
          <Button className=' w-full px-8 py-3' onClick={changeRole} disabled={pending}>Update Role</Button>
        </div> */}
        <RoleForm role={user.isAdmin.toString()} uid={user.id} />
        {/* <Form  {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='my-2 w-full flex flex-col gap-2'>
            <FormField control={form.control} name='isAdmin' render={({field}) => {
              return <FormItem className='w-full'>
                <Select onValueChange={field.onChange} value={roleValue}>
                  <FormControl>
                    <SelectTrigger className="w-full bg-input">
                      <SelectValue className='bg-input' placeholder='Select Role' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='bg-input'>
                    <SelectItem value="true">Admin</SelectItem>
                    <SelectItem value="false">Client</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>;
            }} />
            <Button type='submit' className=' w-full px-8 py-3' disabled={pending}>Update Role</Button>
            <FormError message={errorMessage} />
            <FormSuccess message={successMessage} />
          </form>
        </Form> */}

        {/* <p className="">Role: <span className="">{user.isAdmin ? 'Admin' : 'Client'}</span></p> */}
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
