import '../data/skill_activity_quizzes.dart';
import '../data/skill_question_banks.dart';
import '../utils/skill_level.dart';
import '../utils/writing_quiz_helper.dart';

/// Elige y adapta preguntas según el nivel CEFR del estudiante (home / Firestore).
class AdaptiveQuizService {
  AdaptiveQuizService._();

  /// Quiz para una actividad: publicado (admin) + catálogo + banco por nivel.
  static SkillQuiz quizFor({
    required String skillKey,
    required String taskId,
    required double skillProgress,
    SkillQuiz? publishedOverride,
  }) {
    final level = SkillLevel.labelForProgress(skillProgress);

    SkillQuiz result;
    if (publishedOverride != null &&
        (publishedOverride.questions.isNotEmpty ||
            (publishedOverride.speakPhrases?.isNotEmpty ?? false))) {
      result = _applyPublished(publishedOverride, skillKey, level);
    } else {
      final base = quizForTaskId(taskId);
      final bankIndex = SkillLevel.bankIndexForProgress(skillProgress);
      final bankQuiz = SkillQuestionBanks.quizFor(
        skillKey: skillKey,
        taskId: taskId,
        bankIndex: bankIndex,
        levelLabel: level,
      );

      if (base == null && bankQuiz == null) {
        result = _fallbackQuiz(skillKey, level, taskId);
      } else if (base == null) {
        result = bankQuiz!;
      } else if (bankQuiz == null) {
        result = _enrichIntro(base, skillKey, level);
      } else {
        result = _merge(base, bankQuiz, skillKey, level);
      }
    }

    if (skillKey == 'writing') {
      result = WritingQuizHelper.ensureOpen(result, taskId);
    }
    return result;
  }

  static SkillQuiz _fallbackQuiz(String skillKey, String level, String taskId) {
    if (skillKey == 'writing') {
      return SkillQuiz(
        intro: 'Level $level · Writing · Type your answers in English.',
        questions: WritingQuizHelper.defaultQuestions(taskId),
      );
    }
    return SkillQuiz(
      intro: 'Practice adapted to your level $level ($skillKey).',
      questions: const [
        SkillQuizQuestion(
          prompt: 'Confirm you understood the main idea.',
          choices: ['Not yet', 'Yes, I am ready to finish'],
          correctIndex: 1,
        ),
      ],
    );
  }

  static SkillQuiz _enrichIntro(SkillQuiz base, String skillKey, String level) {
    final intro = base.intro?.trim();
    final prefix =
        'Level $level · ${skillKey[0].toUpperCase()}${skillKey.substring(1)}. ';
    return SkillQuiz(
      intro: intro != null && intro.isNotEmpty ? '$prefix$intro' : prefix.trim(),
      listenAloudText: base.listenAloudText,
      speakPhrases: base.speakPhrases,
      questions: base.questions,
    );
  }

  static SkillQuiz _applyPublished(
    SkillQuiz published,
    String skillKey,
    String level,
  ) {
    final intro = published.intro?.trim();
    final prefix =
        'Updated content · Level $level · ${_title(skillKey)}. ';
    return SkillQuiz(
      intro: intro != null && intro.isNotEmpty ? '$prefix$intro' : prefix.trim(),
      listenAloudText: published.listenAloudText,
      speakPhrases: published.speakPhrases,
      questions: published.questions,
    );
  }

  static String _title(String key) => switch (key) {
        'listening' => 'Listening',
        'speaking' => 'Speaking',
        'reading' => 'Reading',
        'writing' => 'Writing',
        _ => key,
      };

  static SkillQuiz _merge(SkillQuiz base, SkillQuiz bank, String skillKey, String level) {
    // Listening/Reading: each activity has audio/passage + MCQ in the catalog.
    // Do not replace with level-based bank questions (they mismatch the audio).
    final keepCatalogMcq = skillKey == 'listening' ||
        skillKey == 'reading' ||
        skillKey == 'writing' ||
        base.speakPhrases != null;

    final useBankMcq = !keepCatalogMcq &&
        base.questions.isNotEmpty &&
        bank.questions.isNotEmpty;

    final introSource = keepCatalogMcq ? base.intro : bank.intro;

    return SkillQuiz(
      intro:
          'Level $level — ${introSource ?? base.intro ?? bank.intro ?? 'Activity adapted to your profile.'}',
      listenAloudText: base.listenAloudText ?? bank.listenAloudText,
      speakPhrases: base.speakPhrases ?? bank.speakPhrases,
      questions: useBankMcq ? bank.questions : base.questions,
    );
  }
}
