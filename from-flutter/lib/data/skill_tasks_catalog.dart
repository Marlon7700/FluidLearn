/// Catálogo de actividades por habilidad (estudiante y administración).
class SkillTaskDef {
  const SkillTaskDef({
    required this.id,
    required this.title,
    required this.subtitle,
  });

  final String id;
  final String title;
  final String subtitle;
}

abstract final class SkillTasksCatalog {
  SkillTasksCatalog._();

  static const tasksBySkill = <String, List<SkillTaskDef>>{
    'listening': [
      SkillTaskDef(
        id: 'listening_short_audio',
        title: 'Short audio clip',
        subtitle: 'Audio + Only selection',
      ),
      SkillTaskDef(
        id: 'listening_dialogue',
        title: 'Dialogue comprehension',
        subtitle: 'Audio + Only selection',
      ),
      SkillTaskDef(
        id: 'listening_gap',
        title: 'Gap-fill listening',
        subtitle: 'Audio + Only selection',
      ),
      SkillTaskDef(
        id: 'listening_news_blurb',
        title: 'News blurb',
        subtitle: 'Audio + Only selection',
      ),
    ],
    'speaking': [
      SkillTaskDef(
        id: 'speaking_pronunciation',
        title: 'Pronunciation drill',
        subtitle: 'Record + Validate pronunciation',
      ),
      SkillTaskDef(
        id: 'speaking_roleplay',
        title: 'Mini role-play',
        subtitle: 'Say phrases out loud',
      ),
      SkillTaskDef(
        id: 'speaking_picture',
        title: 'Describe the image',
        subtitle: 'Describe the scene out loud',
      ),
      SkillTaskDef(
        id: 'speaking_small_talk',
        title: 'Small talk',
        subtitle: 'Informal oral conversation',
      ),
    ],
    'reading': [
      SkillTaskDef(
        id: 'reading_skim',
        title: 'Skim a short text',
        subtitle: 'Reading + Only selection',
      ),
      SkillTaskDef(
        id: 'reading_detail',
        title: 'Detail questions',
        subtitle: 'Reading + Only selection',
      ),
      SkillTaskDef(
        id: 'reading_vocab',
        title: 'Vocabulary in context',
        subtitle: 'Reading + Only selection',
      ),
      SkillTaskDef(
        id: 'reading_hours_table',
        title: 'Hours & schedule',
        subtitle: 'Reading + Only selection',
      ),
    ],
    'writing': [
      SkillTaskDef(
        id: 'writing_sentence',
        title: 'Formal correspondence',
        subtitle: 'Writing · Only selection',
      ),
      SkillTaskDef(
        id: 'writing_paragraph',
        title: 'Academic punctuation',
        subtitle: 'Writing · Only selection',
      ),
      SkillTaskDef(
        id: 'writing_edit',
        title: 'Passive voice',
        subtitle: 'Writing · Only selection',
      ),
      SkillTaskDef(
        id: 'writing_micro_email',
        title: 'Connectors & integrity',
        subtitle: 'Writing · Only selection',
      ),
    ],
  };

  static List<SkillTaskDef> forSkill(String skillKey) =>
      tasksBySkill[skillKey] ?? const [];

  static String skillTitle(String key) => switch (key) {
        'listening' => 'Listening',
        'speaking' => 'Speaking',
        'reading' => 'Reading',
        'writing' => 'Writing',
        _ => key,
      };

  static String skillTitleEs(String key) => switch (key) {
        'listening' => 'Listening',
        'speaking' => 'Speaking',
        'reading' => 'Reading',
        'writing' => 'Writing',
        _ => key,
      };
}
