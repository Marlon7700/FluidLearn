/// Validates that learner writing is in English (Writing skill).
abstract final class EnglishTextValidator {
  EnglishTextValidator._();

  static final RegExp _spanishDiacritics = RegExp(r'[áéíóúüñ¿¡]');

  static final RegExp _wordToken = RegExp(r"[a-zA-Záéíóúüñ']+");

  static const Set<String> _spanishStopwords = {
    'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'al',
    'que', 'y', 'en', 'es', 'por', 'para', 'con', 'no', 'se', 'su', 'sus',
    'lo', 'como', 'más', 'pero', 'le', 'ya', 'sin', 'sobre', 'entre', 'cuando',
    'muy', 'también', 'me', 'hasta', 'hay', 'donde', 'qué', 'está', 'están',
    'son', 'fue', 'ser', 'esto', 'esta', 'estos', 'estas', 'tengo', 'tiene',
    'tenemos', 'puede', 'puedo', 'hacer', 'hecho', 'porque', 'aunque', 'desde',
    'hacia', 'nos', 'les', 'ese', 'esa', 'eso', 'aquí', 'allí', 'bien', 'mal',
    'todo', 'toda', 'todos', 'todas', 'algo', 'nada', 'solo', 'sólo', 'otro',
    'otra', 'mismo', 'misma', 'quien', 'cual', 'cuales', 'cuál', 'cuáles',
  };

  static const Set<String> _englishStopwords = {
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of',
    'with', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has',
    'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may',
    'might', 'this', 'that', 'these', 'those', 'it', 'its', 'they', 'them',
    'their', 'we', 'our', 'you', 'your', 'he', 'she', 'his', 'her', 'as', 'by',
    'from', 'not', 'can', 'about', 'into', 'than', 'then', 'there', 'when',
    'which', 'who', 'what', 'how', 'if', 'because', 'while', 'through', 'also',
  };

  /// True when the text is mostly Spanish (must be rejected in Writing).
  static bool isPredominantlySpanish(String text) {
    final trimmed = text.trim();
    if (trimmed.isEmpty) return false;

    final lower = trimmed.toLowerCase();
    if (_spanishDiacritics.hasMatch(lower)) return true;

    final words = _tokenize(lower);
    if (words.isEmpty) return false;

    var spanishHits = 0;
    var englishHits = 0;
    for (final w in words) {
      final clean = w.replaceAll(RegExp(r"[^a-záéíóúüñ]"), '');
      if (clean.isEmpty) continue;
      if (_spanishStopwords.contains(clean)) spanishHits++;
      if (_englishStopwords.contains(clean)) englishHits++;
    }

    if (spanishHits >= 2 && spanishHits > englishHits) return true;
    if (words.length >= 3 && spanishHits / words.length >= 0.2) return true;
    if (englishHits == 0 && spanishHits >= 1 && words.length >= 2) {
      return true;
    }

    return false;
  }

  /// At least a few common English function words (avoids approving random tokens).
  static bool hasMinimalEnglish(String text) {
    final words = _tokenize(text.toLowerCase());
    if (words.length < 3) return false;
    var englishHits = 0;
    for (final w in words) {
      if (_englishStopwords.contains(w)) englishHits++;
    }
    return englishHits >= 1;
  }

  static List<String> _tokenize(String lower) {
    return _wordToken
        .allMatches(lower)
        .map((m) => m.group(0)!)
        .where((w) => w.length > 1)
        .toList();
  }
}
