'use client';

import DateConverter from '@/components/date';
import {Button} from '@/components/ui/button';
import TitleComponenet from '@/components/layout/MainComponents/TitleComponenet';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import {AvatarImage} from '@radix-ui/react-avatar';
import {Textarea} from '@/components/ui/textarea';
import {useForm} from 'react-hook-form';
import {Form, FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useSession} from 'next-auth/react';
import {ReviewSchema} from '@/schemas';
import {useState, useTransition} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {toast} from 'sonner';
import {Review, User} from '@prisma/client';
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from '@/components/ui/alert-dialog';
import {Pencil, Trash} from '@phosphor-icons/react/dist/ssr';
import {deleteReview} from '@/actions/delete-review';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {FormError} from '@/components/FormError';
import {editReview} from '@/actions/edit-review';


export const ReviewsComponent = ({productId}: {productId: string;}) => {

  const session = useSession();
  const user = session.data?.user;

  const [open, setOpen] = useState(false);
  const [localError, setLocalError] = useState('');
  const [editedValue, setEditedValue] = useState('');
  const [editReviewId, setEditReviewId] = useState('');

  const [isPending, startTransition] = useTransition();
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      details: '',
    }
  });

  const {isLoading, error, data} = useQuery({
    queryKey: ['reviews'],
    queryFn: () =>
      fetch('/api/review/' + productId).then(res => res.json())
  });


  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return fetch('/api/review/' + productId, {
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(data),
        method: 'POST'
      });
    },
    async onSuccess(data) {
      queryClient.invalidateQueries({queryKey: ['reviews']});
      const res = await data.json();
      toast.success(res.message);
      setPending(false);
      form.reset();
    },
    onError(error) {
      const res = error.message;
      toast.error(res);
      setPending(false);
    }
  });

  const onReviewSubmit = (values: z.infer<typeof ReviewSchema>) => {
    setPending(true);
    const data = {details: values.details, productId: productId};
    mutation.mutate(data);
  };

  const handleEditSubmit = async (id: string, userId: string) => {
    setLocalError('');
    const det = editedValue;
    startTransition(() => {
      editReview(id, userId, det)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
            setLocalError(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            setEditedValue('');
            queryClient.invalidateQueries({queryKey: ['reviews']});
            setOpen(false);
          }
        }).catch(() => toast.error('Something went wrong!'));
    });
  };

  const handleReviewDelete = (id: string, userId: string) => {
    startTransition(() => {
      deleteReview(id, userId)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            queryClient.invalidateQueries({queryKey: ['reviews']});
          }
        }).catch(() => toast.error('Something went wrong!'));
    });
  };


  if (isLoading) return '<ProductLoading />';

  if (error) return 'No product found!';

  const canComment: Boolean = data.canComment;
  const reviews: ({User: User;} & Review)[] = data.reviews;

  return (
    <div className="mt-4">
      <TitleComponenet title='Reviews' />
      {reviews.length === 0 && <p className="my-2 flex justify-center text-center text-xs italic font-light">No reviews yet!</p>}
      {canComment &&
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onReviewSubmit)} className='my-4'>
              <FormField control={form.control} name='details' render={({field}) => {
                return <FormItem>
                  <FormControl>
                    <Textarea {...field} placeholder='Enter review' disabled={pending || !canComment} />
                  </FormControl>
                  <FormMessage />
                </FormItem>;
              }} />
              <Button type='submit' size='sm' disabled={pending || !canComment} className='mt-4'>Submit Review</Button>
            </form>
          </Form>
        </>
      }
      <div className="flex flex-col gap-4 my-2">
        {reviews.map(review =>
          <div key={review.id} className='flex flex-col bg-slate-100/20 border border-slate-100/20 rounded-lg p-4'>
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <Avatar className=''>
                  <AvatarImage src={review.User.image} className='object-contain' alt={review.User.username} />
                  <AvatarFallback className=' text'>{review.User.username.substring(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
                <p className="">{review.User.username}</p>
                <span className="text-sm text-gray-500"><DateConverter dateString={review.createdAt.toString()} /></span>
                {review.edited === true && <span className="text-xs text-gray-500">Edited: <DateConverter dateString={review.updatedAt.toString()} /></span>}
              </div>
              <div className="">
                {
                  user?.id !== null && user?.id === review.userId ?
                    <div className="flex gap-2">

                      {/* EDIT COMMENT */}
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                          <Pencil size={18} weight='light' className='cursor-pointer' onClick={() => {setEditedValue(review.details); setEditReviewId(review.id);}} />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Edit Review
                            </DialogTitle>
                          </DialogHeader>
                          <div className='flex w-full  bg-accent p-4 rounded-xl gap-4'>
                            <div className="w-full flex flex-col gap-4">
                              <Textarea className='bg-input' value={editedValue} placeholder='Type your review here...' disabled={pending} required onChange={(val) => setEditedValue(val.target.value)} />
                              <FormError message={localError} />
                              <div className="flex justify-end">
                                <Button type='button' className=' w-min bg-slate-800' disabled={pending} onClick={() => handleEditSubmit(editReviewId, review.userId)}>Update Review</Button>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {/* DELETE COMMENT */}
                      <AlertDialog >
                        <AlertDialogTrigger>
                          <Trash size={18} weight='light' className='cursor-pointer' />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. Your review and rating will be
                              permanently deleted.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className='bg-slate-800' onClick={() =>
                              handleReviewDelete(review.id, review.userId)
                            }>Delete Review</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    :
                    <div className=""></div>
                }
              </div>
            </div>
            <p className="ml-12 md:ml-16 text-sm text-gray-700 font-light">{review.details}</p>
            {
              review.replied &&
              <div className="flex flex-col gap-4 text-xs text-gray-800 rounded-lg bg-accent p-4 ml-12 md:ml-16 mt-4">
                {review.reply}
              </div>
            }
          </div>
        )
        }
      </div>
    </div>
  );
};
