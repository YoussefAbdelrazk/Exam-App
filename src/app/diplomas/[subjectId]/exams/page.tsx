'use client';

import ExamsList from '@/components/exams/ExamsList';
import ExamsLoading from '@/components/exams/ExamsLoading';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';

export default function SubjectExamsPage() {
  const params = useParams();
  const router = useRouter();
  const subjectId = params.subjectId as string;

  const handleStartExam = (examId: string) => {
    // Navigate to the exam page
    router.push(`/exam/${examId}`);
  };

  const handleBackToSubjects = () => {
    router.push('/diplomas');
  };

  return (
    <DashboardLayout>
      <div className='space-y-6'>
        {/* Header */}
        <div className='bg-blue-600 rounded-lg p-8 text-white'>
          <div className='flex items-center space-x-3 mb-4'>
            <button
              onClick={handleBackToSubjects}
              className='p-2 hover:bg-blue-700 rounded-lg transition-colors duration-200'
            >
              <ArrowLeft className='h-5 w-5' />
            </button>
            <GraduationCap className='h-8 w-8' />
            <h1 className='text-3xl font-bold font-geist-mono'>Subject Exams</h1>
          </div>
          <p className='text-blue-100 font-geist-sans'>Available exams for this subject</p>
        </div>

        {/* Exams List */}
        <Suspense fallback={<ExamsLoading />}>
          <ExamsList subjectId={subjectId} onStartExam={handleStartExam} />
        </Suspense>
      </div>
    </DashboardLayout>
  );
}
