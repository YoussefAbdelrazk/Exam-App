'use client';

import { useCheckQuestions } from '@/hooks/Examshooks/Examshook';
import { CheckQuestionsResponse, Question } from '@/lib/types/ExamType';
import { useCallback, useEffect, useState } from 'react';
import ExamIntro from './ExamIntro';
import ExamResults from './ExamResults';
import ExamSummary from './ExamSummary';
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
  const [results, setResults] = useState<CheckQuestionsResponse | null>(null);
  const [examStartTime, setExamStartTime] = useState<number | null>(null);

  const { checkQuestions, isLoading: isCheckingAnswers } = useCheckQuestions();

  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmitExam = useCallback(async () => {
    setExamSubmitted(true);

    try {
      // Calculate time taken
      const timeTaken = examStartTime ? Math.round((Date.now() - examStartTime) / 1000) : 0;

      // Submit answers to check questions API
      const response = await checkQuestions({
        examId: questions[0]?.exam._id || '',
        submissions: questions.map(question => ({
          questionId: question._id,
          selectedAnswer: answers[question._id] || '',
        })),
      });

      // Override the time from API with our calculated time
      const resultsWithTime = {
        ...response,
        time: timeTaken,
      };

      setResults(resultsWithTime);
      onExamComplete(answers);
    } catch (error) {
      console.error('Failed to check answers:', error);
      // Still show submitted state even if checking fails
      setResults({
        answers: [],
        time: examStartTime ? Math.round((Date.now() - examStartTime) / 1000) : 0,
      });
    }
  }, [answers, onExamComplete, questions, checkQuestions, examStartTime]);

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
    setExamStartTime(Date.now());
  };

  // Show results if exam is submitted and we have results
  if (examSubmitted && results) {
    return (
      <ExamResults
        questions={questions}
        userAnswers={answers}
        results={results}
        examTitle={examTitle}
        onGoBack={onGoBack}
      />
    );
  }

  if (!examStarted) {
    return (
      <ExamIntro
        examTitle={examTitle}
        subject={subject}
        duration={duration}
        questionCount={questions.length}
        onStart={startExam}
        onGoBack={onGoBack}
      />
    );
  }

  if (showSummary) {
    return (
      <ExamSummary
        questions={questions}
        answers={answers}
        timeLeft={timeLeft}
        onContinue={() => setShowSummary(false)}
        onSubmit={handleSubmitExam}
        isSubmitting={isCheckingAnswers}
        onGoToQuestion={index => {
          setCurrentQuestionIndex(index);
          setShowSummary(false);
        }}
      />
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
