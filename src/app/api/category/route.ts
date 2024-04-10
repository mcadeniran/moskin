import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const categories = await db.category.findMany();
  console.log(categories);
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const existingCategoryName = await db.category.findUnique({
      where: { name: body.name },
    });

    if (existingCategoryName) {
      return NextResponse.json(
        { category: null, message: 'Category already exists' },
        { status: 409 }
      );
    }

    const newCategory = await db.category.create({
      data: {
        name: body.name,
      },
    });

    return NextResponse.json(
      { category: newCategory, message: 'Category created successfully.' },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Could not create category' });
  }
}
