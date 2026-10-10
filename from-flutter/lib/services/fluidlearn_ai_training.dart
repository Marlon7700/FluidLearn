import 'dart:convert';
import 'dart:math' as math;

import 'package:flutter/services.dart' show rootBundle;

import '../models/skill_ai_feedback.dart';
import '../utils/english_text_validator.dart';
import '../utils/speaking_pronunciation_match.dart';

/// Motor de evaluación inspirado en **Training_IA** (Kaggle Feedback Prize – ELL).
///
/// El pipeline Python predice 6 dimensiones sobre texto (`cohesion`, `syntax`,
/// `vocabulary`, `phraseology`, `grammar`, `conventions`) usando features como
/// conteo de unigramas, puntuación, fastText y DeBERTa. En la app usamos las
/// mismas dimensiones con heurísticas ligeras + resultados del quiz para
/// generar fortalezas y debilidades por habilidad (Listening, Speaking, etc.).
///
/// Pesos entrenados con `essay_dataset.csv` + `ASAP2_train_sourcetexts.csv`
/// vía `Training_IA/export_fluidlearn_weights.py` →
/// `assets/data/fluidlearn_ai_weights.json`.
class FluidLearnAiTraining {
  FluidLearnAiTraining._();

  static const dimensionKeys = [
    'cohesion',
    'syntax',
    'vocabulary',
    'phraseology',
    'grammar',
    'conventions',
  ];

  /// Pesos por habilidad (qué dimensiones priorizar al interpretar el resultado).
  static const Map<String, Map<String, double>> _skillDimensionFocus = {
    'listening': {
      'cohesion': 0.32,
      'vocabulary': 0.24,
      'syntax': 0.18,
      'grammar': 0.12,
      'phraseology': 0.08,
      'conventions': 0.06,
    },
    'speaking': {
      'phraseology': 0.30,
      'vocabulary': 0.24,
      'grammar': 0.18,
      'cohesion': 0.16,
      'syntax': 0.07,
      'conventions': 0.05,
    },
    'reading': {
      'vocabulary': 0.30,
      'cohesion': 0.26,
      'syntax': 0.18,
      'grammar': 0.14,
      'phraseology': 0.07,
      'conventions': 0.05,
    },
    'writing': {
      'grammar': 0.26,
      'conventions': 0.24,
      'vocabulary': 0.20,
      'cohesion': 0.16,
      'syntax': 0.09,
      'phraseology': 0.05,
    },
  };

  /// Umbrales calibrados al rango 1–5 del competo ELL (ver `ModelTrainer.recast_scores`).
  static const double _strengthThreshold = 3.6;
  static const double _weaknessThreshold = 2.75;

  static double _strengthThresholdRuntime = _strengthThreshold;
  static double _weaknessThresholdRuntime = _weaknessThreshold;
  static bool _weightsLoaded = false;
  static bool _hasTrainedRegression = false;
  static final List<String> _featureNames = [
    'unigram_count',
    'unique_ratio',
    'avg_sentence_length',
    'avg_word_length',
    'punctuation_error_fraction',
    'capitalization_score',
    'line_breaks',
  ];
  static Map<String, double> _featureMean = {};
  static Map<String, double> _featureStd = {};
  static final Map<String, _TrainedDimensionModel> _regressionByDimension = {};
  static Map<String, _DimensionStat> _dimensionStats = {};
  static Map<String, double> _featureBenchmarks = {};
  static Map<String, List<String>> _dimensionTips = {};
  static Map<String, String> _featureTips = {};
  static Map<String, String> _mcqErrorTemplates = {};
  static Map<String, List<String>> _skillPrimaryDimensions = {};

  /// Carga modelo entrenado (essay_dataset + ASAP2) desde assets.
  static Future<void> loadExportedWeights() async {
    if (_weightsLoaded) return;
    _weightsLoaded = true;
    try {
      final raw = await rootBundle.loadString(
        'assets/data/fluidlearn_ai_weights.json',
      );
      final map = jsonDecode(raw) as Map<String, dynamic>;
      _strengthThresholdRuntime =
          (map['strength_threshold'] as num?)?.toDouble() ?? _strengthThreshold;
      _weaknessThresholdRuntime =
          (map['weakness_threshold'] as num?)?.toDouble() ?? _weaknessThreshold;

      final norm = map['feature_norm'];
      if (norm is Map<String, dynamic>) {
        final mean = norm['mean'];
        final std = norm['std'];
        if (mean is Map && std is Map) {
          _featureMean = mean.map(
            (k, v) => MapEntry(k.toString(), (v as num).toDouble()),
          );
          _featureStd = std.map(
            (k, v) => MapEntry(k.toString(), (v as num).toDouble()),
          );
        }
      }

      final models = map['regression_models'];
      if (models is Map<String, dynamic>) {
        _regressionByDimension.clear();
        for (final dim in dimensionKeys) {
          final m = models[dim];
          if (m is! Map<String, dynamic>) continue;
          final intercept = (m['intercept'] as num?)?.toDouble();
          final coefs = m['coefficients'];
          if (intercept == null || coefs is! Map) continue;
          final weights = <String, double>{};
          for (final name in _featureNames) {
            final w = coefs[name];
            if (w is num) weights[name] = w.toDouble();
          }
          if (weights.length == _featureNames.length) {
            _regressionByDimension[dim] = _TrainedDimensionModel(
              intercept: intercept,
              coefficients: weights,
            );
          }
        }
        _hasTrainedRegression =
            _regressionByDimension.length == dimensionKeys.length;
      }

      final stats = map['dimension_stats'];
      if (stats is Map<String, dynamic>) {
        _dimensionStats = {};
        for (final dim in dimensionKeys) {
          final s = stats[dim];
          if (s is Map<String, dynamic>) {
            _dimensionStats[dim] = _DimensionStat(
              mean: (s['mean'] as num?)?.toDouble() ?? 3.0,
              p25: (s['p25'] as num?)?.toDouble() ?? 2.5,
              p75: (s['p75'] as num?)?.toDouble() ?? 3.5,
            );
          }
        }
      }

      final bench = map['feature_benchmarks'];
      if (bench is Map) {
        _featureBenchmarks = bench.map(
          (k, v) => MapEntry(k.toString(), (v as num).toDouble()),
        );
      }

      final playbook = map['improvement_playbook'];
      if (playbook is Map<String, dynamic>) {
        final ft = playbook['feature_tips'];
        if (ft is Map) {
          _featureTips = ft.map(
            (k, v) => MapEntry(k.toString(), v.toString()),
          );
        }
        final dt = playbook['dimension_tips'];
        if (dt is Map) {
          _dimensionTips = dt.map((k, v) {
            final list = v is List ? v.map((e) => e.toString()).toList() : <String>[];
            return MapEntry(k.toString(), list);
          });
        }
        final mt = playbook['mcq_error_templates'];
        if (mt is Map) {
          _mcqErrorTemplates = mt.map(
            (k, v) => MapEntry(k.toString(), v.toString()),
          );
        }
      }

      final spd = map['skill_primary_dimensions'];
      if (spd is Map) {
        _skillPrimaryDimensions = spd.map((k, v) {
          final list =
              v is List ? v.map((e) => e.toString()).toList() : <String>[];
          return MapEntry(k.toString(), list);
        });
      }
    } catch (_) {
      _hasTrainedRegression = false;
    }
  }

