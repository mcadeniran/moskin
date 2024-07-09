'use client';

import {Category, Product, Review, User} from '@prisma/client';
import {useQuery} from '@tanstack/react-query';
import Image from 'next/image';
import {useState} from 'react';
import ProductLoading from './ProductLoading';
import PriceComponent from '../_components/PriceComponent';
import DetailsCompenent from '../_components/DetailsCompenent';
import {AspectRatio} from '@/components/ui/aspect-ratio';
import {ReviewsComponent} from './ReviewsComponent';

export default function ProdutPage({params}: any) {
  const pid = params.id;
  const [activeImage, setActiveImage] = useState<number>(0);

  const {isLoading, error, data} = useQuery({
    queryKey: ['product'],
    queryFn: () =>
      fetch('/api/product/' + pid).then(res => res.json())
  });

  if (isLoading) return <ProductLoading />;

  if (error) return 'No product found!';

  if (!data) return <div className='mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8'>No Product found!</div>;

  const product: ({Category: Category;} & Product) = data;


  return (
    <div className='min-h-[calc(100vh-200px)] mx-auto max-w-2xl px-4 mb-8 sm:px-6  lg:max-w-7xl lg:px-8'>
      <div className="flex flex-col mt-4 lg:flex-row justify-between gap-6 lg:items-start">
        {/* LEFT -IMAGE SECTION */}
        <div className=" basis-1/2">
          <div className="relative w-full">
            <AspectRatio ratio={4 / 3} >
              <Image
                src={product.images[activeImage]}
                alt={product.name}
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
      {/* REVIEW SECTION */}
      <ReviewsComponent productId={product.id} />
    </div>
  );
}
