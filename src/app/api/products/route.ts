import { NextResponse } from 'next/server';

const DATA_SOURCE_URL = 'https://api.escuelajs.co/api/v1/products';
// const DATA_SOURCE_URL = 'https://fakestoreapi.com/products';

export async function GET() {
  const res = await fetch(DATA_SOURCE_URL);

  const products: Product[] = await res.json();

  return NextResponse.json(products);
}
