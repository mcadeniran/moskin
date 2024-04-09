'use client';
import * as z from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';

const formSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string().min(6),
  passwordConfirm: z.string(),
}).refine((data) => {
  return data.password === data.passwordConfirm;
}, {
  message: 'Passwords do not match',
  path: ['passwordConfirm']
});

export default function AddUserPage() {
  return (
    <div>AddUserPage</div>
  );
}
