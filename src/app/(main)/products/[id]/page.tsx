'use client';

import {Button} from '@/components/ui/button';
import {useCartStore} from '@/lib/store';
import {Product} from '@prisma/client';
import {useQuery} from '@tanstack/react-query';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {toast} from 'sonner';
import ProductLoading from './ProductLoading';

export default function ProdutPage({params}: any) {
  const pid = params.id;
  const [activeImage, setActiveImage] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);

  const {addToCart} = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const {isLoading, error, data} = useQuery({
    queryKey: ['product'],
    queryFn: () =>
      fetch('/api/product/' + pid).then(res => res.json())
  });

  const handleCartAdd = () => {
    addToCart({
      id: data.id,
      name: data.name,
      image: data.images[0],
      price: data.price,
      quantity: quantity,

    });
    toast.success('Product added to cart.');
  };

  if (isLoading) return <ProductLoading />;

  if (error) return 'No product found!';

  if (!data) return <div className='mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8'>No Product found!</div>;

  return (

    <div className='min-h-[calc(100vh-200px)] mx-auto max-w-2xl px-4 mb-8 sm:px-6  lg:max-w-7xl lg:px-8'>
      <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-start">
        <div className="flex flex-col gap-6 lg:w-2/5">
          <div className="relative w-full  aspect-h-1 aspect-w-1">
            <Image
              src={data.images[activeImage]}
              alt=''
              width={600}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              height={400}
              className="h-full w-full object-cover rounded-xl"
            />
          </div>
          <div className="flex flex-row gap-4 h-24">
            {
              data.images.map((p: Product, index: number) =>
                <div className="relative w-24 h-24" key={index}>
                  <Image src={data.images[index]}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    alt=''
                    style={{
                      objectFit: 'contain',
                      // width: '100%',
                      // height: 'auto',
                    }}
                    className='rounded-md cursor-pointer'
                    key={index} onClick={() => setActiveImage(index)}
                  />

                </div>
              )
            }
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:w-3/5">
          <div className=" whitespace-pre-line">
            <span className="text-sm italic text-gray-400">{data.Category.name}</span>
            <h3 className="mt-4 text-4xl font-serif font-semibold">{data.name}</h3>
            {/* <p className="mt-6 font-medium text-gray-700 text-xl">₦{(data.price).toLocaleString()}</p> */}
            {data.onSale === false &&
              <p className='mt-6 font-medium text-gray-700 text-xl'>
                ₦{data.price.toLocaleString()}
              </p>
            }
            {
              data.onSale === true &&
              <div className="flex gap-2 items-center ">
                <p className='text-xs xl:text-sm 2xl:text-base font-light text-gray-500 mt-6 line-through'>
                  ₦{data.price.toLocaleString()}
                </p>
                <p className='mt-6 font-medium text-gray-700 text-xl'>
                  ₦{(data.price - (data.price * (data.off! / 100))).toLocaleString()}
                </p>
              </div>
            }
            <div className="mt-6 flex flex-row items-center gap-16">
              <div className="flex flex-row items-center">
                <button
                  className="bg-gray-200 text-primary py-2 px-5 rounded-lg text-2xl"
                  onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                >
                  -
                </button>
                <span className="py-2 px-5 rounded-lg text-2xl">{quantity}</span>
                <button
                  className="bg-gray-200 text-primary py-2 px-5 rounded-lg text-2xl"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
              <Button className='px-12 py-2'
                onClick={handleCartAdd}
              >Add to Cart</Button>
            </div>
            <p className="mt-6 font-serif text-gray-500 font-light">{data.description}</p>
            <p className="mt-6 font-medium text-xl">Usage</p>
            <div className="mt-2 font-serif text-gray-500 font-light">{data.features}</div>
            <p className="mt-6 font-medium text-xl">Active Ingredients</p>
            <p className="mt-2 font-serif text-gray-500 font-light">{data.ingredients}</p>
          </div>
        </div>
      </div >
    </div>
  );
}
