import AccountSidebar from '@/components/account/AccountSidebar';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Header from '@/components/layout/Header';
import { User } from 'lucide-react';

import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      <Header icon={<User className='h-8 w-8' />} title='Account Settings' />
      <div className='flex mt-4'>
        <AccountSidebar />
        <div className='flex-1 w-[724px]'>{children}</div>
      </div>
    </DashboardLayout>
  );
}
