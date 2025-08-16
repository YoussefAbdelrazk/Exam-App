import AccountSidebar from '@/components/account/AccountSidebar';
import React from 'react';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex'>
      <AccountSidebar />
      <div className='flex-1'>{children}</div>
    </div>
  );
}
