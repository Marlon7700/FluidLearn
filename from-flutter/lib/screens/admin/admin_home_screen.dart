import 'package:flutter/material.dart';

import '../../app_state.dart';
import '../../data/skill_tasks_catalog.dart';
import '../../services/admin_service.dart';
import '../../services/auth_service.dart';
import '../../theme/fluidlearn_colors.dart';
import '../../utils/skill_level.dart';
import '../../widgets/fluidlearn_logo_image.dart';
import 'admin_skill_content_screen.dart';

class AdminHomeScreen extends StatefulWidget {
  const AdminHomeScreen({super.key});

  @override
  State<AdminHomeScreen> createState() => _AdminHomeScreenState();
}

class _AdminHomeScreenState extends State<AdminHomeScreen>
    with SingleTickerProviderStateMixin {
  late final TabController _tabs;

  @override
  void initState() {
    super.initState();
    _tabs = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabs.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: FluidLearnColors.scaffold,
      appBar: AppBar(
        title: const Text('Administración — FluidLearn'),
        backgroundColor: FluidLearnColors.scaffold,
        foregroundColor: FluidLearnColors.brandBlue,
        bottom: TabBar(
          controller: _tabs,
          labelColor: FluidLearnColors.brandBlue,
          unselectedLabelColor: const Color(0xFF7A879A),
          indicatorColor: FluidLearnColors.brandBlue,
          tabs: const [
            Tab(text: 'Estudiantes', icon: Icon(Icons.people_outline_rounded)),
            Tab(
              text: 'Contenido IA',
              icon: Icon(Icons.auto_awesome_rounded),
            ),
          ],
        ),
        actions: [
          IconButton(
            tooltip: 'Cerrar sesión',
            onPressed: () => AuthService().signOut(),
            icon: const Icon(Icons.logout_rounded),
          ),
        ],
      ),
      body: TabBarView(
        controller: _tabs,
        children: const [
          _StudentsTab(),
          _ContentTab(),
        ],
      ),
    );
  }
}

class _StudentsTab extends StatelessWidget {
  const _StudentsTab();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(20, 12, 20, 8),
          child: Row(
            children: [
              const FluidLearnLogoImage(size: 44),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      authController.appUser?.fullName.isNotEmpty == true
                          ? authController.appUser!.fullName
                          : 'Administrador',
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w700,
                        color: Color(0xFF1D2A44),
                      ),
                    ),
                    const Text(
                      'Calificaciones y habilidades',
                      style: TextStyle(
                        fontSize: 13,
                        color: Color(0xFF5F6F86),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        const Padding(
          padding: EdgeInsets.symmetric(horizontal: 20),
          child: Text(
            'Listening · Speaking · Reading · Writing (nivel CEFR y %)',
            style: TextStyle(fontSize: 12, color: Color(0xFF7A879A)),
          ),
        ),
        const SizedBox(height: 8),
        Expanded(
          child: StreamBuilder<List<StudentGradeRow>>(
            stream: AdminService.instance.watchStudents(),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Center(child: CircularProgressIndicator());
              }
              final rows = snapshot.data ?? [];
              if (rows.isEmpty) {
                return const Center(
                  child: Padding(
                    padding: EdgeInsets.all(24),
                    child: Text(
                      'No hay estudiantes registrados aún.',
                      textAlign: TextAlign.center,
                      style: TextStyle(color: Color(0xFF7A879A)),
                    ),
                  ),
                );
              }
              return ListView.separated(
                padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
                itemCount: rows.length,
                separatorBuilder: (_, __) => const SizedBox(height: 10),
                itemBuilder: (context, i) => _StudentCard(row: rows[i]),
              );
            },
          ),
        ),
      ],
    );
  }
}

class _ContentTab extends StatelessWidget {
  const _ContentTab();

