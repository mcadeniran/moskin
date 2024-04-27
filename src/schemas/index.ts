import * as z from 'zod';

export const LoginFormSchema = z.object({
  emailAddress: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have at least 8 characters'),
});

export const NewPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must have at least 8 characters'),
    passwordConfirm: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: 'Passwords do not match',
      path: ['passwordConfirm'],
    }
  );

export const ResetSchema = z.object({
  emailAddress: z.string().min(1, 'Email is required').email('Invalid email'),
});

export const RegisterFormSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    username: z
      .string()
      .min(1, 'Username is required')
      .min(2, 'Username should have at least 2 characters'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have at least 8 characters'),
    passwordConfirm: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: 'Passwords do not match',
      path: ['passwordConfirm'],
    }
  );
