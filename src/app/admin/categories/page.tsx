import SearchBar from '@/components/layout/AdminComponents/SearchBar';
import Link from 'next/link';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from '@/components/ui/button';
import CreateCategory from '@/components/layout/AdminComponents/CreateCategory';
import {db} from '@/lib/db';


export default async function CategoriesPage() {
  const categories = await db.category.findMany();

  return (
    <div className=" bg-accent p-4 rounded-xl">

      <div className="flex justify-between items-center mb-8">
        <SearchBar placeholder='Search categories' />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Add new category
              </DialogTitle>
            </DialogHeader>
            <CreateCategory />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-5 gap-4 flex-wrap">
        {
          categories.length > 0 ?
            categories.map(cat => (
              <Link key={cat.id} href={''} className="h-[220px] w-[220px] border rounded-lg items-center justify-center flex cursor-pointer font-bold text-xl">
                {cat.name}
              </Link>
            ))
            :
            <p className='text-xl font-light p-4'>No categories</p>
        }
      </div>
    </div>
  );
}
