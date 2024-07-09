'use client';
import * as z from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormError} from '@/components/FormError';
import {Button} from '@/components/ui/button';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {FormField, FormItem, FormLabel, FormControl, FormMessage, Form} from '@/components/ui/form';
import {useRouter} from 'next/navigation';
import React, {useState} from 'react';
import {Textarea} from '@/components/ui/textarea';
import {toast} from 'sonner';

const formSchema = z.object({
  reply: z.string().min(1, {message: 'Response is required'}).min(4, {message: 'Response should be at least 4 characters'}),
});

export default function Reply({id, author, details, reply, productName, rating, replied}: {id: string, author: string, details: string, reply: string, productName: string, rating: number, replied: string;}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reply: reply,
    }
  });


  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const router = useRouter();


  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setError('');
    setPending(true);
    const data = {...values, id};
    const result = await fetch('/api/admin/reviews', {
      method: 'PATCH',
      body: JSON.stringify(data)
    });

    if (result.ok) {
      const res = await result.json();
      toast.success(res.message);
      form.setValue('reply', '');
      router.refresh();
      setPending(false);
      setOpen(false);
    } else {
      const res = await result.json();
      setError(res.message);
      setPending(false);
    }
  };



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' className='text-success'>{replied === 'false' ? 'Reply' : 'Edit'}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className='mb-4'>
            {replied === 'false' ? 'Add Reply' : 'Edit Reply'}
          </DialogTitle>
          <DialogDescription className='flex flex-col gap-2'>
            <span className='font-semibold text-black text-base'>By: <span className="font-medium text-gray-700 text-sm">{author}</span></span>
            <span className='font-semibold text-black text-base'>Product: <span className="font-medium text-gray-700 text-sm">{productName}</span></span>
            <span className='font-semibold text-black text-base'>Review: <span className="font-medium text-gray-700 text-sm">{details}</span></span>
            <span className='font-semibold text-black text-base'>Rating: <span className="font-medium text-gray-700 text-sm">{rating}/5</span></span>
          </DialogDescription>
        </DialogHeader>
        <div className='flex w-full rounded-xl gap-4'>

          <Form  {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className=' w-full flex flex-col gap-4'>
              <FormField control={form.control} name='reply' render={({field}) => {
                return <FormItem className='w-full'>
                  <FormLabel>Your Response</FormLabel>
                  <FormControl>
                    <Textarea className='' {...field} placeholder='Enter the response here...' disabled={pending} />
                    {/* <Input className='bg-input' {...field} placeholder='Category name' type='text' disabled={pending} /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>;
              }} />
              <FormError message={error} />
              <div className="flex justify-end">
                <Button className=' w-min bg-slate-700' disabled={pending}>{replied === 'false' ? 'Submit' : 'Update'}</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
