'use client';

import QuestionCard from '@/components/exams/QuestionCard';
import { Question } from '@/lib/types/ExamType';
import { useState } from 'react';

// Sample questions for demo
const sampleQuestions: Question[] = [
  {
    _id: '1',
    question: 'What does CSS stand for?',
    answers: [
      { answer: 'Computer Style Sheets', key: 'A' },
      { answer: 'Creative Style Sheets', key: 'B' },
      { answer: 'Cascading Style Sheets', key: 'C' },
      { answer: 'Colorful Style Sheets', key: 'D' },
    ],
    type: 'single_choice',
    correct: 'C',
    subject: 'Frontend Development',
    exam: {
      _id: 'css-quiz',
      title: 'CSS Quiz',
      duration: 30,
      subject: 'Frontend Development',
      numberOfQuestions: 25,
      active: true,
      createdAt: '2024-01-01T00:00:00.000Z',
    },
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    _id: '2',
    question: 'Which CSS property controls the text size?',
    answers: [
      { answer: 'font-style', key: 'A' },
      { answer: 'font-size', key: 'B' },
      { answer: 'text-size', key: 'C' },
      { answer: 'text-style', key: 'D' },
    ],
    type: 'single_choice',
    correct: 'B',
    subject: 'Frontend Development',
    exam: {
      _id: 'css-quiz',
      title: 'CSS Quiz',
      duration: 30,
      subject: 'Frontend Development',
      numberOfQuestions: 25,
      active: true,
      createdAt: '2024-01-01T00:00:00.000Z',
    },
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    _id: '3',
    question: 'How do you add a background color for all <h1> elements?',
    answers: [
      { answer: 'h1 {background-color:#FFFFFF;}', key: 'A' },
      { answer: 'h1.all {background-color:#FFFFFF;}', key: 'B' },
      { answer: 'all.h1 {background-color:#FFFFFF;}', key: 'C' },
      { answer: 'h1 {bgcolor:#FFFFFF;}', key: 'D' },
    ],
    type: 'single_choice',
    correct: 'A',
    subject: 'Frontend Development',
    exam: {
      _id: 'css-quiz',
      title: 'CSS Quiz',
      duration: 30,
      subject: 'Frontend Development',
      numberOfQuestions: 25,
      active: true,
      createdAt: '2024-01-01T00:00:00.000Z',
    },
    createdAt: '2024-01-01T00:00:00.000Z',
  },
];

export default function DemoPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const timeLeft = 1800; // 30 minutes - static for demo

  const currentQuestion = sampleQuestions[currentQuestionIndex];

  const handleAnswerSelect = (questionId: string, answerKey: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerKey,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-6xl mx-auto p-6'>
        {/* Demo Header */}
        <div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>Question Design Demo</h1>
          <p className='text-gray-600'>
            This is a demo showcasing the question design that matches your requirements. Navigate
            through the questions to see the design in action.
          </p>
        </div>

        {/* Question Card */}
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={sampleQuestions.length}
          selectedAnswer={selectedAnswers[currentQuestion._id]}
          onAnswerSelect={handleAnswerSelect}
          onNext={handleNext}
          onPrevious={handlePrevious}
          canGoPrevious={currentQuestionIndex > 0}
          isLastQuestion={currentQuestionIndex === sampleQuestions.length - 1}
          timeLeft={timeLeft}
          examTitle='CSS Quiz'
          subject='Frontend Development'
        />

        {/* Demo Controls */}
        <div className='bg-white rounded-lg shadow-lg p-6 mt-6'>
          <h2 className='text-lg font-semibold text-gray-900 mb-4'>Demo Controls</h2>
          <div className='flex items-center space-x-4'>
            <button
              onClick={() => setCurrentQuestionIndex(0)}
              className='px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700'
            >
              First Question
            </button>
            <button
              onClick={() => setCurrentQuestionIndex(1)}
              className='px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700'
            >
              Second Question
            </button>
            <button
              onClick={() => setCurrentQuestionIndex(2)}
              className='px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700'
            >
              Third Question
            </button>
          </div>
          <div className='mt-4 p-4 bg-blue-50 rounded-lg'>
            <p className='text-sm text-blue-800'>
              <strong>Current Answers:</strong> {JSON.stringify(selectedAnswers, null, 2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
