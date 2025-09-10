'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckQuestionsResponse, Question } from '@/lib/types/ExamType';

interface ExamResultsProps {
  questions: Question[];
  userAnswers: Record<string, string>;
  results: CheckQuestionsResponse;
  examTitle: string;
  onGoBack: () => void;
}

export default function ExamResults({
  questions,
  userAnswers,
  results,

  onGoBack,
}: ExamResultsProps) {
  const calculateScore = () => {
    let correctCount = 0;
    const total = questions.length;

    questions.forEach(question => {
      const correctAnswer = results.answers.find(a => a.questionId === question._id);
      const userAnswer = userAnswers[question._id];

      if (correctAnswer && userAnswer === correctAnswer.correct) {
        correctCount++;
      }
    });

    return {
      score: correctCount,
      total,
      percentage: Math.round((correctCount / total) * 100),
    };
  };

  const { score, total, percentage } = calculateScore();
  const incorrectCount = total - score;


  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const correctPercentage = (score / total) * 100;
  const correctDash = (correctPercentage / 100) * circumference;
  const incorrectDash = circumference - correctDash;

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto p-6'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* card */}
          <div className='lg:col-span-1'>
            <Card className='h-fit'>
              <CardHeader>
                {/* card title */}
                <CardTitle className='text-blue-600 font-mono text-xl'>Results:</CardTitle>
              </CardHeader>
              <CardContent className='text-center'>
                {/* svg */}
                <div className='relative inline-block mb-6'>
                  <svg width='200' height='200' className='transform -rotate-90'>
                    {/* correct circle */}
                    <circle
                      cx='100'
                      cy='100'
                      r={radius}
                      fill='none'
                      stroke='#e5e7eb'
                      strokeWidth='16'
                    />

                    {/* incorrect circle */}
                    <circle
                      cx='100'
                      cy='100'
                      r={radius}
                      fill='none'
                      stroke='#10b981'
                      strokeWidth='16'
                      strokeDasharray={`${correctDash} ${circumference}`}
                      strokeLinecap='round'
                      className='transition-all duration-1000 ease-out'
                    />

                    {/* incorrect circle */}
                    {incorrectCount > 0 && (
                      <circle
                        cx='100'
                        cy='100'
                        r={radius}
                        fill='none'
                        stroke='#ef4444'
                        strokeWidth='16'
                        strokeDasharray={`${incorrectDash} ${circumference}`}
                        strokeDashoffset={-correctDash}
                        strokeLinecap='round'
                        className='transition-all duration-1000 ease-out'
                      />
                    )}
                  </svg>

                  {/* score */}
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='text-center'>
                      <div className='text-3xl font-bold text-gray-800'>{percentage}%</div>
                      <div className='text-sm text-gray-500'>Score</div>
                    </div>
                  </div>
                </div>

                {/* correct and incorrect */}
                <div className='space-y-3'>
                  <div className='flex items-center justify-center space-x-2'>
                    <div className='w-4 h-4 bg-green-500 rounded'></div>
                    <span className='text-sm font-medium'>Correct: {score}</span>
                  </div>
                  <div className='flex items-center justify-center space-x-2'>
                    <div className='w-4 h-4 bg-red-500 rounded'></div>
                    <span className='text-sm font-medium'>Incorrect: {incorrectCount}</span>
                  </div>
                </div>

                {/* total questions, correct answers, incorrect answers, accuracy */}
                <div className='mt-6 space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span>Total Questions:</span>
                    <span className='font-medium'>{total}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Correct Answers:</span>
                    <span className='font-medium text-green-600'>{score}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Incorrect Answers:</span>
                    <span className='font-medium text-red-600'>{incorrectCount}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Accuracy:</span>
                    <span className='font-medium text-blue-600'>{percentage}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className='mt-6 flex justify-center'>
          {/* back to exams button */}
          <Button
            onClick={onGoBack}
            className='px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200'
          >
            Back to Exams
          </Button>
        </div>
      </div>
    </div>
  );
}
