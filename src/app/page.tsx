import DashboardLayout from '@/components/layout/DashboardLayout';
import { GraduationCap, User } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <DashboardLayout>
      <div className='space-y-6'>
        {/* Welcome Section */}
        <div className='bg-blue-600 rounded-lg p-8 text-white'>
          <h1 className='text-3xl font-bold mb-2 font-geist-mono'>Welcome to ELEVATE</h1>
          <p className='text-blue-100 font-geist-sans'>Manage your diplomas and certifications</p>
        </div>

        {/* Quick Actions */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Link href='/diplomas' className='block'>
            <div className='bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer'>
              <div className='flex items-center space-x-4'>
                <div className='p-3 bg-blue-100 rounded-lg'>
                  <GraduationCap className='h-8 w-8 text-blue-600' />
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 font-geist-mono'>
                    View Diplomas
                  </h3>
                  <p className='text-gray-600 font-geist-sans'>
                    Browse all your certificates and diplomas
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link href='/settings' className='block'>
            <div className='bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer'>
              <div className='flex items-center space-x-4'>
                <div className='p-3 bg-gray-100 rounded-lg'>
                  <User className='h-8 w-8 text-gray-600' />
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 font-geist-mono'>
                    Account Settings
                  </h3>
                  <p className='text-gray-600 font-geist-sans'>
                    Manage your profile and preferences
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
