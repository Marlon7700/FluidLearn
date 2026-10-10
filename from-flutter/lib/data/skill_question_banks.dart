import 'skill_activity_quizzes.dart';

/// Bancos de preguntas por habilidad y nivel (generados según progreso CEFR).
abstract final class SkillQuestionBanks {
  SkillQuestionBanks._();

  static SkillQuiz? quizFor({
    required String skillKey,
    required String taskId,
    required int bankIndex,
    required String levelLabel,
  }) {
    if (skillKey == 'listening') {
      final template = _listeningByTaskId[taskId];
      if (template != null) {
        return SkillQuiz(
          intro: 'Questions level $levelLabel (${_skillTitle(skillKey)}).',
          listenAloudText: template.listenAloudText,
          questions: template.questions,
        );
      }
    }

    final banks = _banks[skillKey];
    if (banks == null || banks.isEmpty) return null;
    final idx = bankIndex.clamp(0, banks.length - 1);
    final template = banks[idx];
    return SkillQuiz(
      intro: 'Questions level $levelLabel (${_skillTitle(skillKey)}).',
      listenAloudText: template.listenAloudText,
      speakPhrases: template.speakPhrases,
      questions: template.questions,
    );
  }

  static String _skillTitle(String key) => switch (key) {
        'listening' => 'Listening',
        'speaking' => 'Speaking',
        'reading' => 'Reading',
        'writing' => 'Writing',
        _ => key,
      };

  /// Listening banks keyed by task so audio and MCQ always match.
  static final Map<String, _BankTemplate> _listeningByTaskId = {
    'listening_short_audio': _BankTemplate(
      listenAloudText:
          'Good morning. The library opens at eight and closes at six. '
          'Student cards are required after five p.m.',
      questions: [
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
      ],
    ),
    'listening_dialogue': _BankTemplate(
      listenAloudText:
          'A says: Do you have the report ready? '
          'B says: Almost — I need one more hour. '
          'A says: Okay, send it before noon.',
      questions: [
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
    'listening_gap': _BankTemplate(
      listenAloudText:
          'Remember: the workshop starts at ten thirty in room four B. '
          'Bring your student ID and arrive five minutes early.',
      questions: [
        SkillQuizQuestion(
          prompt: 'When does the workshop start?',
          choices: ['9:30 a.m.', '10:30 a.m.', '4:30 p.m.', '10:30 p.m.'],
          correctIndex: 1,
        ),
        SkillQuizQuestion(
          prompt: 'Where is the workshop held?',
          choices: ['Room 4B', 'Room 14', 'The cafeteria', 'Online only'],
          correctIndex: 0,
        ),
      ],
    ),
    'listening_news_blurb': _BankTemplate(
      listenAloudText:
          'City council votes tonight on a plan to expand weekend bus service '
          'across the north district.',
      questions: [
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
  };

  static final Map<String, List<_BankTemplate>> _banks = {
    'listening': [
      _listeningByTaskId['listening_short_audio']!,
      _listeningByTaskId['listening_dialogue']!,
      _listeningByTaskId['listening_gap']!,
      _listeningByTaskId['listening_news_blurb']!,
    ],
    'reading': [
      _BankTemplate(
        questions: [
          SkillQuizQuestion(
            prompt: 'Choose the correct word: I ___ a student.',
            choices: ['am', 'is', 'are', 'be'],
            correctIndex: 0,
          ),
        ],
      ),
      _BankTemplate(
        questions: [
          SkillQuizQuestion(
            prompt:
                'According to a short notice, books must be returned before Friday. '
                'When is the deadline?',
            choices: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
            correctIndex: 2,
          ),
        ],
      ),
      _BankTemplate(
        questions: [
          SkillQuizQuestion(
            prompt:
                'The author argues that remote work increases flexibility but may '
                'reduce spontaneous collaboration. What is the main trade-off?',
            choices: [
              'Cost vs quality',
              'Flexibility vs collaboration',
              'Speed vs accuracy',
              'Health vs income',
            ],
            correctIndex: 1,
          ),
        ],
      ),
    ],
    'writing': [
      _BankTemplate(
        questions: [
          SkillQuizQuestion(
            prompt:
                'Write one grammatically correct sentence in English using the third person singular (for example: daily routines or study habits).',
            minWords: 12,
          ),
        ],
      ),
      _BankTemplate(
        questions: [
          SkillQuizQuestion(
            prompt:
                'Write a short paragraph in English (at least 40 words). Use one connector to show contrast (e.g. However, Although).',
            minWords: 40,
          ),
        ],
      ),
      _BankTemplate(
        questions: [
          SkillQuizQuestion(
            prompt:
                'Write two sentences in English. At least one must use passive voice correctly.',
            minWords: 20,
          ),
        ],
      ),
    ],
    'speaking': [
      _BankTemplate(
        speakPhrases: [
          'Hello, my name is Ana.',
          'Nice to meet you.',
        ],
        questions: const [],
      ),
      _BankTemplate(
        speakPhrases: [
          'Could I have a coffee, please?',
          'That will be all, thank you.',
        ],
        questions: const [],
      ),
      _BankTemplate(
        speakPhrases: [
          'In my opinion, learning online requires more self-discipline.',
          'What matters most is consistent daily practice.',
        ],
        questions: const [],
      ),
    ],
  };
}

class _BankTemplate {
  const _BankTemplate({
    this.listenAloudText,
    this.speakPhrases,
    this.questions = const [],
  });

  final String? listenAloudText;
  final List<String>? speakPhrases;
  final List<SkillQuizQuestion> questions;
}