  static const _skills = [
    (
      key: 'listening',
      title: 'Listening',
      subtitle: 'Audio + opción múltiple',
      icon: Icons.headphones_rounded,
      color: Color(0xFF20CE9F),
      bg: Color(0xFFEFFBF7),
    ),
    (
      key: 'speaking',
      title: 'Speaking',
      subtitle: 'Pronunciación y frases',
      icon: Icons.mic_rounded,
      color: Color(0xFFFFC229),
      bg: Color(0xFFFFFAEC),
    ),
    (
      key: 'reading',
      title: 'Reading',
      subtitle: 'Texto + comprensión',
      icon: Icons.menu_book_rounded,
      color: Color(0xFFF36D86),
      bg: Color(0xFFFFF3F6),
    ),
    (
      key: 'writing',
      title: 'Writing',
      subtitle: 'Redacción y gramática',
      icon: Icons.edit_rounded,
      color: Color(0xFF9A78FF),
      bg: Color(0xFFF7F3FF),
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
      children: [
        const Text(
          'Crear preguntas con IA',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.w800,
            color: FluidLearnColors.brandBlue,
          ),
        ),
        const SizedBox(height: 6),
        const Text(
          'Genera actividades por habilidad, publícalas en la nube y los estudiantes '
          'las reciben al abrir cada prueba en su home.',
          style: TextStyle(fontSize: 14, color: Color(0xFF5F6F86)),
        ),
        const SizedBox(height: 20),
        for (final s in _skills)
          Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: Material(
              color: s.bg,
              borderRadius: BorderRadius.circular(16),
              child: InkWell(
                borderRadius: BorderRadius.circular(16),
                onTap: () {
                  Navigator.of(context).push(
                    MaterialPageRoute<void>(
                      builder: (_) => AdminSkillContentScreen(
                        skillKey: s.key,
                        accentColor: s.color,
                        icon: s.icon,
                      ),
                    ),
                  );
                },
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    children: [
                      CircleAvatar(
                        backgroundColor: s.color.withAlpha(45),
                        child: Icon(s.icon, color: s.color),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              s.title,
                              style: const TextStyle(
                                fontSize: 17,
                                fontWeight: FontWeight.w700,
                                color: Color(0xFF1D2A44),
                              ),
                            ),
                            Text(
                              s.subtitle,
                              style: const TextStyle(
                                fontSize: 13,
                                color: Color(0xFF7A879A),
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              '${SkillTasksCatalog.forSkill(s.key).length} actividades',
                              style: TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.w600,
                                color: s.color,
                              ),
                            ),
                          ],
                        ),
                      ),
                      Icon(Icons.chevron_right_rounded, color: s.color),
                    ],
                  ),
                ),
              ),
            ),
          ),
      ],
    );
  }
}

class _StudentCard extends StatelessWidget {
  const _StudentCard({required this.row});

  final StudentGradeRow row;

  @override
  Widget build(BuildContext context) {
    return Card(
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
              row.fullName,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w700,
                color: Color(0xFF1D2A44),
              ),
            ),
            Text(
              row.studentId.isNotEmpty ? row.studentId : row.email,
              style: const TextStyle(fontSize: 12, color: Color(0xFF7A879A)),
            ),
            if (row.lastOverallPercent != null) ...[
              const SizedBox(height: 8),
              Text(
                'Última prueba: ${row.lastOverallPercent}%'
                '${row.lastTaskTitle != null ? ' · ${row.lastTaskTitle}' : ''}',
                style: const TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                  color: FluidLearnColors.brandBlue,
                ),
              ),
            ],
            const SizedBox(height: 12),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                for (final skill in SkillLevel.skills)
                  _SkillChip(
                    label: _skillShort(skill),
                    level: row.skillLevels[skill] ?? 'Unrated',
                    progress: row.skillProgress[skill] ?? 0,
                  ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  static String _skillShort(String key) => switch (key) {
        'listening' => 'L',
        'speaking' => 'S',
        'reading' => 'R',
        'writing' => 'W',
        _ => key,
      };
}

class _SkillChip extends StatelessWidget {
  const _SkillChip({
    required this.label,
    required this.level,
    required this.progress,
  });

  final String label;
  final String level;
  final double progress;

  @override
  Widget build(BuildContext context) {
    final pct = (progress * 100).round();
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: const Color(0xFFF4F8FE),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: const Color(0xFFE0E6EF)),
      ),
      child: Text(
        '$label $level · $pct%',
        style: const TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.w600,
          color: Color(0xFF2B374E),
        ),
      ),
    );
  }
}
