'use client';

import DynamicBreadcrumb from './Breadcrumb';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className='min-h-screen bg-gray-50 flex'>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className='flex-1 lg:pl-64 flex flex-col h-screen overflow-hidden'>
        {/* Top navbar */}
        <Navbar />

        {/* Breadcrumb */}
        <DynamicBreadcrumb />

        {/* Page content */}
        <main className='flex-1 p-6 overflow-hidden font-geist-mono'>{children}</main>
      </div>
    </div>
  );
}
