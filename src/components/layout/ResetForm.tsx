'use client';

import * as z from 'zod';
import {useState, useTransition} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import {FormError} from '../FormError';
import {FormSuccess} from '../FormSuccess';
import {reset} from '@/actions/reset';
import {ResetSchema} from '@/schemas';



export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      emailAddress: '',
    }
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        // TODO
        // Send Verification Code
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
        <div className="p-8 flex flex-col gap-8 md:w-1/2">
          <h1 className="font-extrabold text-xl text-center xl:text-4xl">Reset Password</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col between gap-4'>
              <FormField control={form.control} name='emailAddress' render={({field}) => {
                return <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input className='bg-input' {...field} placeholder='Email address' type='email' disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>;
              }} />
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button type='submit' disabled={isPending} className='mt-4 w-full'>Send reset email</Button>
              <div className="grid grid-cols-2 lg:flex items-center justify-end">
                {/* <div className=""></div> */}
                <div className="flex grow items-center justify-center">
                  <p className="text-sm">
                    <Link className="italic" href="/login">
                      Back to Login
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
