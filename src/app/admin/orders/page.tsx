import React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import SearchBar from '@/components/layout/AdminComponents/SearchBar';
import AllOrders from './_components/AllOrders';
import ProcessingOrders from './_components/ProcessingOrders';
import PendingOrders from './_components/PendingOrders';
import ShippedOrders from './_components/ShippedOrders';
import DeliveredOrders from './_components/DeliveredOrders';
import CancelledOrders from './_components/CancelledOrders';
import RejectedOrders from './_components/RejectedOrders';

export default function OrdersPage() {
  return (
    <div className="bg-accent p-4 rounded-xl">
      <div className="flex justify-between items-center mb-8">
        <SearchBar placeholder='Search orders' />
      </div>
      <Tabs className='w-full' defaultValue='All'>
        <TabsList className='w-full grid grid-cols-7 bg-gray-500 text-white'>
          <TabsTrigger value='All'>All</TabsTrigger>
          <TabsTrigger value='Processing'>Processing</TabsTrigger>
          <TabsTrigger value='Pending'>Pending</TabsTrigger>
          <TabsTrigger value='Shipped'>Shipped</TabsTrigger>
          <TabsTrigger value='Delivered'>Delivered</TabsTrigger>
          <TabsTrigger value='Cancelled'>Cancelled</TabsTrigger>
          <TabsTrigger value='Rejected'>Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value='All'><AllOrders /> </TabsContent>
        <TabsContent value='Processing'><ProcessingOrders /></TabsContent>
        <TabsContent value='Pending'><PendingOrders /></TabsContent>
        <TabsContent value='Shipped'><ShippedOrders /></TabsContent>
        <TabsContent value='Delivered'><DeliveredOrders /></TabsContent>
        <TabsContent value='Cancelled'><CancelledOrders /></TabsContent>
        <TabsContent value='Rejected'><RejectedOrders /></TabsContent>
      </Tabs>
    </div>
  );
}
