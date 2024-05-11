import React from 'react';
import OrderDetails from './orderDetails';

export function generateMetadata({params}: {params: {id: string;};}) {
  return {
    title: `Order ${params.id}`
  };
}

export default function OrderDetailsPage({params}: {params: {id: string;};}) {
  return (
    <OrderDetails id={params.id} paystackClientId={process.env.PAYSTACK_PUBLIC_KEY || 'sb'} />
  );
}