  /// Writing must be in English and meet minimum quality heuristics.
  static bool meetsWritingQuality(String text, {int minWords = 8}) {
    final trimmed = text.trim();
    if (trimmed.isEmpty) return false;
    if (EnglishTextValidator.isPredominantlySpanish(trimmed)) return false;
    if (!EnglishTextValidator.hasMinimalEnglish(trimmed)) return false;

    final words = trimmed.split(RegExp(r'\s+')).where((w) => w.isNotEmpty);
    if (words.length < minWords) return false;
    final feat = extractTextFeatures(trimmed);
    final punct = feat['punctuation_error_fraction'] ?? 0;
    final unique = feat['unique_ratio'] ?? 0;
    final benchPunct = _featureBenchmarks['punctuation_error_fraction'] ?? 0.05;
    final benchLex = _featureBenchmarks['unique_ratio'] ?? 0.55;
    return punct <= benchPunct * 2.5 && unique >= benchLex * 0.55;
  }

  /// Exposed for UI validation before submit.
  static bool isSpanishWritingResponse(String text) =>
      EnglishTextValidator.isPredominantlySpanish(text.trim());

  /// Analiza la sesión y devuelve fortalezas / debilidades por habilidad (modelo ELL).
  static SkillAiFeedback analyze(SkillAssessmentInput input) {
    final dims = _scoreDimensions(input);
    final mistakes = _buildMistakes(input, dims);

    // Writing: open-text answers count toward pass/fail and score.
    final scoredAnswers = input.skillKey == 'writing'
        ? input.quizAnswers
        : input.quizAnswers.where((q) => !q.isOpenText).toList();
    final quizCorrect = scoredAnswers.where((q) => q.isCorrect).length;
    final quizTotal = scoredAnswers.length;

    final focus = _skillDimensionFocus[input.skillKey] ??
        _skillDimensionFocus['reading']!;

    var weighted = 0.0;
    var weightSum = 0.0;
    for (final key in dimensionKeys) {
      final w = focus[key] ?? 0;
      weighted += (dims[key] ?? 3.0) * w;
      weightSum += w;
    }
    final overallDim = weightSum > 0 ? weighted / weightSum : 3.0;
    final dimPercent = ((overallDim - 1) / 4 * 100).clamp(0.0, 100.0);
    final quizPercent =
        quizTotal > 0 ? (quizCorrect / quizTotal) * 100.0 : dimPercent;

    // Precisión: el acierto del quiz pesa más cuando hay preguntas objetivas.
    final quizWeight = quizTotal > 0 ? 0.52 : 0.0;
    var percent =
        (dimPercent * (1 - quizWeight) + quizPercent * quizWeight).round();
    if (mistakes.isNotEmpty) {
      percent = math.min(percent, (quizPercent * 0.85 + dimPercent * 0.15).round());
    }

    // Visible score: pass band 70–95%; fail band 20–55% when answers are wrong.
    final performance = quizTotal > 0
        ? quizCorrect / quizTotal
        : (dimPercent / 100).clamp(0.0, 1.0);
    if (quizTotal > 0 && quizCorrect < quizTotal) {
      percent = (25 + performance * 35).round().clamp(20, 55);
    } else {
      percent = (70 + performance * 25).round().clamp(70, 95);
    }

    final feedbackLists = _buildStrengthsAndWeaknesses(
      input: input,
      dims: dims,
      percent: percent,
      quizCorrect: quizCorrect,
      quizTotal: quizTotal,
    );
    final strengths = feedbackLists.strengths;
    final weaknesses = feedbackLists.weaknesses;

    final summary = _buildSummary(
      input,
      percent,
      dims,
      mistakes.length,
      quizCorrect: quizCorrect,
      quizTotal: quizTotal,
    );

    return SkillAiFeedback(
      skillKey: input.skillKey,
      taskTitle: input.taskTitle,
      overallPercent: percent,
      dimensionScores: dims,
      strengths: strengths.take(4).toList(),
      weaknesses: weaknesses.take(5).toList(),
      summary: summary,
      mistakes: mistakes,
      quizCorrect: quizCorrect,
      quizTotal: quizTotal,
    );
  }

