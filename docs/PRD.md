# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Narang Education - Learning Management System

---

## 1. OVERVIEW

### 1.1 Project Name
**Narang Education** - Platform Bimbingan Belajar SD

### 1.2 Project Description
Narang Education adalah Learning Management System (LMS) yang dirancang khusus untuk bimbingan belajar SD dengan fitur lengkap meliputi manajemen siswa, absensi barcode, materi pembelajaran, bank soal, game edukasi, dan sistem pembayaran.

### 1.3 Target Users
- **Admin/Guru**: Mengelola seluruh sistem, siswa, materi, soal, dan melihat laporan
- **Siswa**: Mengakses materi, mengerjakan soal, bermain game edukasi, dan melihat progress

### 1.4 Platform
- Web-based application (Mobile First)
- Optimized for mobile devices
- iOS-style UI/UX design
- Google Firebase as Backend

---

## 2. FEATURES

### 2.1 Landing Page
| Feature | Description | Priority |
|---------|-------------|----------|
| Hero Section | Gradient Apple-style dengan tagline dan CTA | High |
| Features Showcase | Menampilkan fitur utama platform | High |
| Testimonial | Review dari siswa/orang tua | Medium |
| Pricing Info | Informasi biaya bimbingan | Medium |
| Contact Form | Form kontak untuk pendaftaran | High |
| Footer | Links, social media, copyright | High |

### 2.2 Authentication System
| Feature | Description | Priority |
|---------|-------------|----------|
| Login Siswa | Email/password dengan UI iOS-style | High |
| Login Admin | Email/password dengan dashboard access | High |
| Register Siswa | Pendaftaran siswa baru | High |
| Password Reset | Reset password via email | Medium |
| Session Management | Auto logout, remember me | High |
| Profile Management | Edit profil siswa | Medium |

### 2.3 Dashboard Admin
| Feature | Description | Priority |
|---------|-------------|----------|
| Overview Stats | Total siswa, absensi hari ini, pendapatan | High |
| Student Management | CRUD siswa, melihat detail siswa | High |
| Attendance Management | Lihat absensi, generate report | High |
| Material Management | Upload/edit materi (teks & gambar) | High |
| Question Bank | CRUD soal, kategorisasi per mata pelajaran | High |
| Exam Management | Buat ujian, assign ke siswa | High |
| Payment Management | Status pembayaran, generate invoice | Medium |
| Game Management | Kelola game edukasi | Medium |
| Reports & Analytics | Laporan komprehensif | Medium |

### 2.4 Dashboard Siswa (iOS-Style)
| Feature | Description | Priority |
|---------|-------------|----------|
| Home Screen | Card-based navigation iOS style | High |
| Attendance Scanner | Scan barcode untuk absensi | High |
| Materials Browser | Baca materi dengan reader mode | High |
| Exam Center | Kerjakan soal dengan timer | High |
| Educational Games | Kumpulan game edukasi | Medium |
| Scoreboard | Lihat ranking dan nilai | Medium |
| Payment Status | Status pembayaran SPP | Medium |
| Profile & Settings | Pengaturan akun | Medium |

### 2.5 Barcode Attendance System
| Feature | Description | Priority |
|---------|-------------|----------|
| Generate Barcode | Admin generate barcode unik per siswa | High |
| Scanner Camera | Siswa scan barcode untuk absensi | High |
| Attendance Log | Riwayat absensi dengan timestamp | High |
| Geolocation | Captured location saat absen | Medium |
| Manual Override | Admin bisa input manual | Medium |

### 2.6 Material Database
| Feature | Description | Priority |
|---------|-------------|----------|
| Categories | Matematika, Bahasa, IPA, IPS, dll | High |
| Text Content | Rich text editor untuk materi | High |
| Image Support | Upload gambar ilustrasi | High |
| Search & Filter | Cari materi berdasarkan kategori | High |
| Reading Progress | Track progress membaca | Medium |
| Bookmark | Simpan materi favorit | Low |

### 2.7 Question Bank & Exam
| Feature | Description | Priority |
|---------|-------------|----------|
| Question Types | Pilihan ganda, isian, essay | High |
| Categories | Per mata pelajaran dan tingkat | High |
| Exam Builder | Buat ujian dari bank soal | High |
| Timer | Countdown timer saat ujian | High |
| Auto-grade | Koreksi otomatis pilihan ganda | High |
| Score Report | Hasil dan pembahasan | High |

### 2.8 Educational Games
| Feature | Description | Priority |
|---------|-------------|----------|
| Quiz Game | Kuis interaktif dengan timer | High |
| Memory Match | Game mencocokkan kartu | Medium |
| Word Puzzle | Teka-teki kata | Medium |
| Math Challenge | Tantangan matematika cepat | Medium |
| Scoreboard | Ranking per game | High |
| Achievements | Badge dan achievement | Low |

### 2.9 Payment System
| Feature | Description | Priority |
|---------|-------------|----------|
| SPP Management | Tagihan bulanan | High |
| Payment Status | Lunas/belum lunas | High |
| Payment History | Riwayat pembayaran | Medium |
| Invoice Generator | Generate invoice PDF | Low |

