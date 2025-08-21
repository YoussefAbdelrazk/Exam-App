'use client';

import { Question } from '@/lib/types/ExamType';
import { AlertCircle, ArrowLeft, CheckCircle2, Clock } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import QuestionCard from './QuestionCard';

interface ExamFormProps {
  questions: Question[];
  examTitle: string;
  subject: string;
  duration: number;
  onExamComplete: (answers: Record<string, string>) => void;
  onGoBack: () => void;
}

export default function ExamForm({
  questions,
  examTitle,
  subject,
  duration,
  onExamComplete,
  onGoBack,
}: ExamFormProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [examStarted, setExamStarted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmitExam = useCallback(() => {
    setExamSubmitted(true);
    onExamComplete(answers);
  }, [answers, onExamComplete]);

  // Timer effect
  useEffect(() => {
    if (!examStarted || examSubmitted) return;

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
  }, [examStarted, examSubmitted, handleSubmitExam]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId: string, answerKey: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerKey,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex === questions.length - 1) {
      // Last question, show summary
      setShowSummary(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const startExam = () => {
    setExamStarted(true);
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setShowSummary(false);
  };

  const getAnsweredQuestionsCount = () => {
    return Object.keys(answers).length;
  };

  // const getUnansweredQuestions = () => {
  //   return questions.filter(q => !answers[q._id]);
  // };

  if (!examStarted) {
    return (
      <div className='min-h-screen bg-gray-50'>
        <div className='max-w-4xl mx-auto p-6'>
          {/* Header */}
          <div className='bg-white rounded-lg shadow-lg p-8 mb-6'>
            <div className='flex items-center space-x-3 mb-6'>
              <button
                onClick={onGoBack}
                className='p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200'
              >
                <ArrowLeft className='h-5 w-5' />
              </button>
              <h1 className='text-3xl font-bold text-gray-900'>{examTitle}</h1>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
              <div className='text-center p-4 bg-blue-50 rounded-lg'>
                <Clock className='h-8 w-8 text-blue-600 mx-auto mb-2' />
                <p className='text-sm text-gray-600'>Duration</p>
                <p className='text-xl font-bold text-blue-600'>{duration} minutes</p>
              </div>
              <div className='text-center p-4 bg-green-50 rounded-lg'>
                <CheckCircle2 className='h-8 w-8 text-green-600 mx-auto mb-2' />
                <p className='text-sm text-gray-600'>Questions</p>
                <p className='text-xl font-bold text-green-600'>{questions.length}</p>
              </div>
              <div className='text-center p-4 bg-purple-50 rounded-lg'>
                <AlertCircle className='h-8 w-8 text-purple-600 mx-auto mb-2' />
                <p className='text-sm text-gray-600'>Type</p>
                <p className='text-xl font-bold text-purple-600'>Single Choice</p>
              </div>
            </div>

            <div className='text-center'>
              <button
                onClick={startExam}
                className='px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200'
              >
                Start Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showSummary) {
    return (
      <div className='min-h-screen bg-gray-50'>
        <div className='max-w-4xl mx-auto p-6'>
          {/* Header */}
          <div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
            <div className='flex items-center justify-between mb-4'>
              <h1 className='text-2xl font-bold text-gray-900'>Exam Summary</h1>
              <div className='flex items-center space-x-2 bg-blue-100 p-3 rounded-full'>
                <Clock className='h-5 w-5 text-blue-600' />
                <span className='text-blue-600 font-bold text-lg'>{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>Progress Overview</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='text-center p-4 bg-green-50 rounded-lg'>
                <CheckCircle2 className='h-8 w-8 text-green-600 mx-auto mb-2' />
                <p className='text-sm text-gray-600'>Answered</p>
                <p className='text-2xl font-bold text-green-600'>{getAnsweredQuestionsCount()}</p>
              </div>
              <div className='text-center p-4 bg-red-50 rounded-lg'>
                <AlertCircle className='h-8 w-8 text-red-600 mx-auto mb-2' />
                <p className='text-sm text-gray-600'>Unanswered</p>
                <p className='text-2xl font-bold text-red-600'>
                  {questions.length - getAnsweredQuestionsCount()}
                </p>
              </div>
            </div>
          </div>

          {/* Questions List */}
          <div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>Questions Review</h2>
            <div className='space-y-3'>
              {questions.map((question, index) => (
                <div
                  key={question._id}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    answers[question._id]
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                  onClick={() => goToQuestion(index)}
                >
                  <div className='flex items-center space-x-3'>
                    <span className='text-lg font-medium text-gray-700'>Question {index + 1}</span>
                    <span className='text-sm text-gray-500'>
                      {question.question.substring(0, 50)}...
                    </span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    {answers[question._id] ? (
                      <CheckCircle2 className='h-5 w-5 text-green-600' />
                    ) : (
                      <AlertCircle className='h-5 w-5 text-red-600' />
                    )}
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
          </div>

          {/* Action Buttons */}
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <div className='flex items-center justify-between'>
              <button
                onClick={() => setShowSummary(false)}
                className='px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200'
              >
                Continue Exam
              </button>
              <button
                onClick={handleSubmitExam}
                className='px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200'
              >
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (examSubmitted) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='bg-white rounded-lg shadow-lg p-8 text-center max-w-md'>
          <CheckCircle2 className='h-16 w-16 text-green-600 mx-auto mb-4' />
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>Exam Submitted!</h1>
          <p className='text-gray-600 mb-6'>
            Your exam has been successfully submitted. You will receive your results shortly.
          </p>
          <button
            onClick={onGoBack}
            className='px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200'
          >
            Back to Exams
          </button>
        </div>
      </div>
    );
  }

  return (
    <QuestionCard
      question={currentQuestion}
      questionNumber={currentQuestionIndex + 1}
      totalQuestions={questions.length}
      selectedAnswer={answers[currentQuestion._id]}
      onAnswerSelect={handleAnswerSelect}
      onNext={handleNext}
      onPrevious={handlePrevious}
      canGoPrevious={currentQuestionIndex > 0}
      isLastQuestion={currentQuestionIndex === questions.length - 1}
      timeLeft={timeLeft}
      examTitle={examTitle}
      subject={subject}
    />
  );
}
