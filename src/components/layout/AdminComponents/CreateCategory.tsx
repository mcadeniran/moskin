'use client';
import * as z from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import React, {useState} from 'react';
import {toast} from 'sonner';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {FormError} from '@/components/FormError';

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

  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [pending, setIsPending] = useState(false);

  const router = useRouter();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsPending(true);
    setError('');
    const data = {...values};
    const result = await fetch('/api/category', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (result.ok) {
      const res = await result.json();
      toast.success(res.message);
      form.setValue('name', '');
      setIsPending(false);
      setOpen(false);
      router.refresh();
    } else {
      const res = await result.json();
      setError(res.message);
      setIsPending(false);
      // toast.error('Failed to create category.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add new category
          </DialogTitle>
        </DialogHeader>
        <div className='flex w-full  bg-accent p-4 rounded-xl gap-4'>
          <Form  {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className=' w-full flex flex-col gap-4'>
              <FormField control={form.control} name='name' render={({field}) => {
                return <FormItem className='w-full'>
                  <FormLabel>Category name</FormLabel>
                  <FormControl>
                    <Input className='bg-input' {...field} placeholder='Category name' type='text' disabled={pending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>;
              }} />
              <FormError message={error} />
              <div className="flex justify-end">
                <Button className=' w-min' disabled={pending}>Create Category</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>

  );
}
