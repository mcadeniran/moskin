import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { getAuthSession } from '@/lib/auth';

export async function GET() {
  const userSession = await getAuthSession();

  if (!userSession) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const userDetails = await db.user.findUnique({
    where: { email: userSession.user.email! },
  });

  if (!userDetails) {
    return NextResponse.json(
      { success: false, message: 'Unknown User' },
      { status: 550 }
    );
  }

  const { password: newUserPassword, ...rest } = userDetails;

  return NextResponse.json(rest);
}

export async function PATCH(req: Request) {
  const userSession = await getAuthSession();

  if (!userSession) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const body = await req.json();

  if (body.type === 'personal') {
    try {
      await db.user.update({
        where: { email: userSession.user.email! },
        data: {
          fname: body.fname,
          lname: body.lname,
          phone: body.phone,
        },
      });
      return NextResponse.json(
        { success: true, message: 'Profile updated successfully' },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Something went wrong' },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = body;

    // check if email exists
    const existingEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { user: null, message: 'Email already registered' },
        { status: 409 }
      );
    }
    const existingUsername = await db.user.findUnique({
      where: { username: username },
    });

    if (existingUsername) {
      return NextResponse.json(
        { user: null, message: 'Username already taken' },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        fname: '',
        lname: '',
        image: '',
        phone: '',
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { user: null, message: 'Unable to complete registration.' },
      { status: 500 }
    );
  }
}