  static Map<String, double> _scoreDimensions(SkillAssessmentInput input) {
    final base = {
      for (final k in dimensionKeys)
        k: _dimensionStats[k]?.mean ?? 3.0,
    };

    _applyPerQuestionScores(base, input);

    final open = input.quizAnswers.where((q) => q.isOpenText).toList();
    final text = [
      if (input.combinedOpenText != null &&
          input.combinedOpenText!.trim().isNotEmpty)
        input.combinedOpenText!.trim(),
      ...open.map((q) => q.userText ?? '').where((t) => t.trim().isNotEmpty),
    ].join('\n\n');

    if (text.trim().isNotEmpty) {
      _applyTextFeatures(base, text, weight: 0.72);
      for (final q in open) {
        if (q.userText != null && q.userText!.trim().isNotEmpty) {
          _applyTextFeatures(base, q.userText!, weight: 0.35);
        }
      }
    }

    if (input.speakingMetrics != null) {
      _applySpeaking(base, input.speakingMetrics!);
    }

    if (input.skillKey == 'listening' && input.listenedToAudio) {
      base['cohesion'] = _blend(base['cohesion']!, base['cohesion']! + 0.35);
    } else if (input.skillKey == 'listening' && !input.listenedToAudio) {
      base['cohesion'] = _blend(base['cohesion']!, base['cohesion']! - 0.4);
    }

    if (input.skillKey == 'writing') {
      for (final q in open) {
        final t = q.userText?.trim() ?? '';
        if (t.isNotEmpty && EnglishTextValidator.isPredominantlySpanish(t)) {
          for (final k in dimensionKeys) {
            base[k] = 1.0;
          }
        }
      }
    }

    for (final k in dimensionKeys) {
      base[k] = _recastScore(base[k]!);
    }
    return base;
  }

  static void _applyPerQuestionScores(
    Map<String, double> base,
    SkillAssessmentInput input,
  ) {
    final primary =
        _skillPrimaryDimensions[input.skillKey] ??
        _skillDimensionFocus[input.skillKey]!.keys.toList();

    for (final q in input.quizAnswers) {
      final dims = _dimensionsForQuestion(input.skillKey, q, primary);
      final delta = q.isCorrect ? 0.55 : -0.65;
      for (var i = 0; i < dims.length; i++) {
        final d = dims[i];
        final w = 1.0 - (i * 0.2);
        base[d] = _blend(base[d]!, (base[d]! + delta * w).clamp(1.0, 5.0));
      }
    }
  }

  static List<String> _dimensionsForQuestion(
    String skillKey,
    QuizAnswerRecord q,
    List<String> primary,
  ) {
    final out = <String>[];
    void addAll(Iterable<String> dims) {
      for (final d in dims) {
        if (!out.contains(d)) out.add(d);
      }
    }

    if (q.isOpenText) {
      addAll(['grammar', 'conventions', 'cohesion', 'vocabulary']);
      return out;
    }
    final prompt = q.prompt.toLowerCase();
    if (prompt.contains('time') ||
        prompt.contains('when') ||
        prompt.contains('hora')) {
      addAll(['cohesion', 'syntax', ...primary]);
      return out;
    }
    if (prompt.contains('word') ||
        prompt.contains('vocab') ||
        prompt.contains('meaning')) {
      addAll(['vocabulary', 'cohesion', ...primary]);
      return out;
    }
    if (prompt.contains('grammar') || prompt.contains('tense')) {
      addAll(['grammar', 'syntax', ...primary]);
      return out;
    }
    addAll(primary);
    return out;
  }

  static void _applyTextFeatures(
    Map<String, double> base,
    String text, {
    double weight = 0.65,
  }) {
    final feat = extractTextFeatures(text);
    final heuristic = _heuristicScoresFromFeatures(feat);
    final trained = _hasTrainedRegression
        ? _predictFromTrainedRegression(feat)
        : null;

    for (final dim in dimensionKeys) {
      final h = heuristic[dim] ?? 3.0;
      final t = trained?[dim];
      var merged = t != null ? (h * 0.25 + t * 0.75) : h;
      merged = _adjustByBenchmarks(feat, dim, merged);
      base[dim] = base[dim]! * (1 - weight) + merged * weight;
    }
  }

  static double _adjustByBenchmarks(
    Map<String, double> feat,
    String dim,
    double score,
  ) {
    if (_featureBenchmarks.isEmpty) return score;
    var adj = 0.0;
    var n = 0;
    void cmp(String key, bool higherIsBetter) {
      final b = _featureBenchmarks[key];
      if (b == null) return;
      final v = feat[key] ?? 0;
      final ratio = higherIsBetter ? v / b : b / math.max(v, 1e-6);
      adj += ratio.clamp(0.5, 1.15);
      n++;
    }
    switch (dim) {
      case 'vocabulary':
        cmp('unique_ratio', true);
        cmp('unigram_count', true);
      case 'syntax':
        cmp('avg_sentence_length', true);
      case 'grammar':
      case 'conventions':
        cmp('punctuation_error_fraction', false);
        cmp('capitalization_score', true);
      case 'cohesion':
        cmp('line_breaks', true);
      case 'phraseology':
        cmp('avg_word_length', true);
        cmp('capitalization_score', true);
    }
    if (n == 0) return score;
    final factor = (adj / n);
    return (score * 0.6 + (1 + (factor - 1) * 4) * 0.4).clamp(1.0, 5.0);
  }

