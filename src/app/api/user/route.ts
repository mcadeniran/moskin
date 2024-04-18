import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt';

export async function GET() {
  return NextResponse.json({ success: true });
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
