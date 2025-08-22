import { ExamType } from '@/lib/types/ExamType';
import { Clock, FileText, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ExamCardProps {
  exam: ExamType;
  onStartExam?: (examId: string) => void;
}

export default function ExamCard({ exam, onStartExam }: ExamCardProps) {
  const router = useRouter();

  const handleStartExam = () => {
    if (onStartExam) {
      onStartExam(exam._id);
    } else {
      router.push(`/exam/${exam._id}`);
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100'>
      <div className='p-6'>
        {/* Header */}
        <div className='flex items-start justify-between mb-4'>
          <h3 className='text-xl font-bold text-gray-900 font-geist-mono'>{exam.title}</h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              exam.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {exam.active ? 'Active' : 'Inactive'}
          </span>
        </div>

        {/* Exam Details */}
        <div className='grid grid-cols-2 gap-4 mb-6'>
          <div className='flex items-center space-x-2'>
            <Clock className='h-4 w-4 text-blue-600' />
            <span className='text-sm text-gray-600 font-geist-sans'>{exam.duration} min</span>
          </div>
          <div className='flex items-center space-x-2'>
            <FileText className='h-4 w-4 text-green-600' />
            <span className='text-sm text-gray-600 font-geist-sans'>
              {exam.numberOfQuestions} questions
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleStartExam}
          disabled={!exam.active}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 ${
            exam.active
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Play className='h-4 w-4' />
          <span>{exam.active ? 'Start Exam' : 'Exam Unavailable'}</span>
        </button>
      </div>
    </div>
  );
}
