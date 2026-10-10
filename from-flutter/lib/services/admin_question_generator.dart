import '../data/skill_activity_quizzes.dart';

/// Generates activity drafts from a topic and CEFR level
/// (local engine aligned with FluidLearn training dimensions).
abstract final class AdminQuestionGenerator {
  AdminQuestionGenerator._();

  static SkillQuiz generate({
    required String skillKey,
    required String taskId,
    required String taskTitle,
    required String topic,
    required String levelLabel,
  }) {
    final topicClean =
        topic.trim().isEmpty ? 'academic English practice' : topic.trim();
    final level = levelLabel.trim().isEmpty ? 'B1' : levelLabel.trim();

    return switch (skillKey) {
      'listening' => _listening(taskId, taskTitle, topicClean, level),
      'speaking' => _speaking(taskId, taskTitle, topicClean, level),
      'reading' => _reading(taskId, taskTitle, topicClean, level),
      'writing' => _writing(taskId, taskTitle, topicClean, level),
      _ => SkillQuiz(
          intro: 'Practice: $topicClean (level $level).',
          questions: [
            SkillQuizQuestion(
              prompt: 'Did you review the topic "$topicClean"?',
              choices: const ['Not yet', 'Yes, I understand the main idea'],
              correctIndex: 1,
            ),
          ],
        ),
    };
  }

  static bool _isAdvanced(String level) =>
      level == 'B2' || level == 'C1' || level == 'C2';

  static String _levelIntro(String taskTitle, String level, String topic) =>
      '$taskTitle · Level $level · Topic: $topic.';

  static SkillQuiz _listening(
    String taskId,
    String taskTitle,
    String topic,
    String level,
  ) {
    return switch (taskId) {
      'listening_dialogue' => SkillQuiz(
          intro:
              '${_levelIntro(taskTitle, level, topic)} Listen to the dialogue and answer about what the speakers agree on.',
          listenAloudText:
              'Student A: Have you prepared for the session on $topic?\n'
              'Student B: Yes, I read the guide and wrote three questions.\n'
              'Student A: Great — let us compare notes after the lecture.',
          questions: [
            SkillQuizQuestion(
              prompt: 'What did Student B do to prepare?',
              choices: [
                'Skipped the reading',
                'Read the guide and wrote questions',
                'Cancelled the session',
                'Called the library',
              ],
              correctIndex: 1,
            ),
            SkillQuizQuestion(
              prompt: 'What will they do after the lecture?',
              choices: [
                'Compare notes',
                'Take a final exam',
                'Leave campus immediately',
                'Submit a video project',
              ],
              correctIndex: 0,
            ),
          ],
        ),
      'listening_gap' => SkillQuiz(
          intro:
              '${_levelIntro(taskTitle, level, topic)} Listen and choose the option that best completes the sentence.',
          listenAloudText:
              'Remember: the workshop about $topic starts at ten thirty '
              'in room four B. Bring your student ID and arrive five minutes early.',
          questions: [
            SkillQuizQuestion(
              prompt: 'When does the workshop start?',
              choices: [
                '9:30 a.m.',
                '10:30 a.m.',
                '4:30 p.m.',
                '10:30 p.m.',
              ],
              correctIndex: 1,
            ),
            SkillQuizQuestion(
              prompt: 'Where is the workshop held?',
              choices: ['Room 4B', 'Room 14', 'The cafeteria', 'Online only'],
              correctIndex: 0,
            ),
            SkillQuizQuestion(
              prompt: 'What should students bring?',
              choices: [
                'A sports uniform',
                'A student ID',
                'A cooking apron',
                'Nothing',
              ],
              correctIndex: 1,
            ),
          ],
        ),
      'listening_news_blurb' => SkillQuiz(
          intro:
              '${_levelIntro(taskTitle, level, topic)} Listen to the news blurb and identify the key announcement.',
          listenAloudText:
              'Breaking: the university announced new resources related to $topic '
              'for all faculties. Applications open on Monday and close on Friday.',
          questions: [
            SkillQuizQuestion(
              prompt: 'Who will receive the new resources?',
              choices: [
                'Only first-year students',
                'All faculties',
                'External companies',
                'Graduates only',
              ],
              correctIndex: 1,
            ),
            SkillQuizQuestion(
              prompt: 'When do applications close?',
              choices: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
              correctIndex: 2,
            ),
          ],
        ),
      'listening_short_audio' || _ => SkillQuiz(
          intro:
              '${_levelIntro(taskTitle, level, topic)} Press play, listen carefully, and answer the questions.',
          listenAloudText: _isAdvanced(level)
              ? 'Good morning. Today\'s briefing on $topic covers three goals: '
                  'review core vocabulary, analyse a short case study, and plan '
                  'a follow-up task for next week.'
              : 'Hello everyone. Our listening practice today is about $topic. '
                  'Focus on the main idea and supporting details.',
          questions: _isAdvanced(level)
              ? [
                  SkillQuizQuestion(
                    prompt: 'How many goals does the briefing mention?',
                    choices: ['One', 'Two', 'Three', 'Five'],
                    correctIndex: 2,
                  ),
                  SkillQuizQuestion(
                    prompt: 'Which activity is included in the session?',
                    choices: [
                      'A case study analysis',
                      'A swimming test',
                      'A cooking competition',
                      'A music concert',
                    ],
                    correctIndex: 0,
                  ),
                ]
              : [
                  SkillQuizQuestion(
                    prompt: 'What is the main focus of this audio?',
                    choices: [
                      'Sports results',
                      topic,
                      'Weather forecast',
                      'A recipe',
                    ],
                    correctIndex: 1,
                  ),
                  SkillQuizQuestion(
                    prompt: 'What should students focus on while listening?',
                    choices: [
                      'Only the first word',
                      'The main idea and details',
                      'Background music',
                      'The speaker\'s shoes',
                    ],
                    correctIndex: 1,
                  ),
                ],
        ),
    };
  }

