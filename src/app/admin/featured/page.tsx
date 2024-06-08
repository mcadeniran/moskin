'use client';
import CreateCategory from '@/components/layout/AdminComponents/CreateCategory';
import SearchBar from '@/components/layout/AdminComponents/SearchBar';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Product} from '@prisma/client';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useState, } from 'react';
import Image from 'next/image';
import {Checkbox} from '@/components/ui/checkbox';
import {toast} from 'sonner';

const fetchAllProducts = (): Promise<Product[]> => fetch('/api/product').then(res => res.json());

export default function FeaturedProducts() {
  const {isLoading, data: products, error} = useQuery({queryKey: ['featuredProducts'], queryFn: fetchAllProducts});
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
      queryClient.invalidateQueries({queryKey: ['featuredProducts']});
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

  const onUpdated = () => {
    queryClient.invalidateQueries({queryKey: ['processingOrders']});
  };


  const handleCheckedChange = (state: any, id: string) => {
    const doc = {state, id};
    setPending(true);
    mutation.mutate(doc);
  };

  return (
    <div className="flex flex-col bg-accent p-4 rounded-xl min-h-[calc(100vh-23.8rem)]">
      <div className="flex justify-between items-center mb-8">
        <SearchBar placeholder='Search products' />
        <CreateCategory />
      </div>
      {
        products?.length === 0 ?
          <div>No product found</div>
          :
          <div className='mt-4'>
            <Table className='max-w-2xl'>
              <TableHeader>
                <TableRow>
                  <TableHead className=''>Name</TableHead>
                  <TableHead className=''>Featured</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  products?.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className='text-sm font-medium'>
                        <div className="flex gap-2 items-center">
                          <Image
                            src={product.images[0]}
                            alt='avatar'
                            width={40}
                            height={40}
                            className='rounded-full h-10 w-10 object-cover mr-2'
                          />
                          {product.name}
                        </div>
                      </TableCell>
                      <TableCell className=''>
                        <Checkbox checked={product.isFeatured} onCheckedChange={(value) => handleCheckedChange(value, product.id)} disabled={pending} />
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </div>
      }
    </div>
  );
}
