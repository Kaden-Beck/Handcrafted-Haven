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

export async function githubRegisterAction() {
  await signIn('github', { redirectTo: '/dashboard' });
}

export async function registerWithCredentialsAction(formData: FormData) {
  const result = signupSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirm-password'),
  });

  if (!result.success) {
    const firstError = result.error.issues[0]?.message || 'Invalid input';
    throw new Error(firstError);
  }
  const parsed = result.data;
  await executeAction({
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

// 👉 Quick helper to insert a test user directly
export async function seedTestUser() {
  const email = 'test@artisan.com';
  const password = 'test1234';

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { message: 'Test user already exists' };
  }

  const passwordHash = await hash(password, 12);

  await prisma.user.create({
    data: {
      name: 'Test Artisan',
      email,
      passwordHash,
    },
  });

  return { message: 'Seeded test user', email, password };
}
