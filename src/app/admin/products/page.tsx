import Pagination from '@/components/layout/AdminComponents/Pagination';
import SearchBar from '@/components/layout/AdminComponents/SearchBar';
import {db} from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function ProductsPage() {
  const products = await db.product.findMany({include: {Category: true}});

  return (
    <div className=" bg-accent p-4 rounded-xl">
      <div className="flex justify-between items-center mb-8">
        <SearchBar placeholder='Search products' />
        <Link href={'/admin/products/add'} className='border rounded-xl bg-slate-800 text-white px-3 py-2'>Add New</Link>
      </div>
      {products.length == 0 ?
        <p className='text-xl font-light p-4'>No products</p>
        :
        <Table>
          <TableCaption>A list of your available products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Onsale</TableHead>
              <TableHead>Visible</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  <div className="flex gap-2 items-center">
                    <Image
                      src={product.images[0]}
                      alt='avatar'
                      width={40}
                      height={40}
                      className='rounded-full h-10 w-10 object-cover'
                    />
                    {product.name}
                  </div>
                </TableCell>
                <TableCell>{product.Category?.name}</TableCell>
                <TableCell>₦{product.price.toLocaleString()}</TableCell>
                <TableCell>{product.onSale === true ? <p className='text-emerald-500'>Yes ({product.off}% off)</p> : <p className='text-destructive'>No</p>}</TableCell>
                <TableCell>{product.display === true ? <p className='text-emerald-500'>Yes</p> : <p className='text-destructive'>No</p>}</TableCell>
                <TableCell className="text-right">
                  <Link href={'/admin/products/' + product.id} className='py-2 px-3 hover:underline '>Edit</Link>
                  <Link href='' className='py-2 pl-4 text-red-500 hover:underline'>Delete</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
      <Pagination />
    </div>
  );
}