  static List<QuizMistakeDetail> _buildMistakes(
    SkillAssessmentInput input,
    Map<String, double> dims,
  ) {
    final out = <QuizMistakeDetail>[];
    final primary =
        _skillPrimaryDimensions[input.skillKey] ??
        ['cohesion', 'vocabulary'];

    for (final q in input.quizAnswers) {
      if (q.isOpenText) {
        final text = q.userText?.trim() ?? '';
        if (EnglishTextValidator.isPredominantlySpanish(text)) {
          out.add(
            QuizMistakeDetail(
              questionLabel: 'Question ${q.questionIndex + 1} (Writing)',
              prompt: q.prompt,
              userAnswer: text.isEmpty ? '(no text)' : text,
              correctAnswer:
                  'A complete answer in English (at least ${q.minWords} words)',
              primaryDimension: 'grammar',
              whatWentWrong:
                  'This activity requires English. Your response appears to be in Spanish '
                  'and cannot be scored as a writing submission.',
              howToImprove:
                  'Rewrite your answer in English using full sentences, correct grammar, '
                  'and academic punctuation.',
            ),
          );
          continue;
        }
        if (q.isCorrect) continue;

        final gaps = _textGapsVsDatabase(text);
        final dim = _weakestDimension(dims, ['grammar', 'conventions', 'cohesion']);
        out.add(
          QuizMistakeDetail(
            questionLabel: 'Question ${q.questionIndex + 1} (Writing)',
            prompt: q.prompt,
            userAnswer: text.isEmpty ? '(no text)' : text,
            correctAnswer:
                'At least ${q.minWords} words in English with sound grammar and punctuation',
            primaryDimension: dim,
            whatWentWrong: gaps.isEmpty
                ? 'Your English response does not meet the minimum quality expected for this task.'
                : gaps.join(' '),
            howToImprove: _improvementForDimension(dim, input.skillKey),
          ),
        );
        continue;
      }

      if (q.isCorrect) continue;

      final user = q.selectedChoice ?? '(no selection)';
      final correct = q.correctChoice ?? '(see activity solution)';
      final dim = _dimensionsForQuestion(input.skillKey, q, primary).first;

      out.add(
        QuizMistakeDetail(
          questionLabel: 'Question ${q.questionIndex + 1}',
          prompt: q.prompt,
          userAnswer: user,
          correctAnswer: correct,
          primaryDimension: dim,
          whatWentWrong: _mcqWhatWentWrong(input.skillKey, q, user, correct),
          howToImprove: _improvementForDimension(dim, input.skillKey),
        ),
      );
    }

    final speaking = input.speakingMetrics;
    if (speaking != null) {
      for (var i = 0; i < speaking.targetPhrases.length; i++) {
        final target = speaking.targetPhrases[i];
        final heard = i < speaking.heardTranscripts.length
            ? speaking.heardTranscripts[i]
            : '';
        final ratio = i < speaking.phraseMatchRatios.length
            ? speaking.phraseMatchRatios[i]
            : 0.0;
        final attempts = i < speaking.attemptsPerPhrase.length
            ? speaking.attemptsPerPhrase[i]
            : 1;
        if (ratio >= 0.92 && attempts <= 2) continue;

        out.add(
          QuizMistakeDetail(
            questionLabel: 'Phrase ${i + 1} (Speaking)',
            prompt: target,
            userAnswer: heard.isEmpty ? '(not recognized)' : heard,
            correctAnswer: target,
            primaryDimension: 'phraseology',
            whatWentWrong: ratio < 0.92
                ? 'Match ~${(ratio * 100).round()}% with the model phrase—'
                    'the trained model links accurate oral expression to phraseology.'
                : 'You needed $attempts attempts; fluency affects your speaking score.',
            howToImprove: _improvementForDimension('phraseology', 'speaking'),
          ),
        );
      }
    }

    return out;
  }

  static String _weakestDimension(
    Map<String, double> dims,
    List<String> candidates,
  ) {
    var worst = candidates.first;
    var low = dims[worst] ?? 5.0;
    for (final c in candidates) {
      final v = dims[c] ?? 5.0;
      if (v < low) {
        low = v;
        worst = c;
      }
    }
    return worst;
  }

  static List<String> _textGapsVsDatabase(String text) {
    if (text.trim().isEmpty) {
      return ['No text was submitted for the trained writing model to analyze.'];
    }
    final feat = extractTextFeatures(text);
    final gaps = <String>[];
    for (final entry in _featureBenchmarks.entries) {
      final key = entry.key;
      final bench = entry.value;
      final val = feat[key] ?? 0;
      final tip = _featureTips[key];
      if (tip == null) continue;
      final below = switch (key) {
        'punctuation_error_fraction' => val > bench * 1.35,
        'capitalization_score' => val < bench * 0.85,
        'unique_ratio' => val < bench * 0.8,
        'unigram_count' => val < bench * 0.45,
        'avg_sentence_length' => val < bench * 0.65 || val > bench * 1.6,
        _ => false,
      };
      if (below) gaps.add(tip);
    }
    if (gaps.isEmpty && !meetsWritingQuality(text)) {
      gaps.add(
        'Your text is below the accepted-essay threshold in essay_dataset.csv.',
      );
    }
    return gaps.take(3).toList();
  }

  static const Map<String, String> _mcqErrorTemplatesEn = {
    'listening':
        'You missed a listening detail. Replay the audio and note numbers, times, and key nouns.',
    'reading':
        'The correct answer needs close reading—look for paraphrases, not only matching words.',
    'writing':
        'Review grammar and conventions (capitalization, verb tenses) like scored essays in the training set.',
    'speaking':
        'Your utterance did not match the model phrase closely enough—repeat in smaller chunks.',
  };

