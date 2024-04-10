'use client';
import * as z from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import React from 'react';
import {toast} from 'sonner';
import {Button} from '@/components/ui/button';

const formSchema = z.object({
  name: z.string().min(3),
});

export default function CreateCategory() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    }
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = {...values};
    const result = await fetch('/api/category', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (result.ok) {
      toast.success('Category created successfully.');
    } else {
      toast.error('Failed to create categfory.');
    }
  };

  return (
    <div className='flex w-full  bg-accent p-4 rounded-xl gap-4'>
      <Form  {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className=' w-full flex flex-col gap-4'>
          <FormField control={form.control} name='name' render={({field}) => {
            return <FormItem className='w-full'>
              <FormLabel>Category name</FormLabel>
              <FormControl>
                <Input className='bg-input' {...field} placeholder='Category name' type='text' />
              </FormControl>
              <FormMessage />
            </FormItem>;
          }} />
          <div className="flex justify-end">
            <Button className=' w-min'>Create Category</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
