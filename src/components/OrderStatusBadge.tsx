import React from 'react';
import {Badge} from './ui/badge';
import {Order} from '@prisma/client';

export default function OrderStatusBadge({order}: {order: Order;}) {
  return (
    <Badge variant={order.status === 'CANCELLED' ? 'destructive' :
      order.status === 'REJECTED' ? 'destructive' : order.status === 'PENDING' ? 'pending' :
        order.status === 'PROCESSING' ? 'processing' : order.status === 'DELIVERED' ? 'delivered' : 'default'
    } className='min-w-24 items-center justify-center'>{order.status}</Badge>
  );
}
