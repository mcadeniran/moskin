'use client';

import Image from 'next/image';
import {useEffect, useState} from 'react';

export default function ProdutPage({params}: any) {
  const pid = params.id;
  const [product, setProduct] = useState<Product>();

  const [activeImage, setActiveImage] = useState<number>(0);

  useEffect(() => {
    fetch('/api/products/' + pid).then((res) => {
      res.json().then((data) => {
        setProduct(data);
        setActiveImage(0);
        console.log(data);
      });
    });
  }, [pid]);

  if (!product) return <div>No Product found!</div>;

  return (
    <div className='mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8'>
      <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-start">
        <div className="flex flex-col gap-6 lg:w-2/4">
          <div className="relative w-full h-full  aspect-h-1 aspect-w-1">
            <Image src={product.images[activeImage]} fill alt='' className="rounded-xl" style={{objectFit: 'contain'}} />
          </div>
          {/* <img src={product.images[activeImage]} alt=''
            className="h-full w-full aspect-1 object-cover rounded-xl" /> */}
          <div className="flex flex-row gap-4 h-24">
            {
              product.images.map((p, index) =>
                <div className="relative w-24 h-24" key={index}>
                  <Image src={product.images[index]}
                    fill
                    alt=''
                    style={{objectFit: 'contain'}}
                    className='rounded-md cursor-pointer'
                    key={index} onClick={() => setActiveImage(index)}
                  />

                </div>
                // <img src={product.images[index]}
                // alt=''
                // className='w-24 h-24 rounded-md cursor-pointer'
                // key={index} onClick={() => setActiveImage(index)}
                // />
              )
            }
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:w-2/4">
          <div className="">
            <span className="text-sm italic text-gray-400">{product.category.name}</span>
            <h3 className="mt-4 text-4xl font-serif font-semibold">{product.title}</h3>
            <p className="mt-6 font-serif text-gray-500 font-light">{product.description}</p>
            <p className="mt-6 font-bold text-gray-700 text-2xl">₦{(product.price * 750).toLocaleString()}</p>
          </div>
          <div className="mt-6 flex flex-row items-center gap-16">
            <div className="flex flex-row items-center">
              <button className="bg-gray-200 text-primary py-2 px-5 rounded-lg text-2xl">-</button>
              <span className="py-2 px-5 rounded-lg text-2xl">1</span>
              <button className="bg-gray-200 text-primary py-2 px-5 rounded-lg text-2xl">+</button>
            </div>
            <button className='bg-primary py-2 px-12 text-center rounded-lg h-full'>Add to Cart</button>
          </div>
        </div>
      </div >
    </div>
  );
}
