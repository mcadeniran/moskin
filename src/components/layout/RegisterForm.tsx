'use client';

import * as z from 'zod';
import {useState, useTransition} from 'react';
import Link from 'next/link';
import {useForm} from 'react-hook-form';
import Image from 'next/image';
import {zodResolver} from '@hookform/resolvers/zod';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {RegisterFormSchema} from '@/schemas';
import {FormError} from '../FormError';
import {FormSuccess} from '../FormSuccess';
import {register} from '@/actions/register';



export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
    }
  });

  const onSubmit = (values: z.infer<typeof RegisterFormSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };



  return (
    <div className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-167px)] flex items-center justify-center">
      {/* BOX */}
      <div className="bg-accent h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[80%] md:w-full lg:w-[70%] 2xl:w-2/3">
        {/* IMAGE CONTAINER */}
        <div className="relative h-1/3 w-full md:h-full md:w-1/2">
          <Image src="/model.avif" alt="" fill className="object-cover" />
        </div>
        {/* FORM CONTAINER */}
        <div className="p-10 flex flex-col gap-8 md:w-1/2">
          <h1 className="font-extrabold text-xl text-center xl:text-4xl">Register</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col gap-4'>
              <FormField control={form.control} name='email' render={({field}) => {
                return <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input className='bg-input' {...field} placeholder='Email address' type='email' disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>;
              }} />
              <FormField control={form.control} name='username' render={({field}) => {
                return <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input className='bg-input' {...field} placeholder='Username' type='text' disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>;
              }} />
              <FormField control={form.control} name='password' render={({field}) => {
                return <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input className='bg-input' {...field} placeholder='Password' type='password' disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>;
              }} />
              <FormField control={form.control} name='passwordConfirm' render={({field}) => {
                return <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input className='bg-input' {...field} placeholder='Confirm Password' type='password' disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>;
              }} />
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button type='submit' className='w-full' disabled={isPending}>Create an account</Button>
              <div className="grid grid-cols-2 lg:flex items-center justify-end">
                {/* <div className=""></div> */}
                <div className="flex grow justify-center items-center">
                  <p className="text-sm">
                    <Link className="italic" href="/login">
                      Already have an account?
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
