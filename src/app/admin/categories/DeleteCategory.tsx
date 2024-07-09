'use client';
import {deleteCategory} from '@/actions/delete-category';
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from '@/components/ui/alert-dialog';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';

import React, {startTransition} from 'react';
import {toast} from 'sonner';

const DeleteCategory = ({id}: {id: string;}) => {

  const router = useRouter();

  const handleAddressDelete = (id: string) => {

    startTransition(() => {
      deleteCategory(id)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            router.refresh();
          }
        }).catch(() => toast.error('Something went wrong!'));
    });

  };

  return (
    <AlertDialog >
      <AlertDialogTrigger>
        <Button variant='ghost' className='text-destructive cursor-pointer'>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() =>
            handleAddressDelete(id)
          }>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCategory;