import '../data/skill_activity_quizzes.dart';

/// Writing activities use open-ended responses (typed English), not multiple choice.
abstract final class WritingQuizHelper {
  WritingQuizHelper._();

  static int minWordsForTask(String taskId) => switch (taskId) {
        'writing_paragraph' => 40,
        'writing_micro_email' => 35,
        'writing_edit' => 20,
        _ => 12,
      };

  static SkillQuiz ensureOpen(SkillQuiz quiz, String taskId) {
    if (quiz.questions.isEmpty) return quiz;
    if (quiz.questions.every((q) => q.isOpenText)) return quiz;

    final minWords = minWordsForTask(taskId);
    final questions = quiz.questions.map((q) {
      if (q.isOpenText) return q;
      return SkillQuizQuestion(
        prompt: _openPromptFromMcq(q, taskId),
        choices: const [],
        correctIndex: 0,
        minWords: minWords,
      );
    }).toList();

    return SkillQuiz(
      intro: quiz.intro,
      listenAloudText: quiz.listenAloudText,
      speakPhrases: quiz.speakPhrases,
      questions: questions,
    );
  }

  static String _openPromptFromMcq(SkillQuizQuestion q, String taskId) {
    final p = q.prompt.trim();
    if (p.isEmpty) {
      return _defaultPrompt(taskId);
    }
    final lower = p.toLowerCase();
    if (lower.startsWith('which') ||
        lower.startsWith('choose') ||
        lower.startsWith('best ') ||
        lower.startsWith('identify')) {
      return 'Write your answer in English. ${_mcqToWritingInstruction(p, taskId)}';
    }
    return 'Write your answer in English: $p';
  }

  static String _mcqToWritingInstruction(String mcqPrompt, String taskId) {
    return switch (taskId) {
      'writing_sentence' =>
        'Write a formal sentence or email opening related to this task: $mcqPrompt',
      'writing_paragraph' =>
        'Write a short paragraph (at least ${minWordsForTask(taskId)} words) that addresses: $mcqPrompt',
      'writing_edit' =>
        'Write one or two corrected sentences in English that fix the issue described: $mcqPrompt',
      'writing_micro_email' =>
        'Write a short formal email excerpt in English (greeting, one body sentence, and closing) related to: $mcqPrompt',
      _ => mcqPrompt,
    };
  }

  static String _defaultPrompt(String taskId) => switch (taskId) {
        'writing_paragraph' =>
          'Write a short academic paragraph in English with a clear topic sentence and one connector (e.g. However, Therefore).',
        'writing_edit' =>
          'Write one or two sentences in English using correct grammar and passive voice where appropriate.',
        'writing_micro_email' =>
          'Write a short formal email in English: subject line, greeting, one body paragraph, and a professional closing.',
        _ =>
          'Write one or two complete sentences in English using formal academic style.',
      };

  /// Default open prompts when no quiz content exists.
  static List<SkillQuizQuestion> defaultQuestions(
    String taskId, {
    String topic = 'your course topic',
  }) {
    final minWords = minWordsForTask(taskId);
    return switch (taskId) {
      'writing_paragraph' => [
        SkillQuizQuestion(
          prompt:
              'Write a short paragraph in English about $topic. Include a topic sentence and use one academic connector (e.g. However, Furthermore).',
          minWords: minWords,
        ),
      ],
      'writing_edit' => [
        SkillQuizQuestion(
          prompt:
              'Write two sentences in English about $topic. Use passive voice correctly in at least one sentence.',
          minWords: minWords,
        ),
      ],
      'writing_micro_email' => [
        SkillQuizQuestion(
          prompt:
              'Write a formal email in English about $topic. Include a subject line, greeting, a short body, and a professional closing.',
          minWords: minWords,
        ),
      ],
      _ => [
        SkillQuizQuestion(
          prompt:
              'Write one or two formal sentences in English about $topic (for example, an email opening or a topic sentence).',
          minWords: minWords,
        ),
      ],
    };
  }
}
