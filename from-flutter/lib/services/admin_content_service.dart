import 'package:cloud_firestore/cloud_firestore.dart';

import '../data/skill_activity_quizzes.dart';
import '../models/published_skill_quiz.dart';
import 'admin_question_generator.dart';

/// Publicar y gestionar contenido de habilidades (panel admin).
class AdminContentService {
  AdminContentService._();
  static final AdminContentService instance = AdminContentService._();

  static const _collection = 'published_skill_quizzes';

  final _db = FirebaseFirestore.instance;

  SkillQuiz generateDraft({
    required String skillKey,
    required String taskId,
    required String taskTitle,
    required String topic,
    required String levelLabel,
  }) {
    return AdminQuestionGenerator.generate(
      skillKey: skillKey,
      taskId: taskId,
      taskTitle: taskTitle,
      topic: topic,
      levelLabel: levelLabel,
    );
  }

  Future<void> publish({
    required String adminUid,
    required String skillKey,
    required String taskId,
    required String taskTitle,
    required String topic,
    required String levelLabel,
    required SkillQuiz quiz,
  }) async {
    final published = PublishedSkillQuiz(
      skillKey: skillKey,
      taskId: taskId,
      taskTitle: taskTitle,
      levelLabel: levelLabel,
      topic: topic,
      intro: quiz.intro,
      listenAloudText: quiz.listenAloudText,
      speakPhrases: quiz.speakPhrases,
      questions: quiz.questions,
      updatedBy: adminUid,
    );

    await _db
        .collection(_collection)
        .doc(PublishedSkillQuiz.docId(skillKey, taskId))
        .set(published.toFirestore(), SetOptions(merge: true));
  }

  Future<void> unpublish({
    required String skillKey,
    required String taskId,
  }) async {
    await _db
        .collection(_collection)
        .doc(PublishedSkillQuiz.docId(skillKey, taskId))
        .delete();
  }

  Stream<PublishedSkillQuiz?> watchPublished({
    required String skillKey,
    required String taskId,
  }) {
    return _db
        .collection(_collection)
        .doc(PublishedSkillQuiz.docId(skillKey, taskId))
        .snapshots()
        .map((snap) {
      if (!snap.exists || snap.data() == null) return null;
      return PublishedSkillQuiz.fromFirestore(snap.data()!);
    });
  }
}
