export interface ExamType {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
}

export interface ExamResponse {
  message: string;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  exams: ExamType[];
}

// New types for exam questions
export interface Answer {
  answer: string;
  key: string;
}

export interface Question {
  _id: string;
  question: string;
  answers: Answer[];
  type: 'single_choice' | 'multiple_choice';
  correct: string;
  subject: string | null;
  exam: {
    _id: string;
    title: string;
    duration: number;
    subject: string;
    numberOfQuestions: number;
    active: boolean;
    createdAt: string;
  };
  createdAt: string;
}

export interface ExamQuestionsResponse {
  message: string;
  questions: Question[];
}

// New types for question checking
export interface QuestionSubmission {
  questionId: string;
  selectedAnswer: string;
}

export interface CheckQuestionsRequest {
  examId: string;
  submissions: QuestionSubmission[];
}

export interface QuestionAnswer {
  questionId: string;
  correct: string;
}

export interface CheckQuestionsResponse {
  answers: QuestionAnswer[];
  time: number;
}
