'use client';
import CheckoutSteps from '@/components/layout/CheckoutSteps';
import {Button} from '@/components/ui/button';
import useCartStore from '@/lib/store';
import {useRouter} from 'next/navigation';
import React from 'react';
import {useForm} from 'react-hook-form';

import * as z from 'zod';
import {DeliveryAddressSchema} from '@/schemas';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';

const DeliveryAddressForm = () => {
  const router = useRouter();
  const {saveDeliveryAddress, deliveryAddress} = useCartStore();

  const form = useForm<z.infer<typeof DeliveryAddressSchema>>({
    resolver: zodResolver(DeliveryAddressSchema),
    defaultValues: {
      fullname: deliveryAddress.fullName || '',
      street: deliveryAddress.street || '',
      house: deliveryAddress.house || '',
      city: deliveryAddress.city || '',
      state: deliveryAddress.state || '',
      postalCode: deliveryAddress.postalCode || '',
      country: deliveryAddress.country || ''
    }
  });

  const formSubmit = async (values: z.infer<typeof DeliveryAddressSchema>) => {
    saveDeliveryAddress({
      house: values.house,
      street: values.street,
      city: values.city,
      state: values.state,
      postalCode: values.postalCode,
      country: values.country,
      fullName: values.fullname,
    });
    router.push('/payment');
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 sm:p-6 md:p-8 lg:p-10">
      <CheckoutSteps current={1} />
      <div className="flex flex-col items-center justify-center gap-4 w-full lg:max-w-4xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(formSubmit)} className='w-full flex flex-col gap-4'>
            <FormField control={form.control} name='fullname' render={({field}) => {
              return <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input className='bg-input' {...field} placeholder='Jane Doe' type='text' />
                </FormControl>
                <FormMessage />
              </FormItem>;
            }} />
            <FormField control={form.control} name='house' render={({field}) => {
              return <FormItem>
                <FormLabel>House Address</FormLabel>
                <FormControl>
                  <Input className='bg-input' {...field} placeholder='Floor 1, Apt 2...' type='text' />
                </FormControl>
                <FormMessage />
              </FormItem>;
            }} />
            <FormField control={form.control} name='street' render={({field}) => {
              return <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input className='bg-input' {...field} placeholder='Bode George Avenue..' type='text' />
                </FormControl>
                <FormMessage />
              </FormItem>;
            }} />
            <FormField control={form.control} name='city' render={({field}) => {
              return <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input className='bg-input' {...field} placeholder='Ikeja' type='text' />
                </FormControl>
                <FormMessage />
              </FormItem>;
            }} />
            <div className="flex gap-2 w-full">
              <FormField control={form.control} name='state' render={({field}) => {
                return <FormItem className='basis-1/2'>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input className='bg-input' {...field} placeholder='Lagos' type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>;
              }} />
              <FormField control={form.control} name='country' render={({field}) => {
                return <FormItem className='basis-1/2'>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input className='bg-input' {...field} placeholder='Nigeria' type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>;
              }} />
            </div>
            <FormField control={form.control} name='postalCode' render={({field}) => {
              return <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input className='bg-input' {...field} placeholder='01234' type='text' />
                </FormControl>
                <FormMessage />
              </FormItem>;
            }} />
            <Button type='submit' className='w-full'>Next</Button>

          </form>
        </Form>
      </div>
    </div>
  );
};

export default DeliveryAddressForm;