  static SkillQuiz _speaking(
    String taskId,
    String taskTitle,
    String topic,
    String level,
  ) {
    final (phrases, focus) = switch (taskId) {
      'speaking_roleplay' => (
          [
            'Hello, I would like to discuss $topic with you, please.',
            'Could you give me a concrete example related to $topic?',
            'Thank you — that helps me understand the main point.',
          ],
          'Role-play: request information and respond politely.',
        ),
      'speaking_picture' => (
          [
            'In this image, I can see several elements related to $topic.',
            'The most important detail connects to $topic because it shows the context.',
            'In my opinion, this image supports our lesson on $topic.',
          ],
          'Describe what you see and link it to the topic.',
        ),
      'speaking_small_talk' => (
          [
            'Hi! Have you worked on $topic recently?',
            'I find $topic useful because it appears often at university.',
            'Maybe we could practice one more example together later.',
          ],
          'Informal conversation: share an opinion and suggest next steps.',
        ),
      'speaking_pronunciation' || _ => (
          [
            'Today I will practice clear pronunciation on $topic.',
            'The key term is "$topic" — I will stress the stressed syllables.',
            'Let me summarize one main idea about $topic in a full sentence.',
          ],
          'Pronunciation drill: speak each phrase clearly and at a steady pace.',
        ),
    };

    return SkillQuiz(
      intro: '${_levelIntro(taskTitle, level, topic)} $focus',
      speakPhrases: phrases,
      questions: const [],
    );
  }

