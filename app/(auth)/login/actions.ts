'use server';

import { signIn } from '@/lib/auth';
import { executeAction } from '@/lib/executeAction';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export async function loginWithCredentialsAction(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    throw new Error('Please provide a valid email and password.');
  }

  await executeAction({
    actionFn: async () => {
      await signIn('credentials', {
        email: parsed.data.email,
        password: parsed.data.password,
        redirectTo: '/dashboard',
      });
    },
    successMessage: 'Logged in successfully.',
  });
}

export async function githubSignInAction() {
  await signIn('github', { redirectTo: '/dashboard' });
}
