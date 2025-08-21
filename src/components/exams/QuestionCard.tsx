'use client';

import Header from '@/components/layout/Header';
import { Answer, Question } from '@/lib/types/ExamType';
import { ArrowLeft, ArrowRight, CircleQuestionMark, Clock } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: string;
  onAnswerSelect: (questionId: string, answerKey: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoPrevious: boolean;
  isLastQuestion: boolean;
  timeLeft: number;
  examTitle: string;
  subject: string;
}

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrevious,
  canGoPrevious,
  isLastQuestion,
  timeLeft,
  examTitle,
}: QuestionCardProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Breadcrumbs */}
      <div className='max-w-6xl mx-auto p-6'>
        {/* Header */}
        <Header title={examTitle} icon={<CircleQuestionMark />} />

        <div className='flex items-center justify-between text-gray-500 mt-12'>
          <div className='text-sm  mb-4'> {examTitle} </div>
          <div className='text-right mb-6'>
            <span className='text-lg font-medium '>
              Question {questionNumber} of {totalQuestions}
            </span>
          </div>
        </div>

        {/* Question Card */}
        <div className='bg-white rounded-lg shadow-lg p-8 mb-6 relative'>
          {/* Question */}
          <h2 className='text-2xl font-semibold text-blue-600 mb-8 pr-16 font-geist-mono'>
            {question.question}
          </h2>

          {/* Answer Options */}
          <div className='space-y-4 mb-8'>
            {question.answers.map((answer: Answer) => (
              <label
                key={answer.key}
                className={`flex items-center space-x-4 p-4 border-1  cursor-pointer transition-all duration-200 bg-gray-50 hover:bg-gray-100 ${
                  selectedAnswer === answer.key ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <input
                  type='radio'
                  name={`question-${question._id}`}
                  value={answer.key}
                  checked={selectedAnswer === answer.key}
                  onChange={() => onAnswerSelect(question._id, answer.key)}
                  className='sr-only'
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === answer.key
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedAnswer === answer.key && (
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  )}
                </div>
                <span className='text-lg text-gray-700'>{answer.answer}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation and Timer */}
        <div className='bg-white rounded-lg shadow-lg p-6'>
          <div className='flex items-center gap-4 justify-between'>
            <button
              onClick={onPrevious}
              disabled={!canGoPrevious}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 w-full justify-center ${
                canGoPrevious
                  ? 'bg-gray-600 text-white hover:bg-gray-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ArrowLeft className='h-4 w-4' />
              <span>Previous</span>
            </button>

            {/* Timer */}
            <div className='flex items-center space-x-2 bg-blue-100 p-3 rounded-full'>
              <Clock className='h-5 w-5 text-blue-600' />
              <span className='text-blue-600 font-bold text-lg'>{formatTime(timeLeft)}</span>
            </div>

            {/* Next/Submit Button */}
            <button
              onClick={onNext}
              className='px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 w-full justify-center'
            >
              <span>{isLastQuestion ? 'Submit' : 'Next'}</span>
              {!isLastQuestion && <ArrowRight className='h-4 w-4' />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
