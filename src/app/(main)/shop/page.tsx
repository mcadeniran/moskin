'use client';

import Image from 'next/image';
import {useState, useEffect} from 'react';
import noimage from '/public/placeholder.jpeg';
import Link from 'next/link';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/products').then((res) => {
      res.json().then((data) => {
        setProducts(data);
      });
    });

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <main>
      <div className='mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8'>
        {isLoading && (
          <div className='flex mx-auto my-auto'>Loading Products...</div>
        )}
        {!isLoading && products.length === 0 ? (
          <div>
            <p>No Products Found!</p>
          </div>
        ) : (
          // <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          //   {
          //     products.map(p => (
          //       <Link href={'/products/' + p.id} key={p.id}>
          //         <Card className='p-0 border-none shadow-none'>
          //           <CardHeader>
          //             <div className="relative h-52 w-full aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          //               <Image src={p.images.length > 1 ? p.images[0] : noimage}
          //                 alt={p.title}
          //                 className='absolute h-full w-full object-cover object-center group-hover:opacity-75'
          //                 objectFit='cover'
          //                 layout='fill'
          //               />
          //             </div>
          //           </CardHeader>

          //         </Card>
          //       </Link>
          //     ))
          //   }
          // </div>
          <div className=' w-full'>
            <h2 className=' text-2xl sm:text-4xl font-serif font-thin text-gray-700 mb-8 '>
              Our Best Selling Products
            </h2>

            <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
              {products.map((p) => (
                <Link
                  key={p.id}
                  href={'/products/' + p.id}
                  className='group'
                >
                  <div className='relative h-72 aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
                    <Image
                      src={p.images.length > 1 ? p.images[0] : noimage}
                      alt={p.title}
                      className='object-cover  group-hover:opacity-75'
                      layout='fill'
                    // objectFit='cover'
                    />
                  </div>
                  <h3 className='mt-4 text-sm text-gray-700'>{p.title}</h3>
                  <p className='mt-1 text-lg font-medium text-gray-900'>
                    ₦{(p.price * 705).toLocaleString()}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
