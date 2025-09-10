import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Question } from '@/lib/types/ExamType';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';

interface ExamSummaryProps {
  questions: Question[];
  answers: Record<string, string>;
  timeLeft: number;
  onContinue: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  onGoToQuestion: (index: number) => void;
}

export default function ExamSummary({
  questions,
  answers,
  timeLeft,
  onContinue,
  onSubmit,
  isSubmitting,
  onGoToQuestion,
}: ExamSummaryProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getAnsweredQuestionsCount = () => {
    return Object.keys(answers).length;
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-4xl mx-auto p-6'>
        {/* card */}
        <Card className='shadow-lg mb-6'>
          <CardHeader>
            <div className='flex items-center justify-between mb-4'>
              {/* card title */}
              <CardTitle className='text-2xl font-bold text-gray-900'>Exam Summary</CardTitle>
              {/* time */}
              <div className='flex items-center space-x-2 bg-blue-100 p-3 rounded-full'>
                <Clock className='h-5 w-5 text-blue-600' />
                <span className='text-blue-600 font-bold text-lg'>{formatTime(timeLeft)}</span>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className='shadow-lg mb-6'>
          <CardHeader>
            {/* card title */}
            <CardTitle className='text-xl font-semibold text-gray-900'>Progress Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {/* grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* answered */}
              <div className='text-center p-4 bg-green-50 rounded-lg'>
                <CheckCircle2 className='h-8 w-8 text-green-600 mx-auto mb-2' />
                <p className='text-sm text-gray-600'>Answered</p>
                <p className='text-2xl font-bold text-green-600'>{getAnsweredQuestionsCount()}</p>
              </div>
              {/* unanswered */}
              <div className='text-center p-4 bg-red-50 rounded-lg'>
                <AlertCircle className='h-8 w-8 text-red-600 mx-auto mb-2' />
                <p className='text-sm text-gray-600'>Unanswered</p>
                <p className='text-2xl font-bold text-red-600'>
                  {questions.length - getAnsweredQuestionsCount()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='shadow-lg mb-6'>
          <CardHeader>
            {/* card title */}
            <CardTitle className='text-xl font-semibold text-gray-900'>Questions Review</CardTitle>
          </CardHeader>
          <CardContent>
            {/* space */}
            <div className='space-y-3'>
              {questions.map((question, index) => (
                <div
                  key={question._id}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    answers[question._id]
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                  onClick={() => onGoToQuestion(index)}
                >
                  <div className='flex items-center space-x-3'>
                    {/* question */}
                    <span className='text-lg font-medium text-gray-700'>Question {index + 1}</span>
                    <span className='text-sm text-gray-500'>
                      {question.question.substring(0, 50)}...
                    </span>
                  </div>
                  {/* answers */}
                  <div className='flex items-center space-x-2'>
                    {/* check circle */}
                    {answers[question._id] ? (
                      <CheckCircle2 className='h-5 w-5 text-green-600' />
                    ) : (
                      <AlertCircle className='h-5 w-5 text-red-600' />
                    )}
                    {/* answered or unanswered */}
                    <span
                      className={`text-sm font-medium ${
                        answers[question._id] ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {answers[question._id] ? 'Answered' : 'Unanswered'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className='shadow-lg'>
          <CardContent className='pt-6'>
            {/* flex */}
            <div className='flex items-center justify-between'>
              {/* continue button */}
              <Button onClick={onContinue} variant='outline' size='lg'>
                Continue Exam
              </Button>
              {/* submit button */}
              <Button
                onClick={onSubmit}
                disabled={isSubmitting}
                size='lg'
                className='bg-green-600 hover:bg-green-700'
              >
                {isSubmitting ? 'Submitting...' : 'Submit Exam'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
