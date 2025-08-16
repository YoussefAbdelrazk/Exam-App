'use server';

import { cookies } from 'next/headers';

export async function getToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  return token?.value;
}

export async function setToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  });
}
