'use client';

import { useGetExamQuestions } from '@/hooks/Examshooks/Examshook';
import { useParams, useRouter } from 'next/navigation';
import ExamError from './ExamError';
import ExamForm from './ExamForm';
import ExamLoading from './ExamLoading';

export default function ExamPageClient() {
  const params = useParams();
  const router = useRouter();
  const examId = params.examId as string;

  const { questions, examInfo, isLoading, error } = useGetExamQuestions(examId);

  const handleExamComplete = () => {
    // Exam is now complete and results are shown in the ExamForm component
    // The ExamForm component will handle showing results
  };

  const handleGoBack = () => {
    router.back();
  };

  if (isLoading) {
    return <ExamLoading />;
  }

  if (error) {
    return <ExamError message={`Error loading exam: ${error.message}`} onGoBack={handleGoBack} />;
  }

  if (!examInfo || !questions || questions.length === 0) {
    return <ExamError message='No exam data available' onGoBack={handleGoBack} />;
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
