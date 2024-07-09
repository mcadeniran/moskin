import { auth } from '@/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const reviews = await db.review.findMany({
    include: { Product: true, User: true },
    orderBy: { createdAt: 'asc' },
  });
  return NextResponse.json(reviews);
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const existingReview = await db.review.findUnique({
      where: { id: body.id },
    });

    if (!existingReview) {
      return NextResponse.json(
        { category: null, message: 'Could not find review to update!' },
        { status: 400 }
      );
    }

    const response = await db.review.update({
      where: { id: body.id },
      data: { reply: body.reply, replied: true },
    });

    return NextResponse.json(
      { category: response, message: 'Reply submitted successfully.' },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Could not submit reply.' });
  }
}
