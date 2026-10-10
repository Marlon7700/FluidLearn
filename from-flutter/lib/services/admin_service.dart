import 'package:cloud_firestore/cloud_firestore.dart';

import '../utils/skill_level.dart';

/// Vista de estudiante para el panel de administración.
class StudentGradeRow {
  StudentGradeRow({
    required this.uid,
    required this.fullName,
    required this.email,
    required this.studentId,
    required this.skillProgress,
    required this.skillLevels,
    this.lastOverallPercent,
    this.lastTaskTitle,
  });

  final String uid;
  final String fullName;
  final String email;
  final String studentId;
  final Map<String, double> skillProgress;
  final Map<String, String> skillLevels;
  final int? lastOverallPercent;
  final String? lastTaskTitle;
}

class AdminService {
  AdminService._();
  static final AdminService instance = AdminService._();

  final _db = FirebaseFirestore.instance;

  Stream<List<StudentGradeRow>> watchStudents() {
    return _db.collection('users').snapshots().map((snap) {
      final rows = <StudentGradeRow>[];
      for (final doc in snap.docs) {
        final d = doc.data();
        if ((d['role'] as String?) == 'admin') continue;

        final progressRaw =
            (d['skillProgress'] as Map<String, dynamic>?) ?? {};
        final progress = <String, double>{
          for (final s in SkillLevel.skills)
            s: (progressRaw[s] as num?)?.toDouble() ?? 0.0,
        };

        final levelsRaw = d['skillLevels'] as Map<String, dynamic>?;
        final levels = levelsRaw != null
            ? levelsRaw.map((k, v) => MapEntry(k.toString(), v.toString()))
            : SkillLevel.levelsFromProgress(progress);

        final recent = d['recentAssessments'];
        int? lastPct;
        String? lastTitle;
        if (recent is List && recent.isNotEmpty) {
          final last = recent.first;
          if (last is Map) {
            lastPct = (last['overallPercent'] as num?)?.toInt();
            lastTitle = last['taskTitle'] as String?;
          }
        }

        rows.add(
          StudentGradeRow(
            uid: doc.id,
            fullName: (d['fullName'] ?? '—') as String,
            email: (d['email'] ?? '') as String,
            studentId: (d['studentId'] ?? '') as String,
            skillProgress: progress,
            skillLevels: levels,
            lastOverallPercent: lastPct,
            lastTaskTitle: lastTitle,
          ),
        );
      }
      rows.sort((a, b) => a.fullName.compareTo(b.fullName));
      return rows;
    });
  }
}
