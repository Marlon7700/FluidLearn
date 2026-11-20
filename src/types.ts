export type SkillKey = 'listening' | 'speaking' | 'reading' | 'writing'

export type HairStyle = 'short' | 'long' | 'curly' | 'bun' | 'fade'
export type Accessory = 'none' | 'glasses' | 'headphones' | 'cap'

export interface CustomAvatar {
  skin: string
  hair: string
  hairStyle: HairStyle
  eyes: string
  shirt: string
  accessory: Accessory
}

export type AppLanguageCode = 'es' | 'en' | 'pt' | 'it' | 'de'

export interface NotificationPrefs {
  dailyReminders: boolean
  pendingActivities: boolean
  levelUpdates: boolean
}

export interface UserProfile {
  uid: string
  email: string
  fullName: string
  studentId: string
  profileComplete: boolean
  bio: string
  profilePhotoUrl?: string
  avatarIndex?: number
  customAvatar?: CustomAvatar
  role: 'student' | 'admin'
  appLanguage: AppLanguageCode
  notifications: NotificationPrefs
  practiceMinutes: number
  /** Hash SHA-256 del código de verificación del correo (solo admins). */
  emailVerificationCodeHash?: string
  skillProgress: Record<SkillKey, number>
  completedTaskIds: string[]
  streakDays: number
  streakLastDate?: string
  feedItems: FeedItem[]
  recentAssessments: Assessment[]
  firstName: string
  lastName: string
  country: string
  city: string
  timezone: string
  visibility: 'visible' | 'hidden'
  interests: string
  imageAlt: string
  createdAt?: string
  lastAccess?: string
}

export interface Assessment {
  taskId: string
  taskTitle: string
  skillKey: SkillKey
  overallPercent: number
  quizCorrect: number
  quizTotal: number
  at?: string
}

export interface FeedItem {
  title: string
  body: string
  type: string
  at?: string
}

export interface QuizQuestion {
  prompt: string
  choices: string[]
  correctIndex: number
  minWords?: number
}

export interface SkillQuiz {
  intro?: string
  listenAloudText?: string
  speakPhrases?: string[]
  questions: QuizQuestion[]
}

export type ActivityKind = 'quiz' | 'guide' | 'hangman' | 'wordsearch' | 'crossword'

export type UnitStatus = 'published' | 'draft'

export interface CourseUnitDoc {
  id: string
  title: string
  skillKey: SkillKey
  description: string
  availableAt: string
  status: UnitStatus
  sort: number
}

export interface GameClue {
  word: string
  clue: string
}

export interface CourseSkillDoc {
  title: string
  subtitle: string
  cover: string
  lead: string
  body: string[]
  published?: boolean
}

export interface CourseActivityDoc {
  id: string
  skillKey: SkillKey
  title: string
  subtitle: string
  intro: string
  listenAloudText: string
  speakPhrases: string[]
  questions: QuizQuestion[]
  sort: number
  kind?: ActivityKind
  dueAt?: string
  materialText?: string
  unitId?: string
  published?: boolean
  gameWords?: string[]
  gameClues?: GameClue[]
  hangmanWord?: string
  hangmanClue?: string
  points?: number
}

export interface SkillTask {
  id: string
  title: string
  subtitle: string
  dueAt?: string
  kind?: ActivityKind
}

export interface StudentRow {
  uid: string
  fullName: string
  email: string
  studentId: string
  bio?: string
  appLanguage?: AppLanguageCode
  streakDays?: number
  practiceMinutes?: number
  completedTaskIds?: string[]
  skillProgress: Record<SkillKey, number>
  skillGrades?: Record<SkillKey, number>
  gradesPublished?: boolean
  gradeFeedback?: string
}
