import 'package:flutter/material.dart';

import '../../app_state.dart';
import '../../data/skill_activity_quizzes.dart';
import '../../data/skill_tasks_catalog.dart';
import '../../models/published_skill_quiz.dart';
import '../../services/admin_content_service.dart';
import '../../theme/fluidlearn_colors.dart';
class AdminSkillContentScreen extends StatefulWidget {
  const AdminSkillContentScreen({
    super.key,
    required this.skillKey,
    required this.accentColor,
    required this.icon,
  });

  final String skillKey;
  final Color accentColor;
  final IconData icon;

  @override
  State<AdminSkillContentScreen> createState() => _AdminSkillContentScreenState();
}

class _AdminSkillContentScreenState extends State<AdminSkillContentScreen> {
  final _topicController = TextEditingController();
  final _content = AdminContentService.instance;
  String _levelLabel = 'B1';
  final Map<String, SkillQuiz> _drafts = {};
  bool _busy = false;

  List<SkillTaskDef> get _tasks => SkillTasksCatalog.forSkill(widget.skillKey);

  @override
  void dispose() {
    _topicController.dispose();
    super.dispose();
  }

  Future<void> _generateOne(SkillTaskDef task) async {
    final topic = _topicController.text.trim();
    if (topic.isEmpty) {
      _snack('Escribe un tema o instrucción para la IA.', isError: true);
      return;
    }
    setState(() {
      _drafts[task.id] = _content.generateDraft(
        skillKey: widget.skillKey,
        taskId: task.id,
        taskTitle: task.title,
        topic: topic,
        levelLabel: _levelLabel,
      );
    });
    _snack('Borrador generado: ${task.title}');
  }

  Future<void> _generateAll() async {
    final topic = _topicController.text.trim();
    if (topic.isEmpty) {
      _snack('Escribe un tema o instrucción para la IA.', isError: true);
      return;
    }
    setState(() {
      for (final task in _tasks) {
        _drafts[task.id] = _content.generateDraft(
          skillKey: widget.skillKey,
          taskId: task.id,
          taskTitle: task.title,
          topic: topic,
          levelLabel: _levelLabel,
        );
      }
    });
    _snack('Se generaron ${_tasks.length} actividades con IA.');
  }