  static SkillQuiz _reading(
    String taskId,
    String taskTitle,
    String topic,
    String level,
  ) {
    final (body, questions) = switch (taskId) {
      'reading_detail' => (
          _detailPassage(topic, level),
          [
            SkillQuizQuestion(
              prompt: 'According to the text, why is $topic important for learners?',
              choices: [
                'It has no connection to study skills',
                'It helps learners apply ideas in real contexts',
                'It replaces all grammar instruction',
                'It is only for advanced researchers',
              ],
              correctIndex: 1,
            ),
            SkillQuizQuestion(
              prompt: 'What does the author suggest students should do next?',
              choices: [
                'Skip all homework',
                'Review notes and try a short application task',
                'Avoid group work',
                'Stop using the library',
              ],
              correctIndex: 1,
            ),
          ],
        ),
      'reading_vocab' => (
          'When studying $topic, learners often meet new terms in context. '
          'For example, "context" means the situation where words appear, not an '
          'isolated definition. Good readers notice collocations and reuse them '
          'in their own sentences about $topic.',
          [
            SkillQuizQuestion(
              prompt: 'What does "context" mean in language learning?',
              choices: [
                'A random guess',
                'The situation where words are used',
                'Only grammar rules',
                'A type of exam',
              ],
              correctIndex: 1,
            ),
            SkillQuizQuestion(
              prompt: 'What should good readers notice?',
              choices: [
                'Only punctuation',
                'Collocations and reuse them',
                'The font colour',
                'Page numbers only',
              ],
              correctIndex: 1,
            ),
          ],
        ),
      'reading_hours_table' => (
          'Support sessions for $topic run on Monday and Wednesday from 2:00 to '
          '5:00 p.m. in Building C, room 210. Walk-in help is available; no '
          'appointment is required. Bring your notes and one draft paragraph.',
          [
            SkillQuizQuestion(
              prompt: 'On which days is support available?',
              choices: [
                'Monday and Wednesday',
                'Tuesday and Thursday',
                'Friday only',
                'Every Sunday',
              ],
              correctIndex: 0,
            ),
            SkillQuizQuestion(
              prompt: 'What should students bring?',
              choices: [
                'Notes and a draft paragraph',
                'Sports equipment',
                'A printed novel only',
                'Nothing at all',
              ],
              correctIndex: 0,
            ),
            SkillQuizQuestion(
              prompt: 'Is an appointment required?',
              choices: ['Yes, always', 'No, walk-in help is available', 'Only online', 'Only on Fridays'],
              correctIndex: 1,
            ),
          ],
        ),
      'reading_skim' || _ => (
          _skimPassage(topic, level),
          [
            SkillQuizQuestion(
              prompt: 'What is the text mainly about?',
              choices: [topic, 'Cooking techniques', 'Travel tickets', 'Sports scores'],
              correctIndex: 0,
            ),
            SkillQuizQuestion(
              prompt: _isAdvanced(level)
                  ? 'Which approach does the text recommend?'
                  : 'What should students do according to the text?',
              choices: _isAdvanced(level)
                  ? [
                      'Avoid authentic materials',
                      'Combine structured study with authentic materials',
                      'Stop taking notes',
                      'Skip vocabulary work',
                    ]
                  : [
                      'Ignore the lesson',
                      'Listen carefully and take notes',
                      'Skip homework',
                      'Cancel practice',
                    ],
              correctIndex: 1,
            ),
          ],
        ),
    };

    return SkillQuiz(
      intro: '${_levelIntro(taskTitle, level, topic)}\n\n$body',
      questions: questions,
    );
  }

  static String _skimPassage(String topic, String level) {
    if (_isAdvanced(level)) {
      return 'This overview of $topic explains how learners move from basic '
          'definitions to applied tasks. The author argues that short, focused '
          'reading combined with note-taking improves retention.';
    }
    if (level == 'A1' || level == 'A2' || level == 'Unrated') {
      return 'Today we read about $topic. The text is short and clear. '
          'Read once for the main idea, then check the questions.';
    }
    return 'This week our class focuses on $topic. The teacher explained key '
        'ideas and gave examples. Students should take notes and prepare a '
        'short summary.';
  }

  static String _detailPassage(String topic, String level) {
    if (_isAdvanced(level)) {
      return 'A recent report on $topic argues that learners improve faster when '
          'they connect classroom input to short application tasks. The report '
          'recommends peer review and a one-page reflection after each unit.';
    }
    return 'The reading on $topic describes practical steps: preview key terms, '
        'read for detail, and write three questions. Students who follow these '
        'steps report better understanding in follow-up classes.';
  }

  static SkillQuiz _writing(
    String taskId,
    String taskTitle,
    String topic,
    String level,
  ) {
    final introPrefix =
        '${_levelIntro(taskTitle, level, topic)} Type your answers in English.';

    return switch (taskId) {
      'writing_paragraph' => SkillQuiz(
          intro: '$introPrefix Write a short academic paragraph.',
          questions: [
            SkillQuizQuestion(
              prompt:
                  'Write a paragraph in English about $topic (at least 40 words). Include a clear topic sentence and one academic connector (e.g. However, Furthermore).',
              minWords: 40,
            ),
          ],
        ),
      'writing_edit' => SkillQuiz(
          intro: '$introPrefix Revise and write in formal academic style.',
          questions: [
            SkillQuizQuestion(
              prompt:
                  'Write two sentences in English about $topic. Use passive voice correctly in at least one sentence.',
              minWords: 20,
            ),
          ],
        ),
      'writing_micro_email' => SkillQuiz(
          intro: '$introPrefix Write a short formal email.',
          questions: [
            SkillQuizQuestion(
              prompt:
                  'Write a formal email in English about $topic. Include: subject line, greeting, a short body (2–3 sentences), and a professional closing.',
              minWords: 35,
            ),
          ],
        ),
      'writing_sentence' || _ => SkillQuiz(
          intro: '$introPrefix Write complete sentences in formal English.',
          questions: [
            SkillQuizQuestion(
              prompt:
                  'Write a formal opening sentence for an email about $topic (you may invent reasonable details).',
              minWords: 12,
            ),
            SkillQuizQuestion(
              prompt:
                  'Write a clear topic sentence for a paragraph about $topic.',
              minWords: 12,
            ),
          ],
        ),
    };
  }
}
