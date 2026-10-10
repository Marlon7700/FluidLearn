/// Contenido pedagógico por actividad (TTS, texto libre, MCQ).
class SkillQuizQuestion {
  const SkillQuizQuestion({
    required this.prompt,
    this.choices = const [],
    this.correctIndex = 0,
    this.minWords = 0,
  });

  final String prompt;
  final List<String> choices;
  final int correctIndex;

  /// Si es mayor que 0, la pregunta es respuesta abierta (mínimo de palabras).
  final int minWords;

  bool get isOpenText => minWords > 0;
}

class SkillQuiz {
  const SkillQuiz({
    this.intro,
    this.listenAloudText,
    this.speakPhrases,
    required this.questions,
  });

  /// Texto de contexto (lectura, instrucciones).
  final String? intro;

  /// Si no es null, se reproduce con voz (listening).
  final String? listenAloudText;

  /// Speaking: frases que el usuario debe decir (grabación + STT).
  final List<String>? speakPhrases;
  final List<SkillQuizQuestion> questions;
}

final Map<String, SkillQuiz> _assetQuizzes = {};

/// Registers quizzes loaded from local JSON (Reading / Writing).
void registerAssetQuizzes(Map<String, SkillQuiz> quizzes) {
  _assetQuizzes
    ..clear()
    ..addAll(quizzes);
}

SkillQuiz? quizForTaskId(String taskId) =>
    _assetQuizzes[taskId] ?? _quizzes[taskId];

/// IDs de todas las tareas (para limpiar completados al reiniciar progreso).
const List<String> kAllSkillTaskIds = [
  'listening_short_audio',
  'listening_dialogue',
  'listening_gap',
  'listening_news_blurb',
  'speaking_pronunciation',
  'speaking_roleplay',
  'speaking_picture',
  'speaking_small_talk',
  'reading_skim',
  'reading_detail',
  'reading_vocab',
  'reading_hours_table',
  'writing_sentence',
  'writing_paragraph',
  'writing_edit',
  'writing_micro_email',
];

final Map<String, SkillQuiz> _quizzes = {
  'listening_short_audio': SkillQuiz(
    intro:
        'Click “Listen” to hear the ad (voiced in English). '
        'You can repeat as many times as you want; then answer.',
    listenAloudText:
        'Good morning. The library opens at eight and closes at six. '
        'Student cards are required after five p.m.',
    questions: const [
      SkillQuizQuestion(
        prompt: 'What time does the library open?',
        choices: ['6:00 a.m.', '8:00 a.m.', '10:00 a.m.', '5:00 p.m.'],
        correctIndex: 1,
      ),
      SkillQuizQuestion(
        prompt: 'What is required after 5 p.m.?',
        choices: ['A payment', 'A student card', 'A reservation', 'Nothing'],
        correctIndex: 1,
      ),
      SkillQuizQuestion(
        prompt: 'When does the library close?',
        choices: ['5:00 p.m.', '6:00 p.m.', '7:00 p.m.', '8:00 p.m.'],
        correctIndex: 1,
      ),
    ],
  ),
  'listening_dialogue': SkillQuiz(
    intro:
        'Click “Listen” to hear the dialogue. Then answer about what they agree on.',
    listenAloudText:
        'A says: Do you have the report ready? '
        'B says: Almost — I need one more hour. '
        'A says: Okay, send it before noon.',
    questions: const [
      SkillQuizQuestion(
        prompt: 'What does B still need?',
        choices: ['A day', 'About an hour', 'A new computer', 'Nothing'],
        correctIndex: 1,
      ),
      SkillQuizQuestion(
        prompt: 'When should B send the report?',
        choices: ['Before noon', 'After lunch', 'Tomorrow', 'Next week'],
        correctIndex: 0,
      ),
    ],
  ),
  'listening_gap': SkillQuiz(
    intro:
        'Listen to the full sentence using “Listen” and choose the best option '
        'fill in the gaps.',
    listenAloudText: 'She goes to class every Monday unless it rains.',
    questions: const [
      SkillQuizQuestion(
        prompt: 'Which pair fits the gaps best?',
        choices: [
          'go / rains',
          'goes / rains',
          'goes / rain',
          'going / raining',
        ],
        correctIndex: 1,
      ),
      SkillQuizQuestion(
        prompt: 'According to what you heard, what is true about Mondays?',
        choices: [
          'She never attends if it rains',
          'She usually goes; rain is the usual exception',
          'She only attends when it rains',
          'Mondays are always cancelled',
        ],
        correctIndex: 1,
      ),
    ],
  ),
  'speaking_pronunciation': SkillQuiz(
    intro:
        'Practice pronunciation: listen to each model, record your voice if you want '
        'review it, and click Validate to let the system check what you said.',
    speakPhrases: [
      'I want to learn English today.',
      'Could you speak a little more slowly, please?',
    ],
    questions: const [],
  ),
  'speaking_roleplay': SkillQuiz(
    intro:
        'Mini roleplay: say the phrases out loud like in a real café.',
    speakPhrases: [
      'I will have a tea, please.',
      'That will be all, thank you.',
    ],
    questions: const [],
  ),
  'speaking_picture': SkillQuiz(
    intro:
        'Imagine the picnic in the park: describe what you see in the scene out loud.',
    speakPhrases: [
      'A family is having a picnic in the park.',
      'The children are flying a colorful kite.',
    ],
    questions: const [],
  ),
  'listening_news_blurb': SkillQuiz(
    intro:
        'Short radio news: click “Listen” and answer about the main idea.',
    listenAloudText:
        'City council votes tonight on a plan to expand weekend bus service '
        'across the north district.',
    questions: const [
      SkillQuizQuestion(
        prompt: 'What is the council mainly deciding?',
        choices: [
          'Closing all buses',
          'Expanding weekend bus service',
          'Building a new airport',
          'Canceling weekend service',
        ],
        correctIndex: 1,
      ),
      SkillQuizQuestion(
        prompt: 'The expansion focuses on which area?',
        choices: [
          'The south district',
          'The north district',
          'Only the airport',
          'International routes',
        ],
        correctIndex: 1,
      ),
    ],
  ),
  'speaking_small_talk': SkillQuiz(
    intro:
        'Conversación informal: practica sonar natural al responder sobre el fin de semana.',
    speakPhrases: [
      'Not bad, I visited some friends and relaxed.',
      'How about you, did you get some rest?',
    ],
    questions: const [],
  ),
};
