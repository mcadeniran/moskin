'use client';

import Pagination from '@/components/layout/AdminComponents/Pagination';
import SearchBar from '@/components/layout/AdminComponents/SearchBar';
import {db} from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';
import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {DotsThreeVertical, PencilSimpleLine, Trash} from '@phosphor-icons/react/dist/ssr';
import {Category, Product} from '@prisma/client';
import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query';
import {toast} from 'sonner';
import {Checkbox} from '@/components/ui/checkbox';


const fetchAllProducts = (): Promise<({Category: Category;} & Product)[]> => fetch('/api/product').then(res => res.json());

export default function ProductsPage() {

  const {isLoading, data: products, error} = useQuery({queryKey: ['allProducts'], queryFn: fetchAllProducts});
  const queryClient = useQueryClient();

  const [pending, setPending] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return fetch('/api/product', {
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(data),
        method: 'PATCH'
      });
    },
    async onSuccess(data) {
      queryClient.invalidateQueries({queryKey: ['allProducts']});
      const res = await data.json();
      toast.success(res.message);
      setPending(false);
    },
    onError(error) {
      const res = error.message;
      toast.error(res);
      setPending(false);
    }

  });
  if (isLoading) return <p className="">Loading products</p>;
  if (error) return <p className="">Unknown error occured</p>;

  const handleCheckedChange = (state: any, id: string) => {
    const doc = {state, id};
    setPending(true);
    mutation.mutate(doc);
  };

  console.log(products);

  return (
    <div className=" bg-accent p-4 rounded-xl">
      <div className="flex justify-between items-center mb-8">
        <SearchBar placeholder='Search products' />
        <Link href={'/admin/products/add'} className='border rounded-xl bg-slate-800 text-white px-3 py-2'>Add New</Link>
      </div>
      {products!.length == 0 ?
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
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products!.map((product) => (
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
                <TableCell>{product.Category.name}</TableCell>
                <TableCell>₦{product.price.toLocaleString()}</TableCell>
                <TableCell>{product.onSale === true ? <p className='text-emerald-500'>Yes ({product.off}% off)</p> : <p className='text-destructive'>No</p>}</TableCell>
                <TableCell>{product.display === true ? <p className='text-emerald-500'>Yes</p> : <p className='text-destructive'>No</p>}</TableCell>
                <TableCell>
                  <Checkbox checked={product.isFeatured} onCheckedChange={(value) => handleCheckedChange(value, product.id)} disabled={pending} />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost"><DotsThreeVertical size={22} /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-28 bg-accent p-2">
                      <Link href={'/admin/products/' + product.id}>
                        <DropdownMenuItem className='cursor-pointer' >
                          <PencilSimpleLine size={32} className="mr-4 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem className='cursor-pointer' >
                        <Trash size={32} className="mr-4 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
