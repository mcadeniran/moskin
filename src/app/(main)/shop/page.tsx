import Image from 'next/image';
import noimage from '/public/placeholder.jpeg';
import Link from 'next/link';
import {db} from '@/lib/db';

export default async function ShopPage() {
  const products = await db.product.findMany();

  return (
    <div className='mx-auto  py-6 sm:px-6 lg:px-8'>
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
                  alt={p.name}
                  className='object-cover  group-hover:opacity-75'
                  layout='fill'
                // objectFit='cover'
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
    </div>
  );
}
