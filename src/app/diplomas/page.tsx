import DiplomasList from '@/components/diplomas/DiplomasList';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Header from '@/components/layout/Header';
import Loading from '@/components/loading';
import { Suspense } from 'react';

//     id: 1,
//     title: 'Flutter Development',
//     image: '/api/placeholder/300/200',
//     category: 'Mobile Development',
//     color: 'from-cyan-400 to-blue-500',
//   },
//   {
//     id: 2,
//     title: 'AI & ML Development',
//     image: '/api/placeholder/300/200',
//     category: 'Artificial Intelligence',
//     color: 'from-gray-300 to-gray-500',
//   },
//   {
//     id: 3,
//     title: 'Back-End Web Development',
//     image: '/api/placeholder/300/200',
//     category: 'Web Development',
//     color: 'from-purple-600 to-blue-800',
//   },
//   {
//     id: 4,
//     title: 'Data Analysis',
//     image: '/api/placeholder/300/200',
//     category: 'Data Science',
//     color: 'from-blue-600 to-purple-700',
//   },
//   {
//     id: 5,
//     title: 'Software Testing',
//     image: '/api/placeholder/300/200',
//     category: 'Quality Assurance',
//     color: 'from-teal-500 to-cyan-600',
//   },
//   {
//     id: 6,
//     title: 'Cyber Security',
//     image: '/api/placeholder/300/200',
//     category: 'Security',
//     color: 'from-indigo-600 to-blue-800',
//   },
// ];

export default function DiplomasPage() {
  return (
    <DashboardLayout>
      <div className='space-y-6'>
        <Header title='Diplomas' />
        {/* Diplomas Grid */}
        <Suspense fallback={<Loading />}>
          <DiplomasList />
        </Suspense>

        {/* Load More */}
        <div className='text-center py-8'>
          <p className='text-gray-500 text-lg font-geist-sans'>Scroll to view more</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
