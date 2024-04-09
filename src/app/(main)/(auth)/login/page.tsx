'use client';
import * as z from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

const formSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string().min(6),
  passwordConfirm: z.string(),
}).refine((data) => {
  return data.password === data.passwordConfirm;
}, {
  message: 'Passwords do not match',
  path: ['passwordConfirm']
});

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: '',
      password: '',
      passwordConfirm: '',
    }
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({values});
  };

  return (
    <main className='flex h-[calc(100vh-128px)] flex-col items-center  p-24'>
      <Form {...form}>
        <h3 className='mb-8 text-2xl font-semibold'>Register</h3>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='max-w-md w-full flex flex-col gap-4'>
          <FormField control={form.control} name='emailAddress' render={({field}) => {
            return <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Email address' type='email' />
              </FormControl>
              <FormMessage />
            </FormItem>;
          }} />

          <FormField control={form.control} name='password' render={({field}) => {
            return <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Password' type='password' />
              </FormControl>
              <FormMessage />
            </FormItem>;
          }} />

          <FormField control={form.control} name='passwordConfirm' render={({field}) => {
            return <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Confirm Password' type='password' />
              </FormControl>
              <FormMessage />
            </FormItem>;
          }} />
          <Button type='submit' className='w-full'>Submit</Button>
        </form>
        <div className="grid grid-cols-2 mt-6 justify-between">
          <div className='grow'></div>
          <p className=''>
            Already have an account?{' '}
            <Link href={'/login'} className=' text-red-500 italic'>Sign in</Link> </p>

        </div>
      </Form>
    </main>
  );
}
