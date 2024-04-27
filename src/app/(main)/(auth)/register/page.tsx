'use client';
import * as z from 'zod';

import {RegisterFormSchema} from '@/schemas';
import {RegisterForm} from '@/components/layout/RegisterForm';

export default function RegisterPage() {
  const handleSubmit = async (values: z.infer<typeof RegisterFormSchema>) => {
    // console.log({values});
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: values.email,
        username: values.username,
        password: values.password
      })
    });
  };

  return <RegisterForm />;
}
