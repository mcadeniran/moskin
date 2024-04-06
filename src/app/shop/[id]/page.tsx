'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ProductDetails( { params }: any ) {
  const pid = params.id;
  const [ product, setProduct ] = useState<Product>();

  useEffect( () => {
    fetch( '/api/products/' + pid ).then( ( res ) => {
      res.json().then( ( data ) => {
        setProduct( data );
        console.log( data );
      } );
    } );
  }, [ pid ] );

  if ( !product ) return <div className=" m-auto">No product found</div>;

  return (
    <main>
      <div className='max-w-2xl mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <Image
              src={product.images[ 0 ]}
              alt={product.title}
              className='w-full mb-4'
            />
            <div className='grid grid-cols-3 gap-2'>
              {product.images.map( ( image, index ) => (
                <img
                  key={index}
                  src={image}
                  alt={product.title}
                  className='w-full cursor-pointer'
                />
              ) )}
            </div>
          </div>
          <div>
            <h1 className='text-2xl font-semibold mb-4'>{product.title}</h1>
            <p className='text-gray-700 mb-4'>{product.description}</p>
            <p className='text-xl font-semibold mb-4'>${product.price}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
