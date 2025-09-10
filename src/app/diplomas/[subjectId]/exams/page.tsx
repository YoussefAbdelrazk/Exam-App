'use client';

import ExamsList from '@/components/exams/ExamsList';
import ExamsLoading from '@/components/exams/ExamsLoading';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Header from '@/components/layout/Header';
import { GraduationCap } from 'lucide-react';
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

  return (
    <DashboardLayout>
      <div className='space-y-6'>
        {/* Header */}
        <Header title='Subject Exams' icon={<GraduationCap className='h-8 w-8' />} />


        {/* Exams List */}
        <Suspense fallback={<ExamsLoading />}>
          <ExamsList subjectId={subjectId} onStartExam={handleStartExam} />
        </Suspense>
      </div>
    </DashboardLayout>
  );
}
