'use client';

import {Category, Product, Review, User} from '@prisma/client';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import Image from 'next/image';
import {useState} from 'react';
import ProductLoading from './ProductLoading';
import PriceComponent from '../_components/PriceComponent';
import DetailsCompenent from '../_components/DetailsCompenent';
import {AspectRatio} from '@/components/ui/aspect-ratio';
import {Button} from '@/components/ui/button';
import TitleComponenet from '@/components/layout/MainComponents/TitleComponenet';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import {AvatarImage} from '@radix-ui/react-avatar';
import {Textarea} from '@/components/ui/textarea';
import {toast} from 'sonner';
import {useForm} from 'react-hook-form';
import {Form, FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {ReviewSchema} from '@/schemas';
import DateConverter from '@/components/date';

export default function ProdutPage({params}: any) {
  const pid = params.id;
  const [activeImage, setActiveImage] = useState<number>(0);

  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      details: '',
    }
  });

  const {isLoading, error, data} = useQuery({
    queryKey: ['product'],
    queryFn: () =>
      fetch('/api/product/' + pid).then(res => res.json())
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return fetch('/api/review', {
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(data),
        method: 'POST'
      });
    },
    async onSuccess(data) {
      queryClient.invalidateQueries({queryKey: ['product']});
      const res = await data.json();
      toast.success(res.message);
      setPending(false);
      form.reset();
    },
    onError(error) {
      const res = error.message;
      toast.error(res);
      setPending(false);
    }
  });

  const onReviewSubmit = (values: z.infer<typeof ReviewSchema>) => {
    setPending(true);
    const data = {details: values.details, productId: pid};
    mutation.mutate(data);
  };

  if (isLoading) return <ProductLoading />;

  if (error) return 'No product found!';

  if (!data) return <div className='mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8'>No Product found!</div>;
  const product: ({Category: Category;} & Product) = data.product;
  const canComment = data.canComment;
  const reviews: ({User: User;} & Review)[] = data.reviews;


  return (
    <div className='min-h-[calc(100vh-200px)] mx-auto max-w-2xl px-4 mb-8 sm:px-6  lg:max-w-7xl lg:px-8'>
      <div className="flex flex-col mt-4 lg:flex-row justify-between gap-6 lg:items-start">
        {/* LEFT -IMAGE SECTION */}
        <div className=" basis-1/2">
          <div className="relative w-full">
            <AspectRatio ratio={4 / 3} >
              <Image
                src={product.images[activeImage]}
                alt=''
                // sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                fill
                className=" object-cover "
              />
            </AspectRatio>
            <div className="flex flex-row gap-2 pt-2">
              {
                product.images.map((_, index: number) =>
                  <div className="relative w-[130px] h-[130px]" key={index}>
                    <Image src={product.images[index]}
                      width={130}
                      height={130}
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      alt=''
                      style={{
                        objectFit: 'cover',
                      }}
                      className='cursor-pointer'
                      key={index} onClick={() => setActiveImage(index)}
                    />
                  </div>
                )
              }
            </div>
          </div>
        </div>
        {/* RIGHT - CART & DETAILS SECTION */}
        <div className="flex flex-col items-start justify-start basis-1/2">
          <div className="">
            <h3 className="text-2xl font-medium text-gray-800">{product.name}</h3>
            <p className="text-xs text-gray-500">{product.Category.name}</p>
          </div>
          <PriceComponent data={product} />
          <DetailsCompenent data={product} />
        </div>
      </div>
      <div className="mt-4">
        <TitleComponenet title='Reviews' />
        {reviews.length === 0 && <p className="my-2 flex justify-center text-center text-xs italic font-light">No reviews yet!</p>}
        {canComment &&
          <>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onReviewSubmit)} className='my-4'>
                <FormField control={form.control} name='details' render={({field}) => {
                  return <FormItem>
                    <FormControl>
                      <Textarea {...field} placeholder='Enter review' disabled={pending || !canComment} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>;
                }} />
                <Button type='submit' size='sm' disabled={pending || !canComment} className='mt-4'>Submit Review</Button>
              </form>
            </Form>
          </>
        }
        <div className="flex flex-col gap-4 my-2">
          {reviews.map(review =>
            <div key={review.id} className='flex flex-col bg-slate-100/20 border border-slate-100/20 rounded-lg p-4'>
              <div className="flex gap-4 items-center">
                <Avatar className=''>
                  <AvatarImage src={review.User.image} className='object-contain' alt={review.User.username} />
                  <AvatarFallback className=' text'>{review.User.username.substring(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
                <p className="">{review.User.username}</p>
                <span className="text-sm text-gray-500"><DateConverter dateString={review.createdAt.toString()} /></span>
                <span className="text-xs text-gray-500">Edited: <DateConverter dateString={review.updatedAt.toString()} /></span>
              </div>
              <p className="ml-12 md:ml-16 text-sm text-gray-700 font-light">{review.details}</p>
            </div>
          )
          }
        </div>
      </div>
    </div>
  );
}
