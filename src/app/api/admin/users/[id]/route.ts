import { auth } from '@/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const userSession = await auth();

  if (!userSession) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
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
    const id = request.url.slice(request.url.lastIndexOf('/') + 1);
    const user = await db.user.findFirst({
      where: {
        id: id,
      },
      include: {
        orders: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Unknown Error' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const userSession = await auth();

  if (!userSession) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  if (userSession.user.isAdmin === false) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const body = await req.json();
  try {
    await db.user.update({
      where: { id: body.id },
      data: { isAdmin: body.isAdmin === 'true' ? true : false },
    });
    return NextResponse.json(
      { success: true, message: 'Role updated successfully' },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
