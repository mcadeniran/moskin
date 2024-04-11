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
import {toast} from 'sonner';
import {Switch} from '@/components/ui/switch';
import {useEffect, useState} from 'react';

const formSchema = z.object({
  name: z.string().min(3, {
    message: 'Product name must be at least 3 characters.'
  }),
  category: z.string().min(1, {
    message: 'Category is required.'
  }),
  price: z.coerce.number({invalid_type_error: 'Price must be a number'})
    .positive({message: 'Price must be positive'})
    .finite({message: 'Must be a valid price'}),
  description: z.string().min(1, {message: 'Description is required'}),
  features: z.string(),
  ingredients: z.string().min(1, {message: 'Active ingredients are required'}),
  sale: z.boolean(),
  off: z.coerce.number(),
  images: z.array(z.string()),
  display: z.boolean(),
});
export default function AddProductPage() {
  const [cats, setCats] = useState<Category[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category: '',
      price: 0,
      description: '',
      features: '',
      ingredients: '',
      sale: false,
      off: 0,
      images: [],
      display: true,
    }
  });



  useEffect(() => {
    fetch('/api/category').then((response) => {
      response.json().then((c) => {
        setCats(c);
      });
    }
    );
  }, []);


  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = {...values};
    // console.log(data);
    const result = await fetch('/api/product', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (result.ok) {
      toast.success('Product created successfully.');
    } else {
      toast.error('Failed to create product.');
    }

    console.log('Result: ' + result.body);
  };

  const handleFileAdd = async (filesToUpload: string[]) => {
    const newImages = [...form.getValues('images'), ...filesToUpload];
    form.setValue('images', newImages);
    // console.log(...form.getValues('images'));
  };

  const handleFileDelete = async (url: string) => {
    const updatedImages = form.getValues('images').filter(image => image !== url);
    form.setValue('images', updatedImages);
    // await handleSubmit(form.getValues());
  };

  return (
    <div className='flex w-full  bg-accent p-4 rounded-xl gap-4'>
      <div className=" basis-1/4">
        <ImageDropZone
          photos={form.getValues('images')}
          onFileDelete={handleFileDelete}
          onFilesAdded={handleFileAdd}
        />
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
                      {cats.length > 0 && cats.map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
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
            <div className="flex justify-between">
              <Button type='submit' className=' w-min px-8 py-3'>Submit Product</Button>
              <div className="">
                <FormField
                  control={form.control}
                  name="display"
                  render={({field}) => (
                    <FormItem className='flex items-center justify-between font-bold'>
                      <FormLabel
                        className={`${field.value ? 'text-green-500' : 'text-red-500'} mr-4 `}
                      >
                        {field.value ? 'Visible in shop' : 'Not visible in shop'}
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className='bg-input'
                        />
                      </FormControl>
                    </FormItem>
                  )} />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
