import {signIn} from '@/auth';
import {AuthError} from 'next-auth';

import * as z from 'zod';

import {DEFAULT_LOGIN_REDIRECT} from '@/routes';
import {LoginForm} from '@/components/layout/LoginForm';
import {LoginFormSchema} from '@/schemas';


export default function LoginPage() {


  const handleSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
    'use server';
    console.log({values});
    try {
      await signIn('credentials', {
        email: values.emailAddress,
        password: values.password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      });

    } catch (error) {
      // TODO
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            console.log("Invalid credentials");
            return {error: 'Invalid credentials'};
          default:
            return {error: 'Something went wrong!'};
        }
      }
      throw error;
    }

    // if (signInData?.error) {
    //   console.log(signInData.error);
    //   toast.error('Invalid email or password.');
    // } else {
    //   router.push('/');
    // }
    // console.log(signInData);
  };

  return (
    <LoginForm />
  );


};