  Future<void> _publish(SkillTaskDef task) async {
    final uid = authController.currentUser?.uid;
    if (uid == null) return;

    final draft = _drafts[task.id];
    if (draft == null) {
      _snack('Primero genera el borrador con IA.', isError: true);
      return;
    }

    final topic = _topicController.text.trim();
    if (topic.isEmpty) {
      _snack('Indica el tema del contenido.', isError: true);
      return;
    }

    setState(() => _busy = true);
    try {
      await _content.publish(
        adminUid: uid,
        skillKey: widget.skillKey,
        taskId: task.id,
        taskTitle: task.title,
        topic: topic,
        levelLabel: _levelLabel,
        quiz: draft,
      );
      if (mounted) {
        _snack('Publicado: los estudiantes verán este contenido al abrir la actividad.');
      }
    } catch (e) {
      if (mounted) _snack('Error al publicar: $e', isError: true);
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  Future<void> _unpublish(SkillTaskDef task) async {
    setState(() => _busy = true);
    try {
      await _content.unpublish(skillKey: widget.skillKey, taskId: task.id);
      _drafts.remove(task.id);
      if (mounted) _snack('Contenido retirado. Se usará el catálogo predeterminado.');
    } catch (e) {
      if (mounted) _snack('Error: $e', isError: true);
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  void _snack(String msg, {bool isError = false}) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(msg),
        backgroundColor: isError ? Colors.red : null,
      ),
    );
  }

  void _preview(SkillTaskDef task) {
    final draft = _drafts[task.id];
    if (draft == null) {
      _snack('Genera un borrador primero.', isError: true);
      return;
    }
    showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      showDragHandle: true,
      builder: (ctx) {
        return DraggableScrollableSheet(
          expand: false,
          initialChildSize: 0.65,
          minChildSize: 0.4,
          maxChildSize: 0.92,
          builder: (_, scroll) {
            return Padding(
              padding: const EdgeInsets.fromLTRB(20, 0, 20, 24),
              child: ListView(
                controller: scroll,
                children: [
                  Text(
                    task.title,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w700,
                      color: Color(0xFF1D2A44),
                    ),
                  ),
                  if (draft.intro != null) ...[
                    const SizedBox(height: 12),
                    Text(draft.intro!, style: const TextStyle(fontSize: 14)),
                  ],
                  if (draft.listenAloudText != null) ...[
                    const SizedBox(height: 12),
                    Text(
                      'Audio (TTS):\n${draft.listenAloudText}',
                      style: const TextStyle(
                        fontSize: 13,
                        fontStyle: FontStyle.italic,
                      ),
                    ),
                  ],
                  if (draft.speakPhrases != null) ...[
                    const SizedBox(height: 12),
                    const Text(
                      'Frases speaking:',
                      style: TextStyle(fontWeight: FontWeight.w600),
                    ),
                    ...draft.speakPhrases!.map((p) => Text('• $p')),
                  ],
                  const SizedBox(height: 12),
                  ...draft.questions.asMap().entries.map(
                        (e) => Padding(
                          padding: const EdgeInsets.only(bottom: 10),
                          child: Text(
                            '${e.key + 1}. ${e.value.prompt}',
                            style: const TextStyle(fontSize: 14),
                          ),
                        ),
                      ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final title = SkillTasksCatalog.skillTitle(widget.skillKey);

    return Scaffold(
      backgroundColor: FluidLearnColors.scaffold,
      appBar: AppBar(
        title: Text('Contenido · $title'),
        backgroundColor: FluidLearnColors.scaffold,
        foregroundColor: FluidLearnColors.brandBlue,
      ),
      body: _busy
          ? const Center(child: CircularProgressIndicator())
          : ListView(
              padding: const EdgeInsets.fromLTRB(16, 8, 16, 32),
              children: [
                Card(
                  elevation: 0,
                  color: widget.accentColor.withAlpha(28),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(14),
                    side: BorderSide(color: widget.accentColor.withAlpha(80)),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Row(
                      children: [
                        CircleAvatar(
                          backgroundColor: widget.accentColor.withAlpha(50),
                          child: Icon(widget.icon, color: widget.accentColor),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Text(
                            SkillTasksCatalog.skillTitleEs(widget.skillKey),
                            style: const TextStyle(
                              fontWeight: FontWeight.w700,
                              fontSize: 16,
                              color: Color(0xFF1D2A44),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                TextField(
                  controller: _topicController,
                  maxLines: 2,
                  decoration: const InputDecoration(
                    labelText: 'Tema o instrucción para la IA',
                    hintText: 'Ej.: Sostenibilidad en la USB, correos formales…',
                    border: OutlineInputBorder(),
                    filled: true,
                    fillColor: Colors.white,
                  ),
                ),
                const SizedBox(height: 12),
                DropdownButtonFormField<String>(
                  key: ValueKey(_levelLabel),
                  initialValue: _levelLabel,
                  decoration: const InputDecoration(
                    labelText: 'Nivel CEFR objetivo',
                    border: OutlineInputBorder(),
                    filled: true,
                    fillColor: Colors.white,
                  ),
                  items: const [
                    'Unrated',
                    'A1',
                    'A2',
                    'B1',
                    'B2',
                    'C1',
                    'C2',
                  ]
                      .map((l) => DropdownMenuItem(value: l, child: Text(l)))
                      .toList(),
                  onChanged: (v) {
                    if (v != null) setState(() => _levelLabel = v);
                  },
                ),
                const SizedBox(height: 16),
                FilledButton.icon(
                  onPressed: _generateAll,
                  icon: const Icon(Icons.auto_awesome_rounded),
                  label: const Text('Generar las 4 actividades con IA'),
                  style: FilledButton.styleFrom(
                    backgroundColor: FluidLearnColors.brandBlue,
                    padding: const EdgeInsets.symmetric(vertical: 14),
                  ),
                ),
                const SizedBox(height: 8),
                const Text(
                  'Revisa cada actividad, publícala y los estudiantes la verán al iniciar la prueba.',
                  style: TextStyle(fontSize: 12, color: Color(0xFF7A879A)),
                ),
                const SizedBox(height: 20),
                ..._tasks.map(_taskCard),
              ],
            ),
    );
  }

  Widget _taskCard(SkillTaskDef task) {
    final hasDraft = _drafts.containsKey(task.id);

    return StreamBuilder<PublishedSkillQuiz?>(
      stream: _content.watchPublished(
        skillKey: widget.skillKey,
        taskId: task.id,
      ),
      builder: (context, snap) {
        final published = snap.data;
        final updated = published?.updatedAt;

        return Card(
          margin: const EdgeInsets.only(bottom: 12),
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
            side: const BorderSide(color: Color(0xFFE0E6EF)),
          ),
          child: Padding(
            padding: const EdgeInsets.all(14),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  task.title,
                  style: const TextStyle(
                    fontWeight: FontWeight.w700,
                    fontSize: 15,
                    color: Color(0xFF1D2A44),
                  ),
                ),
                Text(
                  task.subtitle,
                  style: const TextStyle(fontSize: 12, color: Color(0xFF7A879A)),
                ),
                if (published != null) ...[
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      const Icon(
                        Icons.cloud_done_rounded,
                        size: 16,
                        color: Color(0xFF39CC9F),
                      ),
                      const SizedBox(width: 6),
                      Expanded(
                        child: Text(
                          'Publicado · ${published.topic}'
                          '${updated != null ? ' · ${_formatDate(updated)}' : ''}',
                          style: const TextStyle(
                            fontSize: 12,
                            color: Color(0xFF39CC9F),
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ],
                  ),
                ] else if (hasDraft) ...[
                  const SizedBox(height: 8),
                  const Text(
                    'Borrador listo (sin publicar)',
                    style: TextStyle(
                      fontSize: 12,
                      color: FluidLearnColors.brandBlue,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
                const SizedBox(height: 12),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    OutlinedButton.icon(
                      onPressed: () => _generateOne(task),
                      icon: const Icon(Icons.auto_awesome, size: 18),
                      label: const Text('Generar IA'),
                    ),
                    if (hasDraft)
                      OutlinedButton(
                        onPressed: () => _preview(task),
                        child: const Text('Vista previa'),
                      ),
                    FilledButton(
                      onPressed: hasDraft ? () => _publish(task) : null,
                      style: FilledButton.styleFrom(
                        backgroundColor: FluidLearnColors.brandBlue,
                      ),
                      child: const Text('Publicar'),
                    ),
                    if (published != null)
                      TextButton(
                        onPressed: () => _unpublish(task),
                        child: const Text(
                          'Retirar',
                          style: TextStyle(color: Color(0xFFCC3B5A)),
                        ),
                      ),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  String _formatDate(DateTime d) {
    final dd = d.day.toString().padLeft(2, '0');
    final mm = d.month.toString().padLeft(2, '0');
    return '$dd/$mm/${d.year}';
  }
}
