'use server';

import { cookies } from 'next/headers';

export async function getToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  return token?.value;
}
