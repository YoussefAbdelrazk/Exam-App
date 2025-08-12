'use client';

import DynamicBreadcrumb from './Breadcrumb';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className='lg:pl-64'>
        {/* Top navbar */}
        <Navbar />

        {/* Breadcrumb */}
        <DynamicBreadcrumb />

        {/* Page content */}
        <main className='p-6'>{children}</main>
      </div>
    </div>
  );
}
