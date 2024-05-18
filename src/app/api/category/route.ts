import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const categories = await db.category.findMany();
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
        { category: null, message: 'Category name already exists' },
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

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const existingCategoryName = await db.category.findUnique({
      where: { name: body.name },
    });

    if (existingCategoryName) {
      return NextResponse.json(
        { category: null, message: 'Category name already in use!' },
        { status: 409 }
      );
    }

    const renameCategory = await db.category.update({
      where: { id: body.id },
      data: { name: body.name },
    });

    return NextResponse.json(
      { category: renameCategory, message: 'Category renamed successfully.' },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Could not rename category' });
  }
}