---

## 3. TECHNICAL REQUIREMENTS

### 3.1 Frontend
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with shadcn/ui
- **Icons**: Lucide React Icons
- **Animation**: Framer Motion
- **UI Style**: iOS-style with Apple gradient colors

### 3.2 Backend & Database
- **Backend**: Next.js API Routes
- **Database**: Google Firebase
  - Firebase Authentication (Auth)
  - Cloud Firestore (Database)
  - Firebase Storage (Images)
  - Firebase Hosting (Optional)

### 3.3 Third-party Libraries
- **Barcode**: ZXing Browser/JS Barcode
- **QR Scanner**: react-qr-reader
- **Rich Text Editor**: Tiptap or Quill
- **Charts**: Recharts

### 3.4 Design System
```
Color Palette (Apple-style):
- Primary Gradient: #667eea → #764ba2 (Purple)
- Secondary Gradient: #f093fb → #f5576c (Pink)
- Accent Gradient: #4facfe → #00f2fe (Blue)
- Success: #11998e → #38ef7d (Green)
- Dark: #1a1a2e → #16213e
- Light Background: #fafafa
```

---

## 4. DATA MODEL

### 4.1 Users Collection
```typescript
interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'student';
  phone?: string;
  address?: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### 4.2 Students Collection
```typescript
interface Student {
  id: string;
  userId: string;
  studentId: string; // NIS
  barcode: string;
  class: string;
  parentName: string;
  parentPhone: string;
  birthDate: Date;
  joinDate: Date;
  status: 'active' | 'inactive';
}
```

### 4.3 Attendance Collection
```typescript
interface Attendance {
  id: string;
  studentId: string;
  date: Date;
  time: string;
  status: 'present' | 'late' | 'absent';
  location?: {
    latitude: number;
    longitude: number;
  };
  notes?: string;
}
```

### 4.4 Materials Collection
```typescript
interface Material {
  id: string;
  title: string;
  description: string;
  content: string; // HTML content
  images: string[];
  category: string;
  grade: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### 4.5 Questions Collection
```typescript
interface Question {
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
```

### 4.6 Exams Collection
```typescript
interface Exam {
  id: string;
  title: string;
  description: string;
  questions: string[]; // Question IDs
  duration: number; // minutes
  startTime: Date;
  endTime: Date;
  grade: string;
  status: 'draft' | 'published' | 'completed';
}
```

### 4.7 Exam Results Collection
```typescript
interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  answers: Answer[];
  score: number;
  completedAt: Date;
}
```

### 4.8 Games Collection
```typescript
interface Game {
  id: string;
  title: string;
  type: 'quiz' | 'memory' | 'puzzle' | 'math';
  description: string;
  config: any; // Game-specific configuration
}
```

### 4.9 Game Scores Collection
```typescript
interface GameScore {
  id: string;
  gameId: string;
  studentId: string;
  score: number;
  playedAt: Date;
}
```

### 4.10 Payments Collection
```typescript
interface Payment {
  id: string;
  studentId: string;
  month: string;
  year: number;
  amount: number;
  status: 'pending' | 'paid';
  paidAt?: Date;
  notes?: string;
}
```

---

## 5. USER FLOWS

### 5.1 Student Registration Flow
```
Landing Page → Register Form → Input Data → Submit → 
Firebase Create User → Create Student Record → Generate Barcode → 
Email Verification → Login → Dashboard
```

### 5.2 Attendance Flow
```
Student Login → Dashboard → Tap Attendance → 
Open Scanner → Scan Barcode → Validate → 
Record Attendance → Success Notification
```

### 5.3 Exam Flow
```
Student Login → Dashboard → Exam Center → 
Select Exam → Start Exam → Answer Questions → 
Submit → Auto-grade → View Results
```

---

## 6. NON-FUNCTIONAL REQUIREMENTS

### 6.1 Performance
- Page load time < 3 seconds
- Mobile-first responsive design
- Optimized images and assets

### 6.2 Security
- Firebase Authentication
- Role-based access control
- Secure API routes
- Input validation and sanitization

### 6.3 Usability
- iOS-style intuitive interface
- Clear navigation
- Accessible for all users
- Consistent design language

### 6.4 Scalability
- Firebase auto-scaling
- Efficient data queries
- Lazy loading for content

---

## 7. RELEASE PHASES

### Phase 1 (MVP) - Week 1-2
- Landing Page
- Authentication System
- Dashboard Admin & Siswa
- Barcode Attendance System

### Phase 2 - Week 3-4
- Material Database
- Question Bank
- Exam System

### Phase 3 - Week 5-6
- Educational Games
- Payment System
- Reports & Analytics

---

## 8. SUCCESS METRICS

- Student registration rate
- Daily active users
- Attendance rate
- Material completion rate
- Exam participation rate
- Game engagement time
- Payment collection rate

---

**Document Version**: 1.0
**Last Updated**: January 2025
**Author**: Narang Education Team
