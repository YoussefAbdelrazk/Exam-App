'use client';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/Authhooks/logouthook';
import { Lock, User } from 'lucide-react';
import Link from 'next/link';

const navigation = [
  {
    name: 'Profile',
    href: '/account',
    icon: User,
  },
  {
    name: 'Change Password',
    href: '/account/change-password',
    icon: Lock,
  },
];
export default function AccountSidebar() {
  const { mutate: logout } = useLogout();
  return (
    <div className='w-72 bg-wihte  border-r border-gray-200 min-h-screen flex flex-col'>
      <nav className='mt-4 px-4 flex-1'>
        <ul className='space-y-2'>
          {navigation.map(item => (
            <li key={item.name}>
              <Link
                href={item.href}
                className='w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors font-geist-mono hover:bg-blue-50 text-gray-500 '
              >
                <item.icon className='h-5 w-5 mr-3' />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* logout button */}
      <Button className='w-full bg-red-500 text-white' onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
