// User Types
export type UserRole = 'admin' | 'student';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Student Types
export interface Student {
  id: string;
  userId: string;
  studentId: string;
  barcode: string;
  class: string;
  parentName: string;
  parentPhone: string;
  birthDate?: Date;
  joinDate: Date;
  status: 'active' | 'inactive';
}

// Attendance Types
export interface Attendance {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  time: string;
  status: 'present' | 'late' | 'absent';
  location?: {
    latitude: number;
    longitude: number;
  };
  notes?: string;
}

// Material Types
export interface Material {
  id: string;
  title: string;
  description: string;
  content: string;
  images: string[];
  category: string;
  grade: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

// Question Types
export interface Question {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string | number;
  type: 'multiple_choice' | 'essay' | 'fill_blank';
  category: string;
  grade: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

// Exam Types
export interface Exam {
  id: string;
  title: string;
  description: string;
  questions: string[];
  duration: number;
  startTime: Date;
  endTime: Date;
  grade: string;
  status: 'draft' | 'published' | 'completed';
}

export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  answers: Answer[];
  score: number;
  completedAt: Date;
}

export interface Answer {
  questionId: string;
  answer: string | number;
}

// Game Types
export interface Game {
  id: string;
  title: string;
  type: 'quiz' | 'memory' | 'puzzle' | 'math';
  description: string;
  icon: string;
  color: string;
}

export interface GameScore {
  id: string;
  gameId: string;
  studentId: string;
  studentName: string;
  score: number;
  playedAt: Date;
}

// Payment Types
export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  month: string;
  year: number;
  amount: number;
  status: 'pending' | 'paid';
  paidAt?: Date;
  notes?: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalStudents: number;
  todayAttendance: number;
  totalMaterials: number;
  totalExams: number;
  pendingPayments: number;
}

// Categories
export const CATEGORIES = [
  { value: 'matematika', label: 'Matematika', icon: '📐' },
  { value: 'bahasa_indonesia', label: 'Bahasa Indonesia', icon: '📖' },
  { value: 'bahasa_inggris', label: 'Bahasa Inggris', icon: '🔤' },
  { value: 'ipa', label: 'IPA', icon: '🔬' },
  { value: 'ips', label: 'IPS', icon: '🌍' },
  { value: 'ppkn', label: 'PPKn', icon: '🇮🇩' },
] as const;

export const GRADES = [
  { value: '1', label: 'Kelas 1' },
  { value: '2', label: 'Kelas 2' },
  { value: '3', label: 'Kelas 3' },
  { value: '4', label: 'Kelas 4' },
  { value: '5', label: 'Kelas 5' },
  { value: '6', label: 'Kelas 6' },
] as const;

export const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
] as const;
