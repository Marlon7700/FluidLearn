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
  /** Hash SHA-256 del código de verificación del correo (solo admins). */
  emailVerificationCodeHash?: string
  skillProgress: Record<SkillKey, number>
  completedTaskIds: string[]
  streakDays: number
  streakLastDate?: string
  feedItems: FeedItem[]
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

export interface SkillTask {
  id: string
  title: string
  subtitle: string
}

export interface StudentRow {
  uid: string
  fullName: string
  email: string
  studentId: string
  bio?: string
  skillProgress: Record<SkillKey, number>
}
