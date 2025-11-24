'use server';

import { signIn } from '@/lib/auth';
import { executeAction } from '@/lib/executeAction';
import prisma from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { z } from 'zod';

const signupSchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(100),
    email: z.string().email('Enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export async function registerWithCredentialsAction(formData: FormData) {
  const result = signupSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirm-password'),
  });

  if (!result.success) {
    // Get the first error message from Zod
    const firstError = result.error.errors[0]?.message || 'Invalid input';
    return {
      success: false,
      error: firstError,
    };
  }
  const parsed = result.data;
  return await executeAction({
    actionFn: async () => {
      const existingUser = await prisma.user.findUnique({
        where: { email: parsed.email },
      });

      if (existingUser) {
        throw new Error('An account with that email already exists.');
      }

      const passwordHash = await hash(parsed.password, 12);

      await prisma.user.create({
        data: {
          name: parsed.name,
          email: parsed.email,
          passwordHash,
        },
      });

      await signIn('credentials', {
        email: parsed.email,
        password: parsed.password,
        redirectTo: '/dashboard',
      });
    },
    successMessage: 'Account created successfully. Redirecting...',
  });
}

export async function githubRegisterAction() {
  await signIn('github', { redirectTo: '/dashboard' });
}
