import * as z from 'zod';

export const DeliveryAddressSchema = z.object({
  fullname: z
    .string()
    .min(1, "Reciever's name required!")
    .includes(' ', { message: 'Must be given name and surname' }),
  house: z.string().min(1, 'House address is required'),
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
});

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

export const UsernameSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .min(2, 'Username should have at least 2 characters'),
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

export const ProductFormSchema = z.object({
  name: z.string().min(3, {
    message: 'Product name must be at least 3 characters.',
  }),
  category: z.string().min(1, {
    message: 'Category is required.',
  }),
  price: z.coerce
    .number({ invalid_type_error: 'Price must be a number' })
    .positive({ message: 'Price must be positive' })
    .finite({ message: 'Must be a valid price' }),
  description: z.string().min(1, { message: 'Description is required' }),
  features: z.string(),
  ingredients: z
    .string()
    .min(1, { message: 'Active ingredients are required' }),
  sale: z.boolean(),
  off: z.coerce.number(),
  images: z.array(z.string()),
  display: z.boolean(),
});
