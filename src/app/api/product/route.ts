import { auth } from '@/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await db.product.findMany({
    include: { Category: true },
    orderBy: { createdAt: 'asc' },
  });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

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

export async function PATCH(req: Request) {
  const userSession = await auth();

  if (!userSession) {
    return NextResponse.json(
      {
        success: false,
        message: 'Please sign in to add update featured list.',
      },
      { status: 401 }
    );
  }

  if (userSession.user.isAdmin === false) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();

    const existingProduct = await db.product.findUnique({
      where: { id: body.id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { product: null, message: 'Product does not exists!' },
        { status: 409 }
      );
    }

    const updatedProduct = await db.product.update({
      where: { id: body.id },
      data: { isFeatured: body.state },
    });

    const pName = updatedProduct.name;
    const stat = updatedProduct.isFeatured;

    const message = `${pName} has been ${
      stat === false
        ? 'removed from featured products'
        : 'added to featured products'
    }`;

    return NextResponse.json({ success: true, message }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Could not update featured lists' });
  }
}
