'use client';


import {PencilSimpleLine, X} from '@phosphor-icons/react/dist/ssr';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';

import * as z from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from 'sonner';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import PersonalDetailsLoadingComponent from './PersonalDetailsLoadingComponent';
import {User} from '@prisma/client';

const formSchema = z.object({
  fname: z.string(),
  lname: z.string(),
  phone: z.string()
});

const fetchUserPersonal = (): Promise<User> => fetch('/api/user').then(res => res.json());


export default function PersonalDetailsComponent() {

  const [isDisabled, setIsDisabled] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fname: '',
      lname: '',
      phone: '',
    }
  });

  const {isLoading, error, data} = useQuery({
    queryKey: ['personal'],
    queryFn: fetchUserPersonal
  });

  useEffect(() => {
    form.reset({
      fname: data?.fname,
      lname: data?.lname,
      phone: data?.phone
    }, {keepDirtyValues: true});

  }, [data, form]);



  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return fetch('/api/user', {
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(data),
        method: 'PATCH'
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ['personal']});
      toast.success("Personal details updated.");
    },
    onError() {
      toast.error("An error occured.");
    }
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const data = {...values, type: 'personal'};
    mutation.mutate(data);
    setIsDisabled(prev => !prev);
  };


  if (isLoading) return <PersonalDetailsLoadingComponent />;

  if (error) return <p className="">{error.message}</p>;

  // if (isSuccess) {
  //   form.setValue('fname', data.fname, {shouldTouch: false});
  //   form.setValue('lname', data.lname, {shouldTouch: false});
  //   form.setValue('phone', data.phone, {shouldTouch: false});
  // }




  return (
    <div className="flex flex-col grow p-4 gap-4 rounded-lg  bg-accent shadow-sm">
      <div className="flex flex-col gap-0">
        <div className="flex">
          <div className="flex grow">
            Personal Information
          </div>
          <div
            className='flex items-center text-xs border px-2 py-1 rounded-xl cursor-pointer'
            onClick={() => setIsDisabled(prev => !prev)}>
            {isDisabled ? <>
              <span className="text-xs font-light">
                Edit
              </span>
              <PencilSimpleLine size={12} weight="thin" className='ml-1' />
            </> : <>
              <span className="text-xs font-light">
                Cancel
              </span>
              <X size={12} weight="thin" className='ml-1' />
            </>}
          </div>
        </div>
        <span className="text-xs   text-gray-500 italic font-light">This will not be visible to the public</span>
      </div>
      {/* Name Container */}
      <div className="flex grow justify-between items-start">
        <Form  {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className=' w-full flex flex-col gap-4'>
            <div className="flex gap-4">
              <div className="basis-1/3">
                <FormField control={form.control} name='fname' render={({field}) => {
                  return <FormItem className='w-full space-y-0'>
                    <FormLabel className='mb-0 p-0  font-light text-gray-500 text-xs'>First Name</FormLabel>
                    <FormControl>
                      <Input
                        className='mt-0 h-4  bg-transparent border-0 border-accent p-0 focus-visible:ring-offset-0 focus-visible:ring-0 disabled:opacity-70'
                        {...field}
                        placeholder='First name'
                        type='text'
                        disabled={isDisabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>;
                }} />
              </div>
              <div className="basis-1/3">
                <FormField control={form.control} name='lname' render={({field}) => {
                  return <FormItem className='w-full space-y-0'>
                    <FormLabel className='mb-0 p-0  font-light text-gray-500 text-xs'>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        className='h-4 bg-transparent border-0 border-accent p-0 focus-visible:ring-offset-0 focus-visible:ring-0 disabled:opacity-70'
                        {...field}
                        placeholder='Last name'
                        type='text'
                        disabled={isDisabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>;
                }} />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="basis-1/3">
                <FormField control={form.control} name='phone' render={({field}) => {
                  return <FormItem className='w-full space-y-0'>
                    <FormLabel className='mb-0 p-0  font-light text-gray-500 text-xs'>Phone</FormLabel>
                    <FormControl>
                      <Input
                        className='h-4 bg-transparent border-0 border-accent p-0 focus-visible:ring-offset-0 focus-visible:ring-0 disabled:opacity-70'
                        {...field}
                        placeholder='+2348034567890'
                        type='text'
                        disabled={isDisabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>;
                }} />
              </div>
            </div>
            {
              !isDisabled &&
              <div className="flex justify-start">
                <Button className=' w-min'>Update</Button>
              </div>
            }
          </form>
        </Form>
        <div className=""></div>
      </div>
    </div>
  );
}
