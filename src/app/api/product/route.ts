import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: true });
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
        price: parseInt(body.price),
        description: body.description,
        display: true,
        ingredients: body.ingredients,
        onSale: false,
        off: parseInt(body.off),
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
