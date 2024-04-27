'use server';

import { signOut } from '@/auth';

export const logout = async () => {
  // Can do server actions before logging out
  await signOut();
};