  static String _mcqWhatWentWrong(
    String skillKey,
    QuizAnswerRecord q,
    String user,
    String correct,
  ) {
    final template = _mcqErrorTemplatesEn[skillKey] ??
        _mcqErrorTemplates[skillKey] ??
        'Incorrect option for this question.';
    final buf = StringBuffer(template);
    if (user != correct) {
      buf.write(' You chose "$user"; the best-aligned option is "$correct".');
    }
    if (q.prompt.toLowerCase().contains('not') ||
        q.prompt.toLowerCase().contains('except')) {
      buf.write(' Watch for negative wording—read exactly what the prompt asks.');
    }
    return buf.toString();
  }

  static String _improvementForDimension(String dim, String skillKey) {
    final specific = _skillWeaknessCopy[skillKey]?[dim];
    if (specific != null) return specific;
    final tips = _dimensionTips[dim];
    if (tips != null && tips.isNotEmpty) {
      final idx = _tipIndexForSkill(skillKey, dim, tips.length);
      return _prefixSkillTip(skillKey, tips[idx]);
    }
    final label = _dimensionLabelEn(dim);
    return '${_skillLabelEn(skillKey)} · $label: review this dimension on your next attempt.';
  }

  static int _tipIndexForSkill(String skill, String dim, int len) {
    return (skill.hashCode ^ dim.hashCode).abs() % len;
  }

  static String _prefixSkillTip(String skill, String tip) {
    final label = _skillLabelEn(skill);
    return '[$label] $tip';
  }

  static ({List<String> strengths, List<String> weaknesses})
      _buildStrengthsAndWeaknesses({
    required SkillAssessmentInput input,
    required Map<String, double> dims,
    required int percent,
    required int quizCorrect,
    required int quizTotal,
  }) {
    final skill = input.skillKey;
    final primary = _skillPrimaryDimensions[skill] ??
        _skillDimensionFocus[skill]!.keys.take(3).toList();

    final strengths = <String>[];
    final weaknesses = <String>[];
    final seen = <String>{};

    void addStrength(String msg) {
      final t = msg.trim();
      if (t.isEmpty || !seen.add('s:$t')) return;
      strengths.add(t);
    }

    void addWeakness(String msg) {
      final t = msg.trim();
      if (t.isEmpty || !seen.add('w:$t')) return;
      weaknesses.add(t);
    }

    double strongCut(String key) {
      final stat = _dimensionStats[key];
      return stat != null
          ? math.max(_strengthThresholdRuntime, stat.p75)
          : _strengthThresholdRuntime;
    }

    double weakCut(String key) {
      final stat = _dimensionStats[key];
      return stat != null
          ? math.min(_weaknessThresholdRuntime, stat.p25)
          : _weaknessThresholdRuntime;
    }

    final ranked = primary
        .map((k) => (k, dims[k] ?? 3.0))
        .toList()
      ..sort((a, b) => b.$2.compareTo(a.$2));

    for (final (key, score) in ranked) {
      if (score >= strongCut(key)) {
        addStrength(_strengthMessage(skill, key, score));
      }
    }

    ranked.sort((a, b) => a.$2.compareTo(b.$2));
    for (final (key, score) in ranked) {
      if (score <= weakCut(key)) {
        addWeakness(_weaknessMessage(skill, key, score, input));
      }
    }

    _addSkillSessionSignals(
      input: input,
      dims: dims,
      addStrength: addStrength,
      addWeakness: addWeakness,
    );

    if (quizTotal > 0 && quizCorrect < quizTotal) {
      addWeakness(_skillQuizGapMessage(skill, quizCorrect, quizTotal));
    }

    if (strengths.isEmpty) {
      addStrength(
        _fallbackStrength(
          skill,
          percent,
          dims,
          primary,
          quizCorrect: quizCorrect,
          quizTotal: quizTotal,
          input: input,
        ),
      );
    }

    return (
      strengths: strengths.take(4).toList(),
      weaknesses: weaknesses.take(5).toList(),
    );
  }

  static void _addSkillSessionSignals({
    required SkillAssessmentInput input,
    required Map<String, double> dims,
    required void Function(String) addStrength,
    required void Function(String) addWeakness,
  }) {
    switch (input.skillKey) {
      case 'listening':
        if (input.listenedToAudio) {
          addStrength(
            'Listening session: you used the audio—this supports cohesion scores '
            'aligned with gist-and-detail comprehension in the trained model.',
          );
        } else if (input.quizAnswers.isNotEmpty) {
          addWeakness(
            'Listening: play the audio before answering; the model weights '
            'cohesion lower when audio is skipped.',
          );
        }
      case 'reading':
        final vocab = dims['vocabulary'] ?? 3.0;
        if (vocab >= (_dimensionStats['vocabulary']?.p75 ?? 3.4)) {
          addStrength(
            'Reading: lexical inference from the passage was strong—vocabulary '
            'dimension matches high-scoring ASAP2 comprehension profiles.',
          );
        }
      case 'writing':
        final open = input.quizAnswers.where((q) => q.isOpenText).toList();
        if (open.isNotEmpty) {
          final avgWords = open
              .map((q) => (q.userText ?? '').trim().split(RegExp(r'\s+')).length)
              .fold<int>(0, (a, b) => a + b);
          if (avgWords / open.length >= 15) {
            addStrength(
              'Writing: response length and structure fit essay_dataset norms '
              'for grammar and conventions scoring.',
            );
          }
        }
      case 'speaking':
        final metrics = input.speakingMetrics;
        if (metrics != null) {
          final matchPct = (metrics.averageMatch * 100).round();
          if (metrics.averageMatch >= 0.88) {
            addStrength(
              'Speaking: pronunciation match ~$matchPct% on target phrases—'
              'phraseology dimension reflects natural oral expression in the model.',
            );
          } else if (metrics.averageMatch < 0.78) {
            addWeakness(
              'Speaking: pronunciation match ~$matchPct%—slow down and mirror '
              'stress patterns from the model phrase (phraseology focus).',
            );
          }
        }
    }
  }

