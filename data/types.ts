export type UserRole = 'student' | 'editor' | 'reviewer' | 'admin' | 'superadmin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  currentExam: string;
  currentProgramme: string;
  createdAt: string;
}

export type YearStatus = 'active' | 'prepared' | 'hidden' | 'archived';

export interface YearConfig {
  year: string;
  status: YearStatus;
  releaseRequiresAdminApproval: boolean;
  releasedAt?: string;
  approvedBy?: string;
  archivedAt?: string;
}

export interface SystemConfig {
  appName: string;
  activeYear: string;
  studentVisibleYears: string[];
  futureYears: Record<string, { status: YearStatus; release_requires_admin_approval: boolean }>;
  rolloverPolicy: {
    defaultMode: string;
    archivePreviousYear: boolean;
    permanentlyDeletePreviousQuestions: boolean;
    preserveStudentAccounts: boolean;
    preserveAttemptHistory: boolean;
    invalidateActiveYearCache: boolean;
    requireBackupBeforeRollover: boolean;
    requireContentCompletenessCheck: boolean;
    requireReviewerApproval: boolean;
    auditLogRequired: boolean;
    rollbackSupported: boolean;
  };
  contentDisclaimer: string;
}

export interface QuestionItem {
  id: string;
  releaseYear: string;
  examFamily: string; // 'BECE' | 'WASSCE School' | 'WASSCE Private 1st Series' | 'WASSCE Private 2nd Series'
  subjectId: string;
  topic: string;
  syllabusRef?: string;
  stem: string;
  options: [string, string, string, string]; // exactly 4 options A, B, C, D
  answerIndex: number; // 0, 1, 2, 3
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  marks: number;
  status: 'draft' | 'in_review' | 'approved' | 'published' | 'rejected';
  reviewedBy?: string;
  reviewNotes?: string;
  version: number;
  createdAt: string;
}

export interface AttemptAnswerRecord {
  questionId: string;
  selectedOption: number;
  correctOption: number;
  isCorrect: boolean;
}

export interface QuizAttemptRecord {
  id: string;
  userId: string;
  userName: string;
  releaseYear: string;
  examFamily: string;
  subjectId: string;
  subjectName: string;
  mode: 'practice' | 'mock';
  startedAt: string;
  submittedAt: string;
  durationSeconds: number;
  score: number;
  totalQuestions: number;
  percentage: number;
  answers: AttemptAnswerRecord[];
}

export interface AuditLogEntry {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  targetType: 'year_rollover' | 'question_review' | 'question_edit' | 'content_publish' | 'backup' | 'system_restore';
  targetId: string;
  timestamp: string;
  details: string;
}
