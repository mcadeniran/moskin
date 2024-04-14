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
import Image from 'next/image';

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
    <div className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center">
      {/* BOX */}
      <div className="bg-accent h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[80%] md:w-full lg:w-[70%] 2xl:w-2/3">
        {/* IMAGE CONTAINER */}
        <div className="relative h-1/3 w-full md:h-full md:w-1/2">
          <Image src="/model.avif" alt="" fill className="object-cover" />
        </div>
        {/* FORM CONTAINER */}
        <div className="p-8 flex flex-col gap-8 md:w-1/2">
          <h1 className="font-bold text-xl xl:text-3xl">Login</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full flex flex-col gap-4'>
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
              <div className="grid grid-cols-2 lg:flex items-center justify-end">
                {/* <div className=""></div> */}
                <div className="flex grow">
                  <p className="text-sm">
                    {"Don't"} have an account?
                    <Link className="underline text-red-500 italic" href="/register">
                      {" "}
                      Register
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