  static String _fallbackStrength(
    String skill,
    int percent,
    Map<String, double> dims,
    List<String> primary, {
    required int quizCorrect,
    required int quizTotal,
    required SkillAssessmentInput input,
  }) {
    final topDim = primary.isEmpty
        ? 'cohesion'
        : primary.reduce(
            (a, b) => (dims[a] ?? 0) >= (dims[b] ?? 0) ? a : b,
          );
    final score = dims[topDim] ?? 3.0;
    final label = _dimensionLabelEn(topDim);
    final skillLabel = _skillLabelEn(skill);
    final quizNote = quizTotal > 0 ? ' · $quizCorrect/$quizTotal correct' : '';
    return switch (skill) {
      'listening' =>
        'Listening ($percent%$quizNote): solid gist tracking on $label '
        '(${score.toStringAsFixed(1)}/5 vs ELL dataset p75).',
      'speaking' =>
        'Speaking ($percent%$quizNote): intelligible delivery on $label '
        '(${score.toStringAsFixed(1)}/5)—keep mirroring model phrases.',
      'reading' =>
        'Reading ($percent%$quizNote): reliable comprehension on $label '
        '(${score.toStringAsFixed(1)}/5)—close to trained upper-quartile readers.',
      'writing' =>
        'Writing ($percent%$quizNote): acceptable control of $label '
        '(${score.toStringAsFixed(1)}/5) for essay-style responses.',
      _ =>
        '$skillLabel ($percent%): strongest on $label (${score.toStringAsFixed(1)}/5).',
    };
  }

  static String _skillQuizGapMessage(
    String skill,
    int correct,
    int total,
  ) {
    final missed = total - correct;
    return switch (skill) {
      'listening' =>
        'Listening accuracy: $correct/$total—re-listen for numbers, times, and '
        'key nouns before changing answers ($missed missed).',
      'reading' =>
        'Reading accuracy: $correct/$total—scan the passage for paraphrases, '
        'not only exact words ($missed missed).',
      'writing' =>
        'Writing checklist: $correct/$total—revise grammar, punctuation, and '
        'formal tone like scored essays in the training set ($missed to refine).',
      'speaking' =>
        'Speaking validation: $correct/$total phrases matched—repeat difficult '
        'chunks slowly ($missed need more practice).',
      _ => 'Quiz score: $correct/$total ($missed incorrect).',
    };
  }

  /// Features alineados con `export_fluidlearn_weights.py` (Training_IA).
  static Map<String, double> extractTextFeatures(String text) {
    final words = _tokenize(text);
    final unigramCount = words.length.toDouble();
    final uniqueRatio = unigramCount > 0
        ? words.toSet().length / unigramCount
        : 0.0;
    return {
      'unigram_count': unigramCount,
      'unique_ratio': uniqueRatio,
      'avg_sentence_length': _avgSentenceLength(text),
      'avg_word_length': _avgWordLength(words),
      'punctuation_error_fraction': _punctuationErrorFraction(text),
      'capitalization_score': _capitalizationScore(text),
      'line_breaks': '\n'.allMatches(text).length.toDouble(),
    };
  }

  static Map<String, double> _heuristicScoresFromFeatures(
    Map<String, double> feat,
  ) {
    final unigramCount = feat['unigram_count']!;
    final uniqueRatio = feat['unique_ratio']!;
    final lineBreaks = feat['line_breaks']!;
    final punctErr = feat['punctuation_error_fraction']!;
    final capScore = feat['capitalization_score']!;
    return {
      'vocabulary': _mapFeature(
        unigramCount,
        low: 8,
        high: 45,
        min: 2.2,
        max: 4.8,
      ) *
          (0.6 + uniqueRatio * 0.4),
      'syntax': _mapFeature(
        feat['avg_sentence_length']!,
        low: 6,
        high: 22,
        min: 2.5,
        max: 4.5,
      ),
      'cohesion': _mapFeature(lineBreaks, low: 0, high: 4, min: 2.8, max: 4.2),
      'grammar': 4.5 - punctErr * 2.2,
      'conventions': 4.6 - punctErr * 2.5,
      'phraseology': capScore,
    };
  }

  static Map<String, double>? _predictFromTrainedRegression(
    Map<String, double> feat,
  ) {
    if (!_hasTrainedRegression) return null;
    final out = <String, double>{};
    for (final dim in dimensionKeys) {
      final model = _regressionByDimension[dim];
      if (model == null) return null;
      var zSum = model.intercept;
      for (final name in _featureNames) {
        final mean = _featureMean[name] ?? 0;
        final std = (_featureStd[name] ?? 1).clamp(1e-6, double.infinity);
        final z = ((feat[name] ?? 0) - mean) / std;
        zSum += (model.coefficients[name] ?? 0) * z;
      }
      out[dim] = zSum.clamp(1.0, 5.0);
    }
    return out;
  }

  static double _avgWordLength(List<String> words) {
    if (words.isEmpty) return 0;
    var total = 0;
    for (final w in words) {
      total += w.length;
    }
    return total / words.length;
  }

