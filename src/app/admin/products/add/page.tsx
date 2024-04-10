'use client';
import * as z from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Checkbox} from '@/components/ui/checkbox';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import ImageDropZone from '@/components/layout/AdminComponents/ImageDropZone';

const formSchema = z.object({
  name: z.string().min(3),
  category: z.string(),
  price: z.string(),
  description: z.string(),
  features: z.string(),
  ingredients: z.string(),
  sale: z.boolean(),
  off: z.string(),
});
export default function AddProductPage() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category: '',
      price: '',
      description: '',
      features: '',
      ingredients: '',
      sale: false,
      off: ''
    }
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({values});
  };
  return (
    <div className='flex w-full  bg-accent p-4 rounded-xl gap-4'>
      <div className=" basis-1/4">
        <ImageDropZone />
      </div>
      <div className="basis-3/4">
        <Form  {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className=' w-full flex flex-col gap-4'>
            <div className="flex gap-4">
              <FormField control={form.control} name='name' render={({field}) => {
                return <FormItem className='w-1/2'>
                  <FormLabel>Product name</FormLabel>
                  <FormControl>
                    <Input className='bg-input' {...field} placeholder='Product name' type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>;
              }} />
              <FormField control={form.control} name='category' render={({field}) => {
                return <FormItem className='w-1/2'>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='bg-input'>
                        <SelectValue className='bg-input' placeholder='Select category' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='bg-input'>
                      <SelectItem value='Facial products'>Facial products</SelectItem>
                      <SelectItem value='Stretch mark products'>Stretch mark products</SelectItem>
                      <SelectItem value='Black Soap'>Black Soap</SelectItem>
                      <SelectItem value='Liquid Soap'>Liquid Soap</SelectItem>
                      <SelectItem value='Scrub'>Scrub</SelectItem>
                      <SelectItem value='Body cream/body butter'>Body cream/body butter</SelectItem>
                      <SelectItem value='Body milk'>Body milk</SelectItem>
                      <SelectItem value='Serum/oil'>Serum/oil</SelectItem>
                      <SelectItem value='Lip care'>Lip care</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>;
              }} />
            </div>
            <div className="flex gap-4 items-start">
              <FormField control={form.control} name='price' render={({field}) => {
                return <FormItem className='grow'>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input className='bg-input' {...field} placeholder='Price' type='number' />
                  </FormControl>
                  <FormMessage />
                </FormItem>;
              }} />
              <div className="flex flex-col-reverse gap-4 grow">
                <FormField control={form.control} name='sale' render={({field}) => {
                  return <FormItem className='grow'>
                    <FormControl>
                      <Checkbox className='bg-input' id='sale' checked={field.value}
                        onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>{' '}On sale?</FormLabel>
                    <FormMessage />
                  </FormItem>;
                }} />
                <FormField control={form.control} name='off' render={({field}) => {
                  return <FormItem className='grow'>
                    <FormLabel>Percentage off</FormLabel>
                    <FormControl>
                      <Input className='bg-input' {...field} placeholder='Percentage off' type='number' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>;
                }} />
              </div>
            </div>
            <FormField control={form.control} name='description' render={({field}) => {
              return <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea className='bg-input' placeholder='Enter description' {...field} />
                </FormControl>
              </FormItem>;
            }} />
            <FormField control={form.control} name='features' render={({field}) => {
              return <FormItem>
                <FormLabel>Features</FormLabel>
                <FormControl>
                  <Textarea className='bg-input' placeholder='Enter features' {...field} />
                </FormControl>
              </FormItem>;
            }} />
            <FormField control={form.control} name='ingredients' render={({field}) => {
              return <FormItem>
                <FormLabel>Active ingredients</FormLabel>
                <FormControl>
                  <Textarea className='bg-input' placeholder='Enter active ingredients' {...field} />
                </FormControl>
              </FormItem>;
            }} />
            <Button type='submit' className=' w-min px-8 py-3'>Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
