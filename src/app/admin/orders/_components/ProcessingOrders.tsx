'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import DateConverter from '@/components/date';
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from '@/components/ui/alert-dialog';
import {toast} from 'sonner';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import RejectForm from './RejectForm';


const fetchProcessingOrders = (): Promise<any[]> => fetch('/api/admin/orders/status/PROCESSING', {method: 'GET'}).then(res => res.json());


const ProcessingOrders = () => {

  const {isLoading, data: orders, error} = useQuery({queryKey: ['processingOrders'], queryFn: fetchProcessingOrders});

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return fetch('/api/admin/orders', {
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(data),
        method: 'PATCH'
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ['processingOrders']});
      toast.success("Order status has been updated to SHIPPED");
    },
    onError() {
      toast.error("An error occured.");
    }
  });

  const updateOrder = (id: string, type: string, reason?: string) => {
    const data = {id: id, type: type, reason};
    console.log(data);
    mutation.mutate(data);
  };

  const onRejected = () => {
    queryClient.invalidateQueries({queryKey: ['processingOrders']});
  };


  if (isLoading) return <p className="">Loading Processing Orders</p>;
  if (error) return <p className="">Unknown error occured</p>;


  return (
    <div className='mt-4 min-h-[calc(100vh-23.8rem)]'>
      {
        orders?.length === 0 ?
          <div>No order in process found</div>
          :
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order#</TableHead>
                <TableHead>By</TableHead>
                <TableHead>Placed At</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                orders?.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className='font-bold'>#{order.id.substring(-6, 6)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 items-center">
                        <Avatar>
                          <AvatarImage src={order.User.image} />
                          <AvatarFallback className=' uppercase bg-slate-500 text-white'>{order.User.username.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        {order.User.username}
                      </div>
                    </TableCell>
                    <TableCell><DateConverter dateString={order.createdAt.toString()} /></TableCell>
                    <TableCell>{order.items.map((item: any) => (
                      <div className="" key={item.id}>{item.name} x {item.quantity}<br /></div>
                    ))}</TableCell>
                    <TableCell>₦{order.totalPrice.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <AlertDialog >
                          <AlertDialogTrigger>
                            <div className='flex items-center justify-center text-xs border-transparent bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/30 px-2 py-2 rounded-sm'>
                              Mark as Shipped
                            </div>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will set the status of the order to shipped and cannot be reverted.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className='bg-slate-800'
                                onClick={() =>
                                  updateOrder(order.id, 'SHIPPED')
                                }>Confirm</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <RejectForm id={order.id} type='REJECTED' onRejected={onRejected} />
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
};

export default ProcessingOrders;