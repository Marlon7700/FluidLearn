import 'package:cloud_firestore/cloud_firestore.dart';

import '../models/published_skill_quiz.dart';

/// Lectura del contenido publicado por administración (visible para estudiantes).
class PublishedQuizService {
  PublishedQuizService._();
  static final PublishedQuizService instance = PublishedQuizService._();

  static const _collection = 'published_skill_quizzes';

  final _db = FirebaseFirestore.instance;

  Future<PublishedSkillQuiz?> fetch({
    required String skillKey,
    required String taskId,
  }) async {
    try {
      final doc = await _db
          .collection(_collection)
          .doc(PublishedSkillQuiz.docId(skillKey, taskId))
          .get();
      if (!doc.exists || doc.data() == null) return null;
      return PublishedSkillQuiz.fromFirestore(doc.data()!);
    } catch (_) {
      return null;
    }
  }

  Stream<PublishedSkillQuiz?> watchTask({
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
