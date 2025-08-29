import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface ExamErrorProps {
  message: string;
  onGoBack: () => void;
}

export default function ExamError({ message, onGoBack }: ExamErrorProps) {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
      <div className='text-center'>
        <div className='mb-4'>
          <AlertCircle className='h-16 w-16 text-red-500 mx-auto' />
        </div>
        <p className='text-red-500 text-lg mb-6'>{message}</p>
        <Button onClick={onGoBack} variant='default' size='lg'>
          Go Back
        </Button>
      </div>
    </div>
  );
}
