import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const id = request.url.slice(request.url.lastIndexOf('/') + 1);
  const product = await db.product.findFirst({
    where: {
      id: id,
    },
    include: {
      Category: true,
    },
  });

  return NextResponse.json(product);
}
