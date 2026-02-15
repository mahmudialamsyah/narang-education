import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';

export type UserRole = 'admin' | 'student';

export interface UserData {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentData {
  id: string;
  userId: string;
  studentId: string;
  barcode: string;
  name: string;
  class: string;
  parentName: string;
  parentPhone: string;
  birthDate?: Date;
  joinDate: Date;
  status: 'active' | 'inactive';
}

// Demo users
const DEMO_USERS: Record<string, UserData & { password: string }> = {
  'admin@narang.id': {
    id: 'demo-admin',
    email: 'admin@narang.id',
    password: 'admin123',
    name: 'Admin Narang',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  'siswa@narang.id': {
    id: 'demo-student',
    email: 'siswa@narang.id',
    password: 'siswa123',
    name: 'Siswa Demo',
    role: 'student',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
};

const DEMO_STUDENT: StudentData = {
  id: 'demo-student',
  userId: 'demo-student',
  studentId: 'SD2024001',
  barcode: 'NRGDEMO123',
  name: 'Siswa Demo',
  class: '4',
  parentName: 'Orang Tua Demo',
  parentPhone: '08123456789',
  joinDate: new Date(),
  status: 'active',
};

// Check if running in demo mode
function isDemoUser(email: string): boolean {
  return email in DEMO_USERS;
}

// Demo login
function demoLogin(email: string, password: string): { user: UserData; student?: StudentData } | null {
  const demoUser = DEMO_USERS[email];
  if (demoUser && demoUser.password === password) {
    const { password: _, ...userData } = demoUser;
    const result: { user: UserData; student?: StudentData } = { user: userData };
    if (userData.role === 'student') {
      result.student = DEMO_STUDENT;
    }
    return result;
  }
  return null;
}

// Register new user
export async function registerUser(
  email: string,
  password: string,
  name: string,
  role: UserRole = 'student',
  additionalData?: Partial<StudentData>
): Promise<{ user: FirebaseUser; userData: UserData }> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Update display name
  await updateProfile(user, { displayName: name });

  // Create user document
  const userData: UserData = {
    id: user.uid,
    email: user.email!,
    name,
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await setDoc(doc(db, 'users', user.uid), {
    ...userData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  // If student, create student document
  if (role === 'student') {
    const studentId = `SD${Date.now().toString().slice(-6)}`;
    const barcode = generateBarcode();
    
    await setDoc(doc(db, 'students', user.uid), {
      userId: user.uid,
      studentId,
      barcode,
      name,
      class: additionalData?.class || '4',
      parentName: additionalData?.parentName || '',
      parentPhone: additionalData?.parentPhone || '',
      joinDate: serverTimestamp(),
      status: 'active',
    });
  }

  return { user, userData };
}

// Login user - supports both demo and Firebase
export async function loginUser(email: string, password: string): Promise<{ 
  user: FirebaseUser | null; 
  userData: UserData;
  studentData?: StudentData;
}> {
  // Check demo mode first
  const demo = demoLogin(email, password);
  if (demo) {
    // Store demo session in localStorage
    localStorage.setItem('demo_session', JSON.stringify(demo));
    return { 
      user: null, // No Firebase user for demo
      userData: demo.user,
      studentData: demo.student,
    };
  }

  // Firebase login
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  const userData = await getUserData(user.uid);
  
  if (!userData) {
    throw new Error('Data pengguna tidak ditemukan');
  }

  let studentData: StudentData | undefined;
  if (userData.role === 'student') {
    studentData = await getStudentData(user.uid) || undefined;
  }

  return { user, userData, studentData };
}

// Logout user
export async function logoutUser(): Promise<void> {
  // Clear demo session
  localStorage.removeItem('demo_session');
  await signOut(auth);
}

// Get user data from Firestore
export async function getUserData(uid: string): Promise<UserData | null> {
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (userDoc.exists()) {
    const data = userDoc.data();
    return {
      id: userDoc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as UserData;
  }
  return null;
}

// Get student data from Firestore
export async function getStudentData(uid: string): Promise<StudentData | null> {
  const studentDoc = await getDoc(doc(db, 'students', uid));
  if (studentDoc.exists()) {
    const data = studentDoc.data();
    return {
      id: studentDoc.id,
      ...data,
      joinDate: data.joinDate?.toDate() || new Date(),
    } as StudentData;
  }
  return null;
}

// Generate unique barcode
function generateBarcode(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `NRG${timestamp}${random}`;
}

// Auth state observer
export function onAuthStateChange(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// Get current session (supports demo mode)
export function getCurrentSession(): { userData: UserData; studentData?: StudentData } | null {
  // Check Firebase auth first
  if (auth.currentUser) {
    return null; // Let the component fetch from Firestore
  }
  
  // Check demo session
  if (typeof window !== 'undefined') {
    const demoSession = localStorage.getItem('demo_session');
    if (demoSession) {
      try {
        return JSON.parse(demoSession);
      } catch {
        return null;
      }
    }
  }
  
  return null;
}

// Check if demo mode
export function isDemoMode(): boolean {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('demo_session') !== null;
  }
  return false;
}
