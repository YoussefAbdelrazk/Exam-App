'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCheckQuestions } from '@/hooks/Examshooks/Examshook';
import { CheckQuestionsRequest, QuestionSubmission } from '@/lib/types/ExamType';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

interface QuestionSubmitterProps {
  examId: string;
  questions: Array<{ _id: string; question: string }>;
  userAnswers: Record<string, string>;
  onSubmit: () => void;
}

export default function QuestionSubmitter({
  examId,
  questions,
  userAnswers,
  onSubmit,
}: QuestionSubmitterProps) {
  const { checkQuestions, isLoading, error, results } = useCheckQuestions();
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = async () => {
    try {
      const submissions: QuestionSubmission[] = questions.map(question => ({
        questionId: question._id,
        selectedAnswer: userAnswers[question._id] || '',
      }));

      const requestData: CheckQuestionsRequest = {
        examId,
        submissions,
      };

      await checkQuestions(requestData);
      setShowResults(true);
      onSubmit();
    } catch (err) {
      console.error('Failed to submit questions:', err);
    }
  };

  const getAnswerStatus = (questionId: string) => {
    if (!results) return null;
    return results.answers.find(answer => answer.questionId === questionId);
  };

  const calculateScore = () => {
    if (!results) return { score: 0, total: 0, percentage: 0 };

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

  if (showResults && results) {
    const { score, total, percentage } = calculateScore();

    return (
      <div className='space-y-6'>
        <Card className='bg-green-50 border-green-200'>
          <CardHeader>
            <CardTitle className='text-green-800 flex items-center gap-2'>
              <CheckCircle className='h-6 w-6' />
              Exam Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-3 gap-4 text-sm'>
              <div>
                <span className='font-medium'>Score:</span> {score}/{total}
              </div>
              <div>
                <span className='font-medium'>Percentage:</span> {percentage}%
              </div>
              <div>
                <span className='font-medium'>Time:</span> {results.time}s
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Question Results</h3>
          {questions.map((question, index) => {
            const correctAnswer = getAnswerStatus(question._id);
            const userAnswer = userAnswers[question._id];
            const isCorrect = correctAnswer && userAnswer === correctAnswer.correct;

            if (!correctAnswer) return null;

            return (
              <Card
                key={question._id}
                className={isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}
              >
                <CardContent className='pt-6'>
                  <div className='flex items-start gap-3'>
                    <div className='flex-shrink-0 mt-1'>
                      {isCorrect ? (
                        <CheckCircle className='h-5 w-5 text-green-600' />
                      ) : (
                        <XCircle className='h-5 w-5 text-red-600' />
                      )}
                    </div>
                    <div className='flex-1'>
                      <p className='font-medium mb-2'>
                        Question {index + 1}: {question.question}
                      </p>
                      <div className='text-sm space-y-1'>
                        <p>
                          <span className='font-medium'>Your Answer:</span>{' '}
                          {userAnswer || 'Not answered'}
                        </p>
                        <p>
                          <span className='font-medium'>Correct Answer:</span>{' '}
                          {correctAnswer.correct}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <Card className='bg-blue-50 border-blue-200'>
      <CardHeader>
        <CardTitle className='text-blue-800 flex items-center gap-2'>
          <AlertCircle className='h-6 w-6' />
          Submit Exam
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-blue-700 mb-4'>
          You have answered {Object.keys(userAnswers).length} out of {questions.length} questions.
        </p>

        {error && (
          <div className='bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-4'>
            {error}
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={isLoading || Object.keys(userAnswers).length === 0}
          className='w-full'
        >
          {isLoading ? 'Submitting...' : 'Submit Exam'}
        </Button>
      </CardContent>
    </Card>
  );
}
