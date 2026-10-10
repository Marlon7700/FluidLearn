/// Resultado del análisis de IA tras completar una actividad por habilidad.
class SkillAiFeedback {
  const SkillAiFeedback({
    required this.skillKey,
    required this.taskTitle,
    required this.overallPercent,
    required this.dimensionScores,
    required this.strengths,
    required this.weaknesses,
    required this.summary,
    this.mistakes = const [],
    this.quizCorrect = 0,
    this.quizTotal = 0,
  });

  final String skillKey;
  final String taskTitle;
  final int overallPercent;
  final Map<String, double> dimensionScores;
  final List<String> strengths;
  final List<String> weaknesses;
  final String summary;

  /// Errores concretos con cómo mejorar (basado en essay_dataset + ASAP2).
  final List<QuizMistakeDetail> mistakes;

  final int quizCorrect;
  final int quizTotal;

  double get quizAccuracy =>
      quizTotal > 0 ? quizCorrect / quizTotal : 1.0;

  /// True when the learner may save progress (all scored answers correct; Writing includes open text).
  bool get passedActivity {
    if (quizTotal > 0) return quizCorrect == quizTotal;
    return mistakes.isEmpty;
  }

  bool get hasMistakes => mistakes.isNotEmpty;

  String get skillLabel {
    switch (skillKey) {
      case 'listening':
        return 'Listening';
      case 'speaking':
        return 'Speaking';
      case 'reading':
        return 'Reading';
      case 'writing':
        return 'Writing';
      default:
        return skillKey;
    }
  }
}

/// Detalle de un error con retroalimentación accionable.
class QuizMistakeDetail {
  const QuizMistakeDetail({
    required this.questionLabel,
    required this.prompt,
    required this.userAnswer,
    required this.correctAnswer,
    required this.primaryDimension,
    required this.whatWentWrong,
    required this.howToImprove,
  });

  final String questionLabel;
  final String prompt;
  final String userAnswer;
  final String correctAnswer;
  final String primaryDimension;
  final String whatWentWrong;
  final String howToImprove;
}

/// Respuestas de una pregunta para el evaluador.
class QuizAnswerRecord {
  const QuizAnswerRecord({
    required this.prompt,
    required this.isCorrect,
    this.questionIndex = 0,
    this.userText,
    this.isOpenText = false,
    this.choices = const [],
    this.selectedIndex,
    this.correctIndex,
    this.minWords = 0,
    this.targetPhrase,
  });

  final String prompt;
  final bool isCorrect;
  final int questionIndex;
  final String? userText;
  final bool isOpenText;
  final List<String> choices;
  final int? selectedIndex;
  final int? correctIndex;
  final int minWords;

  /// Speaking: frase objetivo asociada.
  final String? targetPhrase;

  String? get selectedChoice {
    if (selectedIndex == null ||
        selectedIndex! < 0 ||
        selectedIndex! >= choices.length) {
      return null;
    }
    return choices[selectedIndex!];
  }

  String? get correctChoice {
    if (correctIndex == null ||
        correctIndex! < 0 ||
        correctIndex! >= choices.length) {
      return null;
    }
    return choices[correctIndex!];
  }
}

/// Métricas de la sesión de pronunciación (Speaking).
class SpeakingSessionMetrics {
  const SpeakingSessionMetrics({
    required this.phraseMatchRatios,
    required this.totalValidationAttempts,
    this.heardTranscripts = const [],
    this.targetPhrases = const [],
    this.attemptsPerPhrase = const [],
  });

  final List<double> phraseMatchRatios;
  final int totalValidationAttempts;
  final List<String> heardTranscripts;
  final List<String> targetPhrases;
  final List<int> attemptsPerPhrase;

  double get averageMatch {
    if (phraseMatchRatios.isEmpty) return 0;
    return phraseMatchRatios.reduce((a, b) => a + b) / phraseMatchRatios.length;
  }
}

/// Entrada unificada para [FluidLearnAiTraining.analyze].
class SkillAssessmentInput {
  const SkillAssessmentInput({
    required this.skillKey,
    required this.taskId,
    required this.taskTitle,
    this.quizAnswers = const [],
    this.combinedOpenText,
    this.speakingMetrics,
    this.listenedToAudio = false,
  });

  final String skillKey;
  final String taskId;
  final String taskTitle;
  final List<QuizAnswerRecord> quizAnswers;
  final String? combinedOpenText;
  final SpeakingSessionMetrics? speakingMetrics;
  final bool listenedToAudio;
}
