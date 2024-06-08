import SearchBar from '@/components/layout/AdminComponents/SearchBar';
import React from 'react';
import CreateCategory from '@/components/layout/AdminComponents/CreateCategory';
import {db} from '@/lib/db';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import DeleteCategory from './DeleteCategory';
import RenameCategory from './RenameCategory';


export default async function CategoriesPage() {
  const categories = await db.category.findMany({
    include: {products: true},
    orderBy: {name: 'asc'},
  });



  return (
    <div className=" bg-accent p-4 rounded-xl min-h-[calc(100vh-23.8rem)]">
      <div className="flex justify-between items-center mb-8">
        <SearchBar placeholder='Search categories' />
        <CreateCategory />
      </div>
      <div className='mt-4 min-h-[calc(100vh-23.8rem)]'>
        {
          categories?.length === 0 ?
            <div>No category found</div>
            :
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[300px]'>Name</TableHead>
                  <TableHead className=''># of Products</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  categories?.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className='font-bold'>{category.name}</TableCell>
                      <TableCell className=''>{category.products.length}</TableCell>
                      <TableCell className=''>
                        <div className="flex flex-col gap-2">
                          {
                            category.products.map(product => (
                              <span className="hover:underline cursor-pointer" key={product.id}>{product.name}</span>
                            ))
                          }
                        </div>
                      </TableCell>
                      <TableCell className='text-right'>
                        <div className="flex flex-row items-center justify-end gap-4">
                          <DeleteCategory id={category.id} />
                          <RenameCategory id={category.id} name={category.name} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
        }
      </div>
    </div>
  );
}
