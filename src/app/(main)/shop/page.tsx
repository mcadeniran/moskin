import Image from 'next/image';
import noimage from '/public/placeholder.jpeg';
import Link from 'next/link';
import {db} from '@/lib/db';

export default async function ShopPage() {
  const products = await db.product.findMany();

  return (
    <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
      <h2 className=' text-2xl sm:text-4xl font-serif font-thin text-gray-700 mb-8 '>
        Our Best Selling Products
      </h2>
      <div className='grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4'>

        {
          products.length === 0 ?
            <p className='text-xl font-light p-4'>No products found</p>
            :
            products.map((p) => (
              <Link
                key={p.id}
                href={'/products/' + p.id}
                className='group'
              >
                <div className='relative h-72 aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
                  <Image
                    src={p.images.length > 1 ? p.images[0] : noimage}
                    alt={p.name}
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='h-full w-full rounded-md object-cover'
                    fill
                  />
                </div>
                <h3 className='mt-4 text-sm text-gray-700'>{p.name}</h3>
                <p className='mt-1 text-lg font-medium text-gray-900'>
                  ₦{p.price.toLocaleString()}
                </p>
              </Link>
            ))}
      </div>
    </div>
  );
}
