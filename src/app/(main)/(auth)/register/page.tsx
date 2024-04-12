'use client';
import * as z from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';

const formSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  username: z.string().min(1, 'Username is required').min(2, 'Username should have at least 2 characters'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must have at least 8 characters'),
  passwordConfirm: z.string(),
}).refine((data) => {
  return data.password === data.passwordConfirm;
}, {
  message: 'Passwords do not match',
  path: ['passwordConfirm']
});

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
    }
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log({values});
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: values.email,
        username: values.username,
        password: values.password
      })
    });

    if (response.ok) {
      router.push('/login');
    } else {
      toast.error('Registration failed.');
      console.log(response);
    }
  };

  return (
    <main className='flex h-[calc(100vh-128px)] w-full items-center justify-center'>
      <div className="flex flex-col justify-center bg-accent p-10 rounded-xl items-center">
        <Form {...form}>
          <h3 className='mb-8 text-2xl font-semibold'>Register</h3>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='max-w-md w-full flex flex-col gap-4'>
            <FormField control={form.control} name='email' render={({field}) => {
              return <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input className='bg-input' {...field} placeholder='Email address' type='email' />
                </FormControl>
                <FormMessage />
              </FormItem>;
            }} />
            <FormField control={form.control} name='username' render={({field}) => {
              return <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input className='bg-input' {...field} placeholder='Username' type='text' />
                </FormControl>
                <FormMessage />
              </FormItem>;
            }} />
            <FormField control={form.control} name='password' render={({field}) => {
              return <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input className='bg-input' {...field} placeholder='Password' type='password' />
                </FormControl>
                <FormMessage />
              </FormItem>;
            }} />
            <FormField control={form.control} name='passwordConfirm' render={({field}) => {
              return <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input className='bg-input' {...field} placeholder='Confirm Password' type='password' />
                </FormControl>
                <FormMessage />
              </FormItem>;
            }} />
            <Button type='submit' className='w-full'>Register</Button>
          </form>
          <div className="grid grid-cols-2 mt-6 justify-between">
            <div className='grow'></div>
            <p className=''>
              Already have an account?{' '}
              <Link href={'/login'} className=' text-red-500 italic'>Sign in</Link> </p>
          </div>
        </Form>
      </div>
    </main>
  );
}
