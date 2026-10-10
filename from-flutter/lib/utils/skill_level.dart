/// Niveles CEFR derivados del progreso 0–1 (home / Firestore).
abstract final class SkillLevel {
  SkillLevel._();

  static const skills = ['listening', 'speaking', 'reading', 'writing'];

  static double clampUnit(double v) => v.clamp(0.0, 1.0);

  static String labelForProgress(double progress) {
    final x = clampUnit(progress);
    if (x <= 0) return 'Unrated';
    if (x < 0.17) return 'A1';
    if (x < 0.34) return 'A2';
    if (x < 0.51) return 'B1';
    if (x < 0.68) return 'B2';
    if (x < 0.85) return 'C1';
    return 'C2';
  }

  static Map<String, String> levelsFromProgress(Map<String, double> progress) {
    return {
      for (final s in skills)
        s: labelForProgress(progress[s] ?? 0),
    };
  }

  /// Índice 0–5 para elegir banco de preguntas (A1→0 … C2→5).
  static int bankIndexForProgress(double progress) {
    final x = clampUnit(progress);
    if (x <= 0) return 0;
    if (x < 0.17) return 0;
    if (x < 0.34) return 1;
    if (x < 0.51) return 2;
    if (x < 0.68) return 3;
    if (x < 0.85) return 4;
    return 5;
  }
}