  static void _applySpeaking(
    Map<String, double> base,
    SpeakingSessionMetrics metrics,
  ) {
    final match = metrics.averageMatch.clamp(0.0, 1.0);
    final phraseScore = 1 + match * 4;
    final attempts = metrics.totalValidationAttempts;
    final fluencyPenalty = attempts > metrics.phraseMatchRatios.length * 3
        ? 0.35
        : (attempts > metrics.phraseMatchRatios.length * 2 ? 0.15 : 0.0);

    base['phraseology'] = _blend(base['phraseology']!, phraseScore - fluencyPenalty);
    base['vocabulary'] = _blend(base['vocabulary']!, phraseScore);
    base['grammar'] = _blend(base['grammar']!, phraseScore - fluencyPenalty * 0.5);
    base['cohesion'] = _blend(base['cohesion']!, phraseScore * 0.9);

    for (var i = 0; i < metrics.heardTranscripts.length; i++) {
      final heard = metrics.heardTranscripts[i];
      if (heard.trim().isEmpty) continue;
      _applyTextFeatures(base, heard);
    }
  }

  /// Replica `english_utils` + normalización del competo.
  static double _punctuationErrorFraction(String text) {
    const punct = "'!(),-./:;?\"";
    var punctCount = 0;
    for (var i = 0; i < text.length; i++) {
      if (punct.contains(text[i])) punctCount++;
    }
    if (punctCount == 0) return 0;

    final missingTrail =
        RegExp(r'[.,!?](?!\s)[^"\n\r' "'']").allMatches(text).length;
    final extraLead = RegExp(r'\s[.,!?:;]').allMatches(text).length;
    final missingParen = RegExp(r'(?<!\s)\(').allMatches(text).length;
    var pairedErr = 0;
    for (final pair in <(String, String)>[
      ('(', ')'),
      ('"', '"'),
      ("'", "'"),
    ]) {
      pairedErr += (text.split(pair.$1).length - text.split(pair.$2).length).abs();
    }
    final err = missingTrail + extraLead + missingParen + pairedErr;
    return (err / punctCount).clamp(0.0, 2.0);
  }

  static double _capitalizationScore(String text) {
    final iCount = RegExp(r'\bi\b').allMatches(text).length;
    final upperICount = RegExp(r'\bI\b').allMatches(text).length;
    final total = iCount + upperICount;
    if (total == 0) return 3.5;
    return 1 + (upperICount / total) * 4;
  }

  static List<String> _tokenize(String text) {
    final cleaned = text
        .replaceAll(RegExp(r'[\r\n]+'), ' ')
        .replaceAll(RegExp(r"[^\w\s']"), ' ')
        .toLowerCase();
    return cleaned.split(RegExp(r'\s+')).where((w) => w.isNotEmpty).toList();
  }

  static double _avgSentenceLength(String text) {
    final parts = text.split(RegExp(r'[.!?]+')).where((s) => s.trim().isNotEmpty);
    if (parts.isEmpty) return _tokenize(text).length.toDouble();
    final lens = parts.map((s) => _tokenize(s).length).toList();
    return lens.isEmpty ? 0 : lens.reduce((a, b) => a + b) / lens.length;
  }

  static double _mapFeature(
    num value, {
    required num low,
    required num high,
    required double min,
    required double max,
  }) {
    if (value <= low) return min;
    if (value >= high) return max;
    final t = (value - low) / (high - low);
    return min + t * (max - min);
  }

  static double _blend(double current, double incoming) =>
      (current * 0.45 + incoming * 0.55);

  /// Igual que `ModelTrainer.recast_scores` en Python.
  static double _recastScore(double raw) {
    var v = (raw * 2).round() / 2;
    if (v > 5) v = 5;
    if (v < 1) v = 1;
    return v;
  }

  static String _dimensionLabelEn(String key) => switch (key) {
        'cohesion' => 'cohesion & comprehension',
        'syntax' => 'syntax',
        'vocabulary' => 'vocabulary',
        'phraseology' => 'phraseology & oral expression',
        'grammar' => 'grammar',
        'conventions' => 'conventions & punctuation',
        _ => key,
      };

  static String _skillLabelEn(String skillKey) => switch (skillKey) {
        'listening' => 'Listening',
        'speaking' => 'Speaking',
        'reading' => 'Reading',
        'writing' => 'Writing',
        _ => skillKey,
      };

  /// Fortalezas por habilidad × dimensión (prioridad del modelo entrenado).
  static const Map<String, Map<String, String>> _skillStrengthCopy = {
    'listening': {
      'cohesion':
          'Listening · cohesion: you tracked main ideas and supporting details from the audio (model score {score}/5).',
      'vocabulary':
          'Listening · vocabulary: you caught key words and phrases in context—strong lexical uptake from the clip.',
      'syntax':
          'Listening · syntax: you linked who-did-what details correctly when answering detail questions.',
    },
    'reading': {
      'vocabulary':
          'Reading · vocabulary: you inferred word meaning from context—matches high lexical_richness in ASAP2 texts.',
      'cohesion':
          'Reading · cohesion: you followed the passage structure and answered gist/detail items accurately.',
      'syntax':
          'Reading · syntax: you parsed sentence structure to locate evidence in the text.',
    },
    'writing': {
      'grammar':
          'Writing · grammar: your sentences show solid subject–verb agreement and tense control (essay_dataset grammar dimension).',
      'conventions':
          'Writing · conventions: punctuation and capitalization align with scored academic essays in the training set.',
      'vocabulary':
          'Writing · vocabulary: you used varied, precise wording instead of repeating the same terms.',
      'cohesion':
          'Writing · cohesion: ideas flow logically with clear paragraph focus.',
    },
    'speaking': {
      'phraseology':
          'Speaking · phraseology: your phrasing matched natural collocations from the model prompts.',
      'vocabulary':
          'Speaking · vocabulary: you pronounced content words clearly enough for reliable recognition.',
      'grammar':
          'Speaking · grammar: your utterances kept basic tense and agreement while speaking aloud.',
    },
  };

