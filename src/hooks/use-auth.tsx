import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export function useServerAuth() {
  const cookieStore = cookies();
  const token = cookieStore.get('authToken')?.value;

  if (!token) {
    redirect('/login');
  }

  return true;
}