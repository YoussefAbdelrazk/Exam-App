import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft, CheckCircle2, Clock } from 'lucide-react';

interface ExamIntroProps {
  examTitle: string;
  subject: string;
  duration: number;
  questionCount: number;
  onStart: () => void;
  onGoBack: () => void;
}

export default function ExamIntro({
  examTitle,

  duration,
  questionCount,
  onStart,
  onGoBack,
}: ExamIntroProps) {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-4xl mx-auto p-6'>
        <Card className='shadow-lg'>
          <CardHeader className='pb-6'>
            <div className='flex items-center space-x-3 mb-6'>
              <Button
                onClick={onGoBack}
                variant='ghost'
                size='sm'
                className='p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200'
              >
                <ArrowLeft className='h-5 w-5' />
              </Button>
              <CardTitle className='text-3xl font-bold text-gray-900'>{examTitle}</CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
              <div className='text-center p-4 bg-blue-50 rounded-lg'>
                <Clock className='h-8 w-8 text-blue-600 mx-auto mb-2' />
                <p className='text-sm text-gray-600'>Duration</p>
                <p className='text-xl font-bold text-blue-600'>{duration} minutes</p>
              </div>
              <div className='text-center p-4 bg-green-50 rounded-lg'>
                <CheckCircle2 className='h-8 w-8 text-green-600 mx-auto mb-2' />
                <p className='text-sm text-gray-600'>Questions</p>
                <p className='text-xl font-bold text-green-600'>{questionCount}</p>
              </div>
              <div className='text-center p-4 bg-purple-50 rounded-lg'>
                <AlertCircle className='h-8 w-8 text-purple-600 mx-auto mb-2' />
                <p className='text-sm text-gray-600'>Type</p>
                <p className='text-xl font-bold text-purple-600'>Single Choice</p>
              </div>
            </div>

            <div className='text-center'>
              <Button onClick={onStart} size='lg' className='px-8 py-4 text-lg font-semibold'>
                Start Exam
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
