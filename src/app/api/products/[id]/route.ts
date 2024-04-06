import { NextResponse } from 'next/server';

const DATA_SOURCE_URL = 'https://api.escuelajs.co/api/v1/products';

export async function GET(request: Request) {
  const id = request.url.slice(request.url.lastIndexOf('/') + 1);

  const res = await fetch(`${DATA_SOURCE_URL}/${id}`);

  const product: Product = await res.json();

  // if (!product)
  //   return NextResponse.json({ message: 'Not found' }, { status: 404 });

  return NextResponse.json(product);
}
