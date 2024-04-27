import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { Address } from '@prisma/client';
import { auth } from '@/auth';

export async function GET() {
  const userSession = await auth();

  if (!userSession) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const userAddresses = await db.address.findMany({
      where: { userEmail: userSession.user.email! },
    });

    return NextResponse.json(userAddresses);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const userSession = await auth();

  if (!userSession) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const body: Address = await req.json();

  try {
    const data = await db.address.create({
      data: {
        title: body.title,
        house: body.house,
        street: body.street,
        city: body.city,
        state: body.state,
        postal: body.postal,
        country: body.country,
        userEmail: userSession.user.email!,
      },
    });

    console.log(data);

    return NextResponse.json(
      { address: data, message: 'Address created successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Address title already in use' },
      { status: 409 }
    );
  }
}
