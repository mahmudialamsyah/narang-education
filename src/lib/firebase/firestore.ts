import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  Timestamp,
  addDoc
} from 'firebase/firestore';
import { db } from './config';

// ============ ATTENDANCE ============
export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  time: string;
  status: 'present' | 'late' | 'absent';
  location?: { lat: number; lng: number };
  notes?: string;
}

export async function recordAttendance(data: Omit<AttendanceRecord, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'attendance'), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getAttendanceByDate(date: string): Promise<AttendanceRecord[]> {
  const q = query(collection(db, 'attendance'), where('date', '==', date));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AttendanceRecord));
}

export async function getStudentAttendance(studentId: string): Promise<AttendanceRecord[]> {
  const q = query(
    collection(db, 'attendance'), 
    where('studentId', '==', studentId),
    orderBy('date', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AttendanceRecord));
}

// ============ MATERIALS ============
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

export async function getMaterials(grade?: string, category?: string): Promise<Material[]> {
  let q = query(collection(db, 'materials'), orderBy('createdAt', 'desc'));
  
  const snapshot = await getDocs(q);
  let materials = snapshot.docs.map(doc => ({ 
    id: doc.id, 
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate(),
  } as Material));

  if (grade) {
    materials = materials.filter(m => m.grade === grade);
  }
  if (category) {
    materials = materials.filter(m => m.category === category);
  }

  return materials;
}

export async function getMaterial(id: string): Promise<Material | null> {
  const docRef = await getDoc(doc(db, 'materials', id));
  if (docRef.exists()) {
    return { 
      id: docRef.id, 
      ...docRef.data(),
      createdAt: docRef.data().createdAt?.toDate(),
      updatedAt: docRef.data().updatedAt?.toDate(),
    } as Material;
  }
  return null;
}

export async function createMaterial(data: Omit<Material, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'materials'), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

// ============ QUESTIONS ============
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

export async function getQuestions(category?: string, grade?: string): Promise<Question[]> {
  let q = query(collection(db, 'questions'));
  const snapshot = await getDocs(q);
  
  let questions = snapshot.docs.map(doc => ({ 
    id: doc.id, 
    ...doc.data() 
  } as Question));

  if (category) {
    questions = questions.filter(q => q.category === category);
  }
  if (grade) {
    questions = questions.filter(q => q.grade === grade);
  }

  return questions;
}

export async function createQuestion(data: Omit<Question, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'questions'), data);
  return docRef.id;
}

// ============ EXAMS ============
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

export async function getExams(grade?: string): Promise<Exam[]> {
  let q = query(collection(db, 'exams'), orderBy('startTime', 'desc'));
  const snapshot = await getDocs(q);
  
  let exams = snapshot.docs.map(doc => ({ 
    id: doc.id, 
    ...doc.data(),
    startTime: doc.data().startTime?.toDate(),
    endTime: doc.data().endTime?.toDate(),
  } as Exam));

  if (grade) {
    exams = exams.filter(e => e.grade === grade);
  }

  return exams;
}

export async function getExam(id: string): Promise<Exam | null> {
  const docRef = await getDoc(doc(db, 'exams', id));
  if (docRef.exists()) {
    return { 
      id: docRef.id, 
      ...docRef.data(),
      startTime: docRef.data().startTime?.toDate(),
      endTime: docRef.data().endTime?.toDate(),
    } as Exam;
  }
  return null;
}

// ============ EXAM RESULTS ============
export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  answers: { questionId: string; answer: string | number }[];
  score: number;
  completedAt: Date;
}

export async function submitExamResult(data: Omit<ExamResult, 'id' | 'completedAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'examResults'), {
    ...data,
    completedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getStudentResults(studentId: string): Promise<ExamResult[]> {
  const q = query(
    collection(db, 'examResults'), 
    where('studentId', '==', studentId),
    orderBy('completedAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ 
    id: doc.id, 
    ...doc.data(),
    completedAt: doc.data().completedAt?.toDate(),
  } as ExamResult));
}

// ============ GAMES ============
export interface Game {
  id: string;
  title: string;
  type: 'quiz' | 'memory' | 'puzzle' | 'math';
  description: string;
  icon: string;
  color: string;
}

export async function getGames(): Promise<Game[]> {
  const snapshot = await getDocs(collection(db, 'games'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Game));
}

// ============ GAME SCORES ============
export interface GameScore {
  id: string;
  gameId: string;
  studentId: string;
  studentName: string;
  score: number;
  playedAt: Date;
}

export async function submitGameScore(data: Omit<GameScore, 'id' | 'playedAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'gameScores'), {
    ...data,
    playedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getLeaderboard(gameId?: string, limitCount: number = 10): Promise<GameScore[]> {
  let q = query(
    collection(db, 'gameScores'),
    orderBy('score', 'desc'),
    limit(limitCount)
  );
  
  if (gameId) {
    q = query(
      collection(db, 'gameScores'),
      where('gameId', '==', gameId),
      orderBy('score', 'desc'),
      limit(limitCount)
    );
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ 
    id: doc.id, 
    ...doc.data(),
    playedAt: doc.data().playedAt?.toDate(),
  } as GameScore));
}

// ============ PAYMENTS ============
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

export async function getPayments(studentId?: string): Promise<Payment[]> {
  let q = query(collection(db, 'payments'), orderBy('year', 'desc'), orderBy('month', 'desc'));
  const snapshot = await getDocs(q);
  
  let payments = snapshot.docs.map(doc => ({ 
    id: doc.id, 
    ...doc.data(),
    paidAt: doc.data().paidAt?.toDate(),
  } as Payment));

  if (studentId) {
    payments = payments.filter(p => p.studentId === studentId);
  }

  return payments;
}

export async function updatePaymentStatus(id: string, status: 'pending' | 'paid'): Promise<void> {
  await updateDoc(doc(db, 'payments', id), {
    status,
    paidAt: status === 'paid' ? serverTimestamp() : null,
  });
}

// ============ STUDENTS ============
export async function getAllStudents(): Promise<any[]> {
  const snapshot = await getDocs(collection(db, 'students'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
