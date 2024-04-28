import EditProductForm from '@/components/layout/AdminComponents/EditProductForm';
import {Loader} from '@/components/layout/AdminComponents/loader';
import {db} from '@/lib/db';
import React from 'react';

export default async function EditProductPage({params}: {params: {id: string;};}) {
  const product = await db.product.findFirst(
    {
      where: {id: params.id},
    },
  );
  const categories = await db.category.findMany();


  return (
    <div className='bg-accent mb-6 rounded-xl'>
      <h1 className='text-2xl p-4 font-medium'>Edit {product?.name}</h1>
      {
        product && categories ? <EditProductForm product={product} categories={categories} id={params.id} /> : <Loader />
      }
    </div>
  );
}
