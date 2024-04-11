import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await db.product.findMany({
    include: { Category: true },
  });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);

    const existingProductName = await db.product.findUnique({
      where: { name: body.name },
    });

    if (existingProductName) {
      return NextResponse.json(
        { product: null, message: 'Product name already exists' },
        { status: 409 }
      );
    }

    const newProduct = await db.product.create({
      data: {
        name: body.name,
        price: body.price,
        description: body.description,
        display: body.display,
        ingredients: body.ingredients,
        onSale: body.sale,
        off: body.off,
        images: body.images,
        features: body.features,
        categoryId: body.category,
      },
    });

    return NextResponse.json(
      { product: newProduct, message: 'Product created successfully.' },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Could not post' });
  }
}
