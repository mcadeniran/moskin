import { auth } from '@/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const userSession = await auth();

  if (!userSession) {
    return NextResponse.json(
      {
        success: false,
        message: 'Please sign in to review product.',
      },
      { status: 401 }
    );
  }
  try {
    const body = await req.json();
    const userId = userSession.user.id;

    const existingProductName = await db.product.findUnique({
      where: { id: body.productId },
    });

    if (!existingProductName) {
      return NextResponse.json(
        { product: null, message: 'Could not find product. Try again.' },
        { status: 409 }
      );
    }

    const newReview = await db.review.create({
      data: {
        productId: body.productId,
        userId: userId!,
        details: body.details,
        rating: 5.0,
      },
    });

    return NextResponse.json(
      { message: 'Review added successfully.' },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Could not post' });
  }
}
