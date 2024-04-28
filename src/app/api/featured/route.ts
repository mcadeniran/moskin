import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await db.product.findMany({
    where: { isFeatured: true, display: true },
    include: { Category: true },
  });
  return NextResponse.json(products);
}