  /// Áreas a mejorar por habilidad × dimensión.
  static const Map<String, Map<String, String>> _skillWeaknessCopy = {
    'listening': {
      'cohesion':
          'Listening · cohesion: replay the audio; jot the main idea and one detail before each answer.',
      'vocabulary':
          'Listening · vocabulary: note unfamiliar words from the clip and guess meaning from surrounding words.',
      'syntax':
          'Listening · syntax: focus on subject + verb + object order in what you hear before selecting options.',
    },
    'reading': {
      'vocabulary':
          'Reading · vocabulary: underline unknown words and check how the paragraph defines or contrasts them.',
      'cohesion':
          'Reading · cohesion: skim for the topic sentence first, then read for supporting details.',
      'syntax':
          'Reading · syntax: break long sentences into chunks (who / did what / when) before answering.',
    },
    'writing': {
      'grammar':
          'Writing · grammar: proofread subject–verb agreement and verb tenses in every sentence you submit.',
      'conventions':
          'Writing · conventions: check commas, end punctuation, and capital letters on each sentence you submit.',
      'vocabulary':
          'Writing · vocabulary: replace repeated words with synonyms to raise lexical variety.',
      'cohesion':
          'Writing · cohesion: add connectors (however, therefore, for example) to link your ideas.',
    },
    'speaking': {
      'phraseology':
          'Speaking · phraseology: listen to the model, then repeat in short chunks with correct stress.',
      'vocabulary':
          'Speaking · vocabulary: exaggerate stressed syllables on key content words so recognition improves.',
      'grammar':
          'Speaking · grammar: keep one idea per phrase; avoid switching tenses mid-sentence.',
    },
  };

  static String _strengthMessage(String skill, String dim, double score) {
    final template = _skillStrengthCopy[skill]?[dim];
    if (template != null) {
      return template.replaceAll('{score}', score.toStringAsFixed(1));
    }
    final label = _dimensionLabelEn(dim);
    return '${_skillLabelEn(skill)} · $label: strong performance (${score.toStringAsFixed(1)}/5 on the trained ELL scale).';
  }

  static String _weaknessMessage(
    String skill,
    String dim,
    double score,
    SkillAssessmentInput input,
  ) {
    final template = _skillWeaknessCopy[skill]?[dim];
    if (template != null) {
      return template.replaceAll('{score}', score.toStringAsFixed(1));
    }
    final tips = _dimensionTips[dim];
    if (tips != null && tips.isNotEmpty) {
      final idx = _tipIndexForSkill(skill, dim, tips.length);
      return _prefixSkillTip(skill, tips[idx]);
    }
    final label = _dimensionLabelEn(dim);
    return '${_skillLabelEn(skill)} · $label: needs work (${score.toStringAsFixed(1)}/5)—focus on this dimension next session.';
  }

  static String _buildSummary(
    SkillAssessmentInput input,
    int percent,
    Map<String, double> dims,
    int mistakeCount, {
    int quizCorrect = 0,
    int quizTotal = 0,
  }) {
    final skill = _skillLabelEn(input.skillKey);
    final buf = StringBuffer('$skill · ${input.taskTitle}: $percent%.');
    if (quizTotal > 0) {
      buf.write(' Score $quizCorrect/$quizTotal.');
    }
    if (mistakeCount > 0) {
      buf.write(' $mistakeCount item(s) to review below.');
    }
    if (input.speakingMetrics != null) {
      final m = (input.speakingMetrics!.averageMatch * 100).round();
      buf.write(' Pronunciation match ~$m%.');
    }
    return buf.toString().trim();
  }

  /// Calcula si una respuesta MCQ es correcta.
  static bool isMcqCorrect(int? selected, int correctIndex) =>
      selected != null && selected == correctIndex;

  /// Ratio de coincidencia STT vs frase objetivo (Speaking).
  static double phraseMatchRatio(String heard, String target) {
    if (SpeakingPronunciationMatch.isCloseEnough(heard, target)) {
      final h = SpeakingPronunciationMatch.normalize(heard).split(' ');
      final t = SpeakingPronunciationMatch.normalize(target).split(' ');
      if (t.isEmpty) return 1.0;
      var matched = 0;
      for (final w in t) {
        if (w.length <= 2 || h.any((x) => x == w || x.contains(w))) matched++;
      }
      return (matched / t.length).clamp(0.68, 1.0);
    }
    final h = SpeakingPronunciationMatch.normalize(heard).split(' ');
    final t = SpeakingPronunciationMatch.normalize(target).split(' ');
    if (t.isEmpty) return 0.0;
    var matched = 0;
    for (final w in t) {
      if (w.length <= 2) {
        matched++;
        continue;
      }
      if (h.any((x) => x == w || x.startsWith(w.substring(0, math.min(3, w.length))))) {
        matched++;
      }
    }
    return matched / t.length;
  }
}

class _TrainedDimensionModel {
  const _TrainedDimensionModel({
    required this.intercept,
    required this.coefficients,
  });

  final double intercept;
  final Map<String, double> coefficients;
}

class _DimensionStat {
  const _DimensionStat({
    required this.mean,
    required this.p25,
    required this.p75,
  });

  final double mean;
  final double p25;
  final double p75;
}
