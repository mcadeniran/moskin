import DateConverter from '@/components/date';
import SearchBar from '@/components/layout/AdminComponents/SearchBar';
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from '@/components/ui/table';
import {Product, Review, User} from '@prisma/client';
import {useQuery} from '@tanstack/react-query';
import React from 'react';
import Reply from './Reply';
import {db} from '@/lib/db';

// const fetchAllReviews = (): Promise<({Product: Product;} & {User: User;} & Review)[]> => fetch('/api/admin/reviews').then(res => res.json());

export default async function Reviews() {
  const reviews = await db.review.findMany({
    include: {Product: true, User: true},
    orderBy: {createdAt: 'asc'},
  });

  // const {isLoading, data: reviews, error} = useQuery({queryKey: ['allReviews'], queryFn: fetchAllReviews});

  // if (isLoading) return <p className="">Loading Reviews</p>;
  // if (error) return <p className="">Unknown error occured</p>;

  return (
    <div className=" bg-accent p-4 rounded-xl min-h-[calc(100vh-12.8rem)]">
      <div className="flex justify-between items-center mb-8">
        <SearchBar placeholder='Search reviews' />
      </div>
      {
        reviews?.length === 0 ?
          <div>No reviews found</div>
          :
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[600px]'>Review</TableHead>
                <TableHead>By</TableHead>
                <TableHead>Product</TableHead>
                {/* <TableHead>Date</TableHead> */}
                <TableHead>Replied</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                reviews?.map(review => (
                  <TableRow key={review.id}>
                    <TableCell>{review.details}<br />{review.rating}/5</TableCell>
                    <TableCell>{review.User.username}</TableCell>
                    <TableCell>{review.Product.name}</TableCell>
                    {/* <TableCell><DateConverter dateString={review.createdAt.toString()} /></TableCell> */}
                    <TableCell >
                      <div className='flex gap-2 items-center '>
                        {review.replied === true ? 'Yes' : 'No'}
                        <Reply id={review.id} details={review.details} author={review.User.username} reply={review.reply ? review.reply : ''} productName={review.Product.name} rating={review.rating} replied={review.replied === true ? 'true' : 'false'} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
      }
    </div>
  );
}
