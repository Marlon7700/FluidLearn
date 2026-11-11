import { LEVEL_TEST_SECONDS, scoreLevelTest, type LevelTestQuestion } from './levelTest'

export type A1Question = LevelTestQuestion
export const A1_TEST_SECONDS = LEVEL_TEST_SECONDS

export const A1_QUESTIONS: LevelTestQuestion[] = [
  {
    id: 1,
    prompt: 'What is your name?',
    options: ['My name is John.', 'I am 20 years old.', 'I live in Colombia.', 'I like pizza.'],
    correctIndex: 0,
  },
  {
    id: 2,
    prompt: 'Where are you from?',
    options: ['I am a student.', 'I am from Colombia.', 'I am 25 years old.', 'I like soccer.'],
    correctIndex: 1,
  },
  {
    id: 3,
    prompt: 'Choose the correct form:',
    stem: 'She ___ a teacher.',
    options: ['are', 'am', 'is', 'be'],
    correctIndex: 2,
  },
  {
    id: 4,
    prompt: 'Choose the correct form:',
    stem: 'I ___ happy today.',
    options: ['am', 'is', 'are', 'be'],
    correctIndex: 0,
  },
  {
    id: 5,
    prompt: 'What color is a banana?',
    options: ['Blue', 'Red', 'Yellow', 'Black'],
    correctIndex: 2,
  },
  {
    id: 6,
    prompt: 'How old are you?',
    options: ['I am 20 years old.', 'I live in Cúcuta.', 'I study English.', 'My name is Marlon.'],
    correctIndex: 0,
  },
  {
    id: 7,
    prompt: 'Choose the correct word:',
    stem: 'Monday, Tuesday, Wednesday are...',
    options: ['Months', 'Days', 'Numbers', 'Colors'],
    correctIndex: 1,
  },
  {
    id: 8,
    prompt: 'What number is correct?',
    options: ['Ten = 10', 'Ten = 100', 'Ten = 1', 'Ten = 1000'],
    correctIndex: 0,
  },
  {
    id: 9,
    prompt: 'Complete the sentence:',
    stem: 'They ___ students.',
    options: ['is', 'am', 'are', 'be'],
    correctIndex: 2,
  },
  {
    id: 10,
    prompt: 'What is the opposite of "big"?',
    options: ['Tall', 'Small', 'Long', 'Fast'],
    correctIndex: 1,
  },
  {
    id: 11,
    prompt: 'Choose the correct answer:',
    stem: 'Do you like English?',
    options: ['Yes, I do.', 'Yes, I am.', 'Yes, I can.', 'Yes, I have.'],
    correctIndex: 0,
  },
  {
    id: 12,
    prompt: 'What time is it?',
    options: ["It is 3 o'clock.", 'It is Monday.', 'It is January.', 'It is blue.'],
    correctIndex: 0,
  },
  {
    id: 13,
    prompt: 'Complete the sentence:',
    stem: 'I have ___ brother.',
    options: ['a', 'an', 'the', 'is'],
    correctIndex: 0,
  },
  {
    id: 14,
    prompt: 'Which word is a fruit?',
    options: ['Apple', 'Table', 'Car', 'House'],
    correctIndex: 0,
  },
  {
    id: 15,
    prompt: 'Choose the correct question:',
    options: ['What your name is?', 'What is your name?', 'Name your what is?', 'Your name what?'],
    correctIndex: 1,
  },
  {
    id: 16,
    prompt: 'Complete the sentence:',
    stem: 'My father ___ 45 years old.',
    options: ['am', 'are', 'is', 'be'],
    correctIndex: 2,
  },
  {
    id: 17,
    prompt: 'Where do you live?',
    options: ['I live in Cúcuta.', 'I am 18 years old.', 'I like music.', 'I am Colombian.'],
    correctIndex: 0,
  },
  {
    id: 18,
    prompt: 'Choose the correct possessive adjective:',
    stem: 'Maria is my friend. ___ house is big.',
    options: ['His', 'Her', 'Your', 'My'],
    correctIndex: 1,
  },
  {
    id: 19,
    prompt: 'Read and answer:',
    reading: 'Hello! My name is Anna. I am 22 years old and I live in London.',
    stem: 'Where does Anna live?',
    options: ['Colombia', 'Paris', 'London', 'Madrid'],
    correctIndex: 2,
  },
]

export function scoreA1(answers: Array<number | null>) {
  return scoreLevelTest(A1_QUESTIONS, answers, 'A1 — Principiante', 'En camino a A1')
}
