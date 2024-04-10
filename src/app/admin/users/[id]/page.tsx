'use client';
import Image from 'next/image';
import * as z from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Checkbox} from '@/components/ui/checkbox';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  address: z.string(),
  isAdmin: z.string(),
  isActive: z.string(),
});

export default function SingleUserPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      country: '',
      address: '',
      isAdmin: '',
      isActive: ''
    }
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({values});
  };
  return (
    <div className='flex gap-8'>
      <div className=" basis-1/4 bg-muted h-min rounded-lg p-4">
        <div className="relative h-[300px] w-full rounded-lg mb-5 overflow-hidden">
          <Image src='/avatar2 copy.jpg' alt='avatar' objectFit='cover' fill />
        </div>
        <span className="text-xl text-foreground font-medium">Jane Doe</span>
      </div>
      <div className=" basis-3/4 bg-muted rounded-lg p-4">
        <Form  {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className=' w-full flex flex-col gap-4'>

            <FormField control={form.control} name='name' render={({field}) => {
              return <FormItem className=''>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input className='bg-input' {...field} placeholder='Name' type='text' />
                </FormControl>
                <FormMessage />
              </FormItem>;
            }} />
            <FormField control={form.control} name='email' render={({field}) => {
              return <FormItem className=''>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className='bg-input' {...field} placeholder='Email' type='email' />
                </FormControl>
                <FormMessage />
              </FormItem>;
            }} />
            <FormField control={form.control} name='phone' render={({field}) => {
              return <FormItem className=''>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input className='bg-input' {...field} placeholder='+2348031234567890' type='text' />
                </FormControl>
                <FormMessage />
              </FormItem>;
            }} />
            <FormField control={form.control} name='address' render={({field}) => {
              return <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea className='bg-input' placeholder='Enter address' {...field} />
                </FormControl>
              </FormItem>;
            }} />
            <div className="flex gap-4">
              <FormField control={form.control} name='city' render={({field}) => {
                return <FormItem className='w-1/2'>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input className='bg-input' {...field} placeholder='City' type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>;
              }} />
              <FormField control={form.control} name='state' render={({field}) => {
                return <FormItem className='w-1/2'>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input className='bg-input' {...field} placeholder='State' type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>;
              }} />
            </div>

            <FormField control={form.control} name='country' render={({field}) => {
              return <FormItem className=''>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input className='bg-input' {...field} placeholder='Country' type='text' />
                </FormControl>
                <FormMessage />
              </FormItem>;
            }} />
            <div className="flex gap-4">
              <FormField control={form.control} name='isAdmin' render={({field}) => {
                return <FormItem className='w-1/2'>
                  <FormLabel>Is Admin?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='bg-input'>
                        <SelectValue className='bg-input' placeholder='Select role' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='bg-input'>
                      <SelectItem value='false'>False</SelectItem>
                      <SelectItem value='true'>True</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>;
              }} />
              <FormField control={form.control} name='isActive' render={({field}) => {
                return <FormItem className='w-1/2'>
                  <FormLabel>Is active?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='bg-input'>
                        <SelectValue className='bg-input' placeholder='Select status' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='bg-input'>
                      <SelectItem value='Inactive'>Inactive</SelectItem>
                      <SelectItem value='Active'>Active</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>;
              }} />
            </div>
            <Button type='submit' className='w-min px-12 py-6'>Update</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
