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
import {Switch} from '@/components/ui/switch';
import {useState, useTransition} from 'react';
import {useRouter} from 'next/navigation';
import {Category, Product} from '@prisma/client';
import {ProductFormSchema} from '@/schemas';
import {Loader} from './loader';
import {FormError} from '@/components/FormError';
import {FormSuccess} from '@/components/FormSuccess';
import {updateProduct} from '@/actions/update-product';

const EditProductForm = ({product, categories, id}: {product: Product; categories: Category[]; id: string;}) => {
  const router = useRouter();
  // TODO Reroute back to products

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      name: product.name,
      category: product.categoryId || '',
      price: product.price,
      description: product.description,
      features: product.features,
      ingredients: product.ingredients,
      sale: product.onSale,
      off: product.off || 0,
      images: product.images,
      display: product.display,
    }
  });

  const handleSubmit = (values: z.infer<typeof ProductFormSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      updateProduct(values, id)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
            // form.reset();
          }
        }).catch(() => setError('Something went wrong!'));
    });
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
                    <Input className='bg-input' {...field} placeholder='Product name' type='text' disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>;
              }} />
              <FormField control={form.control} name='category' render={({field}) => {
                return <FormItem className='w-1/2'>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending} >
                    <FormControl>
                      <SelectTrigger className='bg-input'>
                        <SelectValue className='bg-input' placeholder='Select category' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='bg-input'>
                      {categories.map(c => (
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
                    <Input className='bg-input' {...field} placeholder='Price' type='number' disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>;
              }} />
              <div className="flex flex-col-reverse gap-4 grow">
                <FormField control={form.control} name='sale' render={({field}) => {
                  return <FormItem className='grow'>
                    <FormControl>
                      <Checkbox className='bg-input' id='sale' checked={field.value}
                        onCheckedChange={field.onChange} disabled={isPending} />
                    </FormControl>
                    <FormLabel>{' '}On sale?</FormLabel>
                    <FormMessage />
                  </FormItem>;
                }} />
                <FormField control={form.control} name='off' render={({field}) => {
                  return <FormItem className='grow'>
                    <FormLabel>Percentage off</FormLabel>
                    <FormControl>
                      <Input className='bg-input' {...field} placeholder='Percentage off' type='number' disabled={isPending} />
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
                  <Textarea className='bg-input' placeholder='Enter description' {...field} disabled={isPending} />
                </FormControl>
              </FormItem>;
            }} />
            <FormField control={form.control} name='features' render={({field}) => {
              return <FormItem>
                <FormLabel>Features</FormLabel>
                <FormControl>
                  <Textarea className='bg-input' rows={7} placeholder='Enter features' {...field} disabled={isPending} />
                </FormControl>
              </FormItem>;
            }} />
            <FormField control={form.control} name='ingredients' render={({field}) => {
              return <FormItem>
                <FormLabel>Active ingredients</FormLabel>
                <FormControl>
                  <Textarea className='bg-input' placeholder='Enter active ingredients' {...field} disabled={isPending} />
                </FormControl>
              </FormItem>;
            }} />
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button type='submit' className=' w-min px-8 py-3' disabled={isPending} >
                  {isPending ? <Loader /> : 'Upadate Product'}
                </Button>
                <FormSuccess message={success} />
                <FormError message={error} />

              </div>
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
                          disabled={isPending}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default EditProductForm;