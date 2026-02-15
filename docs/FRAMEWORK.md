# FRAMEWORK & ARCHITECTURE
## Narang Education - Learning Management System

---

## 1. SYSTEM ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                 │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Next.js 16 App Router                     │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────────┐ │   │
│  │  │ Landing │  │ Student │  │  Admin  │  │   Auth Pages    │ │   │
│  │  │  Page   │  │Dashboard│  │Dashboard│  │ Login/Register  │ │   │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    React Components                          │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────────┐ │   │
│  │  │  shadcn  │ │  Framer  │ │  Lucide  │ │   Custom iOS   │ │   │
│  │  │    UI    │ │  Motion  │ │  Icons   │ │   Components   │ │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         API LAYER                                    │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Next.js API Routes                        │   │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌───────────┐ │   │
│  │  │   /auth    │ │ /students  │ │ /materials │ │  /exams   │ │   │
│  │  │            │ │            │ │            │ │           │ │   │
│  │  └────────────┘ └────────────┘ └────────────┘ └───────────┘ │   │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌───────────┐ │   │
│  │  │/attendance │ │  /games    │ │ /payments  │ │ /questions│ │   │
│  │  │            │ │            │ │            │ │           │ │   │
│  │  └────────────┘ └────────────┘ └────────────┘ └───────────┘ │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    FIREBASE SERVICES                                │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐ │
│  │   Firebase      │  │    Cloud        │  │     Firebase        │ │
│  │ Authentication  │  │   Firestore     │  │     Storage         │ │
│  │                 │  │                 │  │                     │ │
│  │ • Email/Pass    │  │ • Users         │  │ • Profile Images    │ │
│  │ • Session Mgmt  │  │ • Students      │  │ • Material Images   │ │
│  │ • Role Based    │  │ • Materials     │  │ • Question Images   │ │
│  │                 │  │ • Questions     │  │                     │ │
│  │                 │  │ • Exams         │  │                     │ │
│  │                 │  │ • Attendance    │  │                     │ │
│  │                 │  │ • Games         │  │                     │ │
│  │                 │  │ • Payments      │  │                     │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. PROJECT STRUCTURE

```
narang-education/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Landing page
│   │   ├── globals.css               # Global styles
│   │   │
│   │   ├── (auth)/                   # Auth route group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (student)/                # Student route group
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── attendance/
│   │   │   │   └── page.tsx
│   │   │   ├── materials/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── exams/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── games/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── payments/
│   │   │   │   └── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (admin)/                  # Admin route group
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── students/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── add/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── attendance/
│   │   │   │   └── page.tsx
│   │   │   ├── materials/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── add/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── questions/
│   │   │   │   ├── page.tsx
│   │   │   │   └── add/
│   │   │   │       └── page.tsx
│   │   │   ├── exams/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── games/
│   │   │   │   └── page.tsx
│   │   │   ├── payments/
│   │   │   │   └── page.tsx
│   │   │   ├── reports/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   └── api/                      # API Routes
│   │       ├── auth/
│   │       │   ├── login/
│   │       │   │   └── route.ts
│   │       │   ├── register/
│   │       │   │   └── route.ts
│   │       │   ├── logout/
│   │       │   │   └── route.ts
│   │       │   └── session/
│   │       │       └── route.ts
│   │       ├── students/
│   │       │   └── route.ts
│   │       ├── materials/
│   │       │   └── route.ts
│   │       ├── questions/
│   │       │   └── route.ts
│   │       ├── exams/
│   │       │   └── route.ts
│   │       ├── attendance/
│   │       │   └── route.ts
│   │       ├── games/
│   │       │   └── route.ts
│   │       └── payments/
│   │           └── route.ts
│   │
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/                   # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── TabBar.tsx            # iOS-style tab bar
│   │   │
│   │   ├── landing/                  # Landing page components
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── CTA.tsx
│   │   │
│   │   ├── student/                  # Student components
│   │   │   ├── AttendanceCard.tsx
│   │   │   ├── MaterialCard.tsx
│   │   │   ├── ExamCard.tsx
│   │   │   ├── GameCard.tsx
│   │   │   ├── ScoreBoard.tsx
│   │   │   ├── BarcodeScanner.tsx
│   │   │   └── PaymentCard.tsx
│   │   │
│   │   ├── admin/                    # Admin components
│   │   │   ├── StatsCard.tsx
│   │   │   ├── StudentTable.tsx
│   │   │   ├── MaterialEditor.tsx
│   │   │   ├── QuestionForm.tsx
│   │   │   ├── AttendanceTable.tsx
│   │   │   ├── PaymentTable.tsx
│   │   │   └── Charts.tsx
│   │   │
│   │   └── games/                    # Game components
│   │       ├── QuizGame.tsx
│   │       ├── MemoryGame.tsx
│   │       ├── WordPuzzle.tsx
│   │       └── MathChallenge.tsx
│   │
│   ├── lib/
│   │   ├── firebase/
│   │   │   ├── config.ts             # Firebase config
│   │   │   ├── auth.ts               # Auth functions
│   │   │   ├── firestore.ts          # Firestore functions
│   │   │   └── storage.ts            # Storage functions
│   │   │
│   │   ├── utils.ts                  # Utility functions
│   │   ├── constants.ts              # App constants
│   │   └── validators.ts             # Form validators
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useFirebase.ts
│   │   ├── useLocalStorage.ts
│   │   └── useToast.ts
│   │
│   ├── types/
│   │   ├── index.ts                  # All type definitions
│   │   ├── user.ts
│   │   ├── student.ts
│   │   ├── material.ts
│   │   ├── question.ts
│   │   ├── exam.ts
│   │   ├── attendance.ts
│   │   ├── game.ts
│   │   └── payment.ts
│   │
│   └── styles/
│       └── gradients.css             # Custom gradient classes
│
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── prisma/                           # (Not used - Firebase instead)
│
├── docs/
│   ├── PRD.md
│   ├── FRAMEWORK.md
│   └── WORKFLOW.md
│
├── .env.local                        # Environment variables
├── .env.example
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## 3. TECHNOLOGY STACK

### 3.1 Frontend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.x | React Framework |
| React | 19.x | UI Library |
| TypeScript | 5.x | Type Safety |
| Tailwind CSS | 4.x | Styling |
| shadcn/ui | Latest | UI Components |
| Lucide React | Latest | Icons |
| Framer Motion | Latest | Animations |

### 3.2 Backend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js API | 16.x | API Routes |
| Firebase Admin | Latest | Server-side Firebase |
| Zod | Latest | Validation |

### 3.3 Firebase Services
| Service | Purpose |
|---------|---------|
| Authentication | User auth (email/password) |
| Cloud Firestore | NoSQL Database |
| Firebase Storage | File storage (images) |

---

## 4. DESIGN SYSTEM

### 4.1 Color Tokens (Apple-style Gradients)

```css
/* Primary Gradients */
--gradient-purple: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-pink: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
--gradient-blue: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
--gradient-green: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
--gradient-orange: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
--gradient-dark: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);

/* Solid Colors */
--color-primary: #667eea;
--color-secondary: #764ba2;
--color-accent: #4facfe;
--color-success: #38ef7d;
--color-warning: #fee140;
--color-error: #f5576c;
--color-background: #fafafa;
--color-surface: #ffffff;
--color-text: #1a1a2e;
--color-text-muted: #6b7280;
```

### 4.2 Typography
```css
/* Font Family */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-display: 'SF Pro Display', 'Inter', sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
```

### 4.3 Spacing
```css
/* iOS-style spacing */
--space-1: 0.25rem;     /* 4px */
--space-2: 0.5rem;      /* 8px */
--space-3: 0.75rem;     /* 12px */
--space-4: 1rem;        /* 16px */
--space-5: 1.25rem;     /* 20px */
--space-6: 1.5rem;      /* 24px */
--space-8: 2rem;        /* 32px */
--space-10: 2.5rem;     /* 40px */
--space-12: 3rem;       /* 48px */
```

### 4.4 Border Radius
```css
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 1rem;      /* 16px */
--radius-xl: 1.5rem;    /* 24px */
--radius-2xl: 2rem;     /* 32px */
--radius-full: 9999px;
```

### 4.5 Shadows
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
```

---

## 5. FIREBASE DATA STRUCTURE

### 5.1 Firestore Collections

```
firestore/
├── users/                      # All users (admin & student)
│   └── {userId}/
│       ├── id: string
│       ├── email: string
│       ├── name: string
│       ├── role: 'admin' | 'student'
│       ├── phone: string
│       ├── profileImage: string
│       ├── createdAt: timestamp
│       └── updatedAt: timestamp
│
├── students/                   # Student-specific data
│   └── {studentId}/
│       ├── userId: string
│       ├── studentId: string
│       ├── barcode: string
│       ├── class: string
│       ├── parentName: string
│       ├── parentPhone: string
│       ├── birthDate: timestamp
│       ├── joinDate: timestamp
│       └── status: 'active' | 'inactive'
│
├── attendance/
│   └── {attendanceId}/
│       ├── studentId: string
│       ├── date: timestamp
│       ├── time: string
│       ├── status: 'present' | 'late' | 'absent'
│       ├── location: { lat, lng }
│       └── notes: string
│
├── materials/
│   └── {materialId}/
│       ├── title: string
│       ├── description: string
│       ├── content: string (HTML)
│       ├── images: string[]
│       ├── category: string
│       ├── grade: string
│       ├── author: string
│       ├── createdAt: timestamp
│       └── updatedAt: timestamp
│
├── questions/
│   └── {questionId}/
│       ├── question: string
│       ├── options: string[]
│       ├── correctAnswer: string | number
│       ├── type: 'multiple_choice' | 'essay' | 'fill_blank'
│       ├── category: string
│       ├── grade: string
│       ├── difficulty: 'easy' | 'medium' | 'hard'
│       └── points: number
│
├── exams/
│   └── {examId}/
│       ├── title: string
│       ├── description: string
│       ├── questions: string[]
│       ├── duration: number
│       ├── startTime: timestamp
│       ├── endTime: timestamp
│       ├── grade: string
│       └── status: 'draft' | 'published' | 'completed'
│
├── examResults/
│   └── {resultId}/
│       ├── examId: string
│       ├── studentId: string
│       ├── answers: array
│       ├── score: number
│       └── completedAt: timestamp
│
├── games/
│   └── {gameId}/
│       ├── title: string
│       ├── type: 'quiz' | 'memory' | 'puzzle' | 'math'
│       ├── description: string
│       └── config: object
│
├── gameScores/
│   └── {scoreId}/
│       ├── gameId: string
│       ├── studentId: string
│       ├── score: number
│       └── playedAt: timestamp
│
└── payments/
    └── {paymentId}/
        ├── studentId: string
        ├── month: string
        ├── year: number
        ├── amount: number
        ├── status: 'pending' | 'paid'
        ├── paidAt: timestamp
        └── notes: string
```

### 5.2 Firebase Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId 
                   || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Students collection
    match /students/{studentId} {
      allow read: if request.auth != null;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Attendance collection
    match /attendance/{attendanceId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Materials collection
    match /materials/{materialId} {
      allow read: if request.auth != null;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Questions collection
    match /questions/{questionId} {
      allow read: if request.auth != null;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Exams collection
    match /exams/{examId} {
      allow read: if request.auth != null;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Exam Results
    match /examResults/{resultId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
    }
    
    // Games collection
    match /games/{gameId} {
      allow read: if request.auth != null;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Game Scores
    match /gameScores/{scoreId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
    }
    
    // Payments
    match /payments/{paymentId} {
      allow read: if request.auth != null;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

---

## 6. API ENDPOINTS

### 6.1 Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login | Login user |
| POST | /api/auth/register | Register new user |
| POST | /api/auth/logout | Logout user |
| GET | /api/auth/session | Get current session |

### 6.2 Students
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/students | Get all students |
| GET | /api/students/:id | Get student by ID |
| POST | /api/students | Create student |
| PUT | /api/students/:id | Update student |
| DELETE | /api/students/:id | Delete student |

### 6.3 Materials
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/materials | Get all materials |
| GET | /api/materials/:id | Get material by ID |
| POST | /api/materials | Create material |
| PUT | /api/materials/:id | Update material |
| DELETE | /api/materials/:id | Delete material |

### 6.4 Questions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/questions | Get all questions |
| POST | /api/questions | Create question |
| PUT | /api/questions/:id | Update question |
| DELETE | /api/questions/:id | Delete question |

### 6.5 Exams
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/exams | Get all exams |
| GET | /api/exams/:id | Get exam by ID |
| POST | /api/exams | Create exam |
| POST | /api/exams/:id/submit | Submit exam answers |

### 6.6 Attendance
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/attendance | Get attendance records |
| POST | /api/attendance | Record attendance |
| POST | /api/attendance/scan | Scan barcode attendance |

### 6.7 Games
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/games | Get all games |
| POST | /api/games/scores | Submit game score |
| GET | /api/games/leaderboard | Get leaderboard |

### 6.8 Payments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/payments | Get payment records |
| POST | /api/payments | Create payment |
| PUT | /api/payments/:id | Update payment status |

---

## 7. COMPONENT LIBRARY

### 7.1 iOS-Style Components

```tsx
// iOS-style Card
<IOSSard>
  <IOSCardHeader>
    <IOSCardTitle>Title</IOSCardTitle>
    <IOSCardSubtitle>Subtitle</IOSCardSubtitle>
  </IOSCardHeader>
  <IOSCardContent>Content</IOSCardContent>
</IOSCard>

// iOS-style Button
<IOSButton variant="primary" size="lg">
  Get Started
</IOSButton>

// iOS-style Tab Bar
<IOSTabBar>
  <IOSTabItem icon={HomeIcon} label="Home" active />
  <IOSTabItem icon={BookIcon} label="Materials" />
  <IOSTabItem icon={GameIcon} label="Games" />
  <IOSTabItem icon={UserIcon} label="Profile" />
</IOSTabBar>

// iOS-style List
<IOSList>
  <IOSListItem title="Item 1" subtitle="Description" />
  <IOSListItem title="Item 2" subtitle="Description" />
</IOSList>

// iOS-style Input
<IOSInput
  label="Email"
  placeholder="Enter your email"
  type="email"
/>
```

---

**Document Version**: 1.0
**Last Updated**: January 2025
