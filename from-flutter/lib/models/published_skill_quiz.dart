import 'package:cloud_firestore/cloud_firestore.dart';

import '../data/skill_activity_quizzes.dart';

/// Contenido publicado por administración para una actividad.
class PublishedSkillQuiz {
  PublishedSkillQuiz({
    required this.skillKey,
    required this.taskId,
    required this.taskTitle,
    required this.levelLabel,
    required this.topic,
    this.intro,
    this.listenAloudText,
    this.speakPhrases,
    required this.questions,
    this.updatedAt,
    this.updatedBy,
  });

  final String skillKey;
  final String taskId;
  final String taskTitle;
  final String levelLabel;
  final String topic;
  final String? intro;
  final String? listenAloudText;
  final List<String>? speakPhrases;
  final List<SkillQuizQuestion> questions;
  final DateTime? updatedAt;
  final String? updatedBy;

  static String docId(String skillKey, String taskId) => '${skillKey}__$taskId';

  SkillQuiz toSkillQuiz() {
    return SkillQuiz(
      intro: intro,
      listenAloudText: listenAloudText,
      speakPhrases: speakPhrases,
      questions: questions,
    );
  }

  Map<String, dynamic> toFirestore() {
    return {
      'skillKey': skillKey,
      'taskId': taskId,
      'taskTitle': taskTitle,
      'levelLabel': levelLabel,
      'topic': topic,
      'intro': intro,
      'listenAloudText': listenAloudText,
      'speakPhrases': speakPhrases,
      'questions': questions.map(_questionToMap).toList(),
      'updatedAt': FieldValue.serverTimestamp(),
      if (updatedBy != null) 'updatedBy': updatedBy,
    };
  }

  static PublishedSkillQuiz? fromFirestore(Map<String, dynamic> data) {
    final skillKey = data['skillKey'] as String?;
    final taskId = data['taskId'] as String?;
    if (skillKey == null || taskId == null) return null;

    final questionsRaw = data['questions'] as List<dynamic>? ?? [];
    final questions = questionsRaw
        .map((e) => _questionFromMap(e as Map<String, dynamic>))
        .toList();

    final phrases = data['speakPhrases'] as List<dynamic>?;
    DateTime? updatedAt;
    final ts = data['updatedAt'];
    if (ts is Timestamp) updatedAt = ts.toDate();

    return PublishedSkillQuiz(
      skillKey: skillKey,
      taskId: taskId,
      taskTitle: (data['taskTitle'] as String?) ?? taskId,
      levelLabel: (data['levelLabel'] as String?) ?? 'B1',
      topic: (data['topic'] as String?) ?? '',
      intro: data['intro'] as String?,
      listenAloudText: data['listenAloudText'] as String?,
      speakPhrases: phrases?.map((e) => e.toString()).toList(),
      questions: questions,
      updatedAt: updatedAt,
      updatedBy: data['updatedBy'] as String?,
    );
  }

  static Map<String, dynamic> _questionToMap(SkillQuizQuestion q) {
    return {
      'prompt': q.prompt,
      'choices': q.choices,
      'correctIndex': q.correctIndex,
      'minWords': q.minWords,
    };
  }

  static SkillQuizQuestion _questionFromMap(Map<String, dynamic> m) {
    return SkillQuizQuestion(
      prompt: (m['prompt'] as String?) ?? '',
      choices: List<String>.from(m['choices'] as List<dynamic>? ?? []),
      correctIndex: (m['correctIndex'] as num?)?.toInt() ?? 0,
      minWords: (m['minWords'] as num?)?.toInt() ?? 0,
    );
  }
}
