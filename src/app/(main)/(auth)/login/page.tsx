'use client';
import * as z from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';

const formSchema = z.object({
  emailAddress: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must have at least 8 characters'),
});

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: '',
      password: '',
    }
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log({values});
    const signInData = await signIn('credentials', {
      email: values.emailAddress,
      password: values.password,
      redirect: false
    });

    if (signInData?.error) {
      console.log(signInData.error);
      toast.error('Invalid email or password.');
    } else {
      router.push('/');
    }
    console.log(signInData);
  };

  return (
    <main className='flex h-[calc(100vh-128px)] w-full items-center justify-center'>
      <div className="flex flex-col justify-center bg-accent p-10 rounded-xl items-center">
        <Form {...form}>
          <h3 className='mb-8 text-2xl font-semibold'>Login</h3>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='max-w-md w-full flex flex-col gap-4'>
            <FormField control={form.control} name='emailAddress' render={({field}) => {
              return <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input className='bg-input' {...field} placeholder='Email address' type='email' />
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
            <Button type='submit' className='w-full'>Login</Button>
          </form>
          <div className="grid grid-cols-2 mt-6 justify-between">
            <div className='grow'></div>
            <p className=''>
              {"Don't"} have an account?{' '}
              <Link href={'/register'} className=' text-red-500 italic'>Register</Link> </p>
          </div>
        </Form>
      </div>
    </main>
  );
}
