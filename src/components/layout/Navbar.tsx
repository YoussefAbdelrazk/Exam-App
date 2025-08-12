'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/store/AuthStore';
import { ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { user } = useAuthStore();
  console.log(user);
  // const router = useRouter();

  // const handleLogout = () => {
  //   logout();
  //   router.push('/login');
  // };

  return (
    <header className='bg-white border-b border-gray-200 px-6 py-4 font-geist-mono'>
      <div className='flex items-center justify-between'>
        {/* Right side */}
        <div className='flex items-center space-x-4 justify-end w-full'>
          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className='flex items-center space-x-3 text-sm'>
              <div className='flex items-center space-x-3'>
                <div className='w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center'>
                  <span className='text-gray-600 font-medium'>
                    {user?.firstName?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className='hidden md:block text-left'>
                  <p className='text-sm font-medium text-gray-900'>
                    {user?.firstName || 'Firstname'}
                  </p>
                  <p className='text-xs text-gray-500'>{user?.email || 'user-email@example.com'}</p>
                </div>
                <ChevronDown className='h-4 w-4 text-gray-400' />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
              <DropdownMenuItem>
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem onClick={handleLogout}>
                <span>Sign out</span>
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
