'use client';

import ExamForm from '@/components/exams/ExamForm';
import ExamLoading from '@/components/exams/ExamLoading';
import { useGetExamQuestions } from '@/hooks/Examshooks/Examshook';
import { useParams, useRouter } from 'next/navigation';

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.examId as string;

  const { questions, examInfo, isLoading, error } = useGetExamQuestions(examId);

  const handleExamComplete = (answers: Record<string, string>) => {
    // TODO: Implement exam submission logic
    console.log('Submitting exam with answers:', answers);
    // Here you would typically send the answers to your backend
    // router.push(`/exam/${examId}/results`);
  };

  const handleGoBack = () => {
    router.back();
  };

  if (isLoading) {
    return <ExamLoading />;
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-red-500 text-lg'>Error loading exam: {error.message}</p>
          <button
            onClick={() => router.back()}
            className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!examInfo || !questions || questions.length === 0) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-red-500 text-lg'>No exam data available</p>
          <button
            onClick={() => router.back()}
            className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <ExamForm
      questions={questions}
      examTitle={examInfo.title}
      subject={examInfo.subject}
      duration={examInfo.duration}
      onExamComplete={handleExamComplete}
      onGoBack={handleGoBack}
    />
  );
}
