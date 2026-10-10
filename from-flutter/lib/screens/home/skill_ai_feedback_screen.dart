import 'package:flutter/material.dart';

import '../../models/skill_ai_feedback.dart';

/// Pantalla de retroalimentación de IA al terminar una prueba.
class SkillAiFeedbackScreen extends StatelessWidget {
  const SkillAiFeedbackScreen({
    super.key,
    required this.feedback,
    required this.accentColor,
    required this.onSave,
    required this.onRetry,
  });

  final SkillAiFeedback feedback;
  final Color accentColor;
  final VoidCallback onSave;
  final VoidCallback onRetry;

  @override
  Widget build(BuildContext context) {
    final hasMistakes = feedback.mistakes.isNotEmpty;
    final passed = feedback.passedActivity;

    return Scaffold(
      backgroundColor: const Color(0xFFF4F8FE),
      appBar: AppBar(
        title: const Text('Your AI analysis'),
        backgroundColor: const Color(0xFFF4F8FE),
        foregroundColor: const Color(0xFF1D2A44),
        elevation: 0,
        automaticallyImplyLeading: false,
      ),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(20, 8, 20, 24),
        children: [
          _ScoreHeader(feedback: feedback, accent: accentColor),
          const SizedBox(height: 20),
          _DimensionBars(
            scores: feedback.dimensionScores,
            accent: accentColor,
          ),
          if (feedback.mistakes.isNotEmpty) ...[
            const SizedBox(height: 24),
            const _SectionTitle(
              icon: Icons.error_outline_rounded,
              label: 'Errors and how to improve',
              color: Color(0xFFB71C1C),
            ),
            const SizedBox(height: 10),
            ...feedback.mistakes.map(
              (m) => _MistakeCard(mistake: m, accent: accentColor),
            ),
          ],
          if (feedback.strengths.isNotEmpty) ...[
            const SizedBox(height: 24),
            const _SectionTitle(
              icon: Icons.trending_up_rounded,
              label: 'Strengths',
              color: Color(0xFF2E7D4A),
            ),
            const SizedBox(height: 10),
            ...feedback.strengths.map(
              (s) => _BulletCard(text: s, borderColor: const Color(0xFFB8D4C0)),
            ),
          ],
          if (feedback.weaknesses.isNotEmpty) ...[
            const SizedBox(height: 20),
            const _SectionTitle(
              icon: Icons.lightbulb_outline_rounded,
              label: 'Areas to improve',
              color: Color(0xFFC67D00),
            ),
            const SizedBox(height: 10),
            ...feedback.weaknesses.map(
              (s) => _BulletCard(text: s, borderColor: const Color(0xFFE8C9A0)),
            ),
            if (hasMistakes) ...[
              const SizedBox(height: 8),
              const _BulletCard(
                text:
                    'See also the specific mistakes listed above for question-level fixes.',
                borderColor: Color(0xFFE8DCC8),
              ),
            ],
          ],
          const SizedBox(height: 28),
          if (!passed) ...[
            const Text(
              'You must answer all questions to save the progress.',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 13,
                height: 1.35,
                color: Color(0xFF5F6F86),
              ),
            ),
            const SizedBox(height: 12),
          ],
          SizedBox(
            width: double.infinity,
            child: FilledButton(
              onPressed: passed ? onSave : onRetry,
              style: FilledButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
                backgroundColor: passed
                    ? const Color(0xFF111D33)
                    : const Color(0xFF1967D2),
              ),
              child: Text(
                passed ? 'Save and continue' : 'Retry activity',
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _ScoreHeader extends StatelessWidget {
  const _ScoreHeader({required this.feedback, required this.accent});

  final SkillAiFeedback feedback;
  final Color accent;

  @override
  Widget build(BuildContext context) {
    final hasQuiz = feedback.quizTotal > 0;
    final allCorrect =
        hasQuiz && feedback.quizCorrect == feedback.quizTotal;
    final scoreColor = allCorrect
        ? const Color(0xFF2E7D4A)
        : (feedback.quizCorrect == 0
            ? const Color(0xFFB71C1C)
            : const Color(0xFFC67D00));

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withAlpha(13),
            blurRadius: 10,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Column(
        children: [
          Text(
            feedback.skillLabel,
            style: TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w700,
              color: accent,
            ),
          ),
          const SizedBox(height: 6),
          Text(
            feedback.taskTitle,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w700,
              color: Color(0xFF1D2A44),
            ),
          ),
          if (hasQuiz) ...[
            const SizedBox(height: 18),
            Text(
              'Test score',
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color: accent.withAlpha(200),
              ),
            ),
            const SizedBox(height: 6),
            Text(
              '${feedback.quizCorrect}/${feedback.quizTotal}',
              style: TextStyle(
                fontSize: 40,
                fontWeight: FontWeight.w800,
                color: scoreColor,
                height: 1,
              ),
            ),
            Text(
              feedback.quizCorrect == feedback.quizTotal
                  ? 'All correct!'
                  : '${feedback.quizTotal - feedback.quizCorrect} '
                      'question(s) to review',
              style: const TextStyle(
                fontSize: 13,
                color: Color(0xFF5F6F86),
              ),
            ),
          ],
          const SizedBox(height: 16),
          Text(
            'Estimated level (AI)',
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w600,
              color: accent.withAlpha(200),
            ),
          ),
          const SizedBox(height: 8),
          SizedBox(
            width: 88,
            height: 88,
            child: Stack(
              alignment: Alignment.center,
              children: [
                CircularProgressIndicator(
                  value: feedback.overallPercent / 100,
                  strokeWidth: 7,
                  backgroundColor: const Color(0xFFE8EDF5),
                  color: accent,
                ),
                Text(
                  '${feedback.overallPercent}%',
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w800,
                    color: Color(0xFF1D2A44),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _DimensionBars extends StatelessWidget {
  const _DimensionBars({required this.scores, required this.accent});

  final Map<String, double> scores;
  final Color accent;

  static const _labels = {
    'cohesion': 'Cohesion',
    'syntax': 'Syntax',
    'vocabulary': 'Vocabulary',
    'phraseology': 'Phraseology',
    'grammar': 'Grammar',
    'conventions': 'Conventions',
  };

  @override
  Widget build(BuildContext context) {
    final entries = scores.entries.toList()
      ..sort((a, b) => b.value.compareTo(a.value));
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0xFFE0E6EF)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Dimensions (ELL model)',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w700,
              color: Color(0xFF1D2A44),
            ),
          ),
          const SizedBox(height: 12),
          for (final e in entries) ...[
            Row(
              children: [
                Expanded(
                  flex: 2,
                  child: Text(
                    _labels[e.key] ?? e.key,
                    style: const TextStyle(fontSize: 12, color: Color(0xFF5F6F86)),
                  ),
                ),
                Expanded(
                  flex: 3,
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(4),
                    child: LinearProgressIndicator(
                      value: (e.value - 1) / 4,
                      minHeight: 8,
                      backgroundColor: const Color(0xFFE8EDF5),
                      color: accent,
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Text(
                  e.value.toStringAsFixed(1),
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                    color: Color(0xFF1D2A44),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
          ],
        ],
      ),
    );
  }
}

class _SectionTitle extends StatelessWidget {
  const _SectionTitle({
    required this.icon,
    required this.label,
    required this.color,
  });

  final IconData icon;
  final String label;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(icon, color: color, size: 22),
        const SizedBox(width: 8),
        Text(
          label,
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w700,
            color: color,
          ),
        ),
      ],
    );
  }
}

class _MistakeCard extends StatelessWidget {
  const _MistakeCard({required this.mistake, required this.accent});

  final QuizMistakeDetail mistake;
  final Color accent;

  static const _dimLabels = {
    'cohesion': 'Cohesion',
    'syntax': 'Sintaxis',
    'vocabulary': 'Vocabulary',
    'phraseology': 'Phraseology',
    'grammar': 'Grammar',
    'conventions': 'Conventions',
  };

  @override
  Widget build(BuildContext context) {
    final dimLabel = _dimLabels[mistake.primaryDimension] ?? mistake.primaryDimension;
    return Container(
      width: double.infinity,
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFFE8B4B4)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withAlpha(10),
            blurRadius: 6,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.close_rounded, size: 18, color: accent),
              const SizedBox(width: 6),
              Expanded(
                child: Text(
                  mistake.questionLabel,
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w800,
                    color: accent,
                  ),
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: accent.withAlpha(28),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  dimLabel,
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    color: accent,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            mistake.prompt,
            style: const TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w600,
              color: Color(0xFF1D2A44),
              height: 1.35,
            ),
          ),
          const SizedBox(height: 10),
          _AnswerRow(
            label: 'Your answer',
            value: mistake.userAnswer,
            color: const Color(0xFFB71C1C),
          ),
          const SizedBox(height: 6),
          _AnswerRow(
            label: 'Expected answer',
            value: mistake.correctAnswer,
            color: const Color(0xFF2E7D4A),
          ),
          const SizedBox(height: 10),
          Text(
            mistake.whatWentWrong,
            style: const TextStyle(
              fontSize: 13,
              height: 1.4,
              color: Color(0xFF5F6F86),
            ),
          ),
          const SizedBox(height: 10),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: const Color(0xFFF8FAFD),
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: const Color(0xFFE0E6EF)),
            ),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Icon(
                  Icons.tips_and_updates_outlined,
                  size: 18,
                  color: Color(0xFFC67D00),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    mistake.howToImprove,
                    style: const TextStyle(
                      fontSize: 13,
                      height: 1.4,
                      color: Color(0xFF2B374E),
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _AnswerRow extends StatelessWidget {
  const _AnswerRow({
    required this.label,
    required this.value,
    required this.color,
  });

  final String label;
  final String value;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          width: 118,
          child: Text(
            label,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w700,
              color: color,
            ),
          ),
        ),
        Expanded(
          child: Text(
            value,
            style: const TextStyle(fontSize: 13, height: 1.35, color: Color(0xFF2B374E)),
          ),
        ),
      ],
    );
  }
}

class _BulletCard extends StatelessWidget {
  const _BulletCard({required this.text, required this.borderColor});

  final String text;
  final Color borderColor;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: borderColor),
      ),
      child: Text(
        text,
        style: const TextStyle(
          fontSize: 14,
          height: 1.4,
          color: Color(0xFF2B374E),
        ),
      ),
    );
  }
}
