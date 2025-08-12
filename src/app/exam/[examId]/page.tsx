'use client';

import ExamLoading from '@/components/exams/ExamLoading';
import { useGetExamQuestions } from '@/hooks/Examshooks/Examshook';
import { Answer } from '@/lib/types/ExamType';
import { ArrowLeft, CheckCircle2, Clock, HelpCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.examId as string;

  const { questions, examInfo, isLoading, error } = useGetExamQuestions(examId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState((examInfo?.duration || 0) * 60);
  const [examStarted, setExamStarted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    if (!examStarted || !examInfo?.duration) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time's up, auto-submit
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted, examInfo?.duration]);

  // Initialize timer when exam info loads
  useEffect(() => {
    if (examInfo?.duration && !examStarted) {
      setTimeLeft(examInfo.duration * 60);
    }
  }, [examInfo?.duration, examStarted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId: string, answerKey: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerKey,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitExam = useCallback(() => {
    // TODO: Implement exam submission logic
    console.log('Submitting exam with answers:', selectedAnswers);
    // router.push(`/exam/${examId}/results`);
  }, [selectedAnswers, examId]);

  const startExam = () => {
    setExamStarted(true);
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

  if (!examStarted) {
    return (
      <div className='min-h-screen bg-gray-50'>
        <div className='max-w-4xl mx-auto p-6'>
          {/* Header */}
          <div className='bg-white rounded-lg shadow-lg p-8 mb-6'>
            <div className='flex items-center space-x-3 mb-6'>
              <button
                onClick={() => router.back()}
                className='p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200'
              >
                <ArrowLeft className='h-5 w-5' />
              </button>
              <h1 className='text-3xl font-bold text-gray-900 font-geist-mono'>
                {examInfo?.title || 'Exam'}
              </h1>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
              <div className='text-center p-4 bg-blue-50 rounded-lg'>
                <Clock className='h-8 w-8 text-blue-600 mx-auto mb-2' />
                <p className='text-sm text-gray-600 font-geist-sans'>Duration</p>
                <p className='text-xl font-bold text-blue-600 font-geist-mono'>
                  {examInfo?.duration} minutes
                </p>
              </div>
              <div className='text-center p-4 bg-green-50 rounded-lg'>
                <HelpCircle className='h-8 w-8 text-green-600 mx-auto mb-2' />
                <p className='text-sm text-gray-600 font-geist-sans'>Questions</p>
                <p className='text-xl font-bold text-green-600 font-geist-mono'>
                  {questions.length}
                </p>
              </div>
              <div className='text-center p-4 bg-purple-50 rounded-lg'>
                <CheckCircle2 className='h-8 w-8 text-purple-600 mx-auto mb-2' />
                <p className='text-sm text-gray-600 font-geist-sans'>Type</p>
                <p className='text-xl font-bold text-purple-600 font-geist-mono'>Single Choice</p>
              </div>
            </div>

            <div className='text-center'>
              <button
                onClick={startExam}
                className='px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 font-geist-mono'
              >
                Start Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-4xl mx-auto p-6'>
        {/* Header */}
        <div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center space-x-3'>
              <button
                onClick={() => router.back()}
                className='p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200'
              >
                <ArrowLeft className='h-5 w-5' />
              </button>
              <h1 className='text-xl font-bold text-gray-900 font-geist-mono'>{examInfo?.title}</h1>
            </div>
            <div className='flex items-center space-x-4'>
              <div className='text-right'>
                <p className='text-sm text-gray-600 font-geist-sans'>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
                <div className='w-32 bg-gray-200 rounded-full h-2'>
                  <div
                    className='bg-blue-600 h-2 rounded-full transition-all duration-300'
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className='flex items-center space-x-2 bg-red-50 px-3 py-2 rounded-lg'>
                <Clock className='h-5 w-5 text-red-600' />
                <span className='text-red-600 font-bold font-geist-mono'>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Question */}
        {currentQuestion && (
          <div className='bg-white rounded-lg shadow-lg p-8 mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 mb-8 font-geist-mono'>
              {currentQuestion.question}
            </h2>

            <div className='space-y-4'>
              {currentQuestion.answers.map((answer: Answer) => (
                <label
                  key={answer.key}
                  className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                    selectedAnswers[currentQuestion._id] === answer.key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                >
                  <input
                    type='radio'
                    name={`question-${currentQuestion._id}`}
                    value={answer.key}
                    checked={selectedAnswers[currentQuestion._id] === answer.key}
                    onChange={() => handleAnswerSelect(currentQuestion._id, answer.key)}
                    className='sr-only'
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestion._id] === answer.key
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedAnswers[currentQuestion._id] === answer.key && (
                      <div className='w-2 h-2 bg-white rounded-full'></div>
                    )}
                  </div>
                  <span className='text-lg text-gray-700 font-geist-sans'>{answer.answer}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className='bg-white rounded-lg shadow-lg p-6'>
          <div className='flex items-center justify-between'>
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                currentQuestionIndex === 0
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              } font-geist-mono`}
            >
              Previous
            </button>

            <div className='flex items-center space-x-4'>
              {currentQuestionIndex === questions.length - 1 ? (
                <button
                  onClick={handleSubmitExam}
                  className='px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 font-geist-mono'
                >
                  Submit Exam
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className='px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 font-geist-mono'
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
