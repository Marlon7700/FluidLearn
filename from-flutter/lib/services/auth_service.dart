import 'dart:typed_data';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/foundation.dart' show debugPrint, kIsWeb;
import 'package:google_sign_in/google_sign_in.dart';
import 'package:image_picker/image_picker.dart';

import '../models/user_model.dart';
import '../utils/skill_level.dart';

class AuthService {
  static final AuthService _instance = AuthService._internal();
  factory AuthService() => _instance;
  AuthService._internal();

  final FirebaseAuth _auth = FirebaseAuth.instance;
  final GoogleSignIn _googleSignIn = GoogleSignIn();
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  Stream<User?> get authStateChanges => _auth.authStateChanges();

  User? get currentUser => _auth.currentUser;

  /// Correos con acceso al panel de administración (mismo login que estudiantes).
  static const Set<String> adminEmails = {
    'admin@usb.ve',
    'administracion@usb.ve',
  };

  static const Map<String, dynamic> _defaultSettings = {
    'appLanguage': 'es',
    'notifications': {
      'dailyReminders': true,
      'pendingActivities': true,
      'levelUpdates': true,
    },
    'skillProgress': {
      'listening': 0.0,
      'speaking': 0.0,
      'reading': 0.0,
      'writing': 0.0,
    },
  };

  static bool emailIsAdmin(String email) =>
      adminEmails.contains(email.trim().toLowerCase());

  Future<void> ensureUserRoleAfterSignIn(String uid, String email) async {
    final ref = _firestore.collection('users').doc(uid);
    final snap = await ref.get();
    final data = snap.data() ?? {};
    final existing = data['role'] as String?;
    final String role;
    if (existing == 'admin' || emailIsAdmin(email)) {
      role = 'admin';
    } else {
      role = existing ?? 'student';
    }
    await ref.set({'role': role, 'email': email}, SetOptions(merge: true));
  }

  /// Crea cuenta de administrador (Firebase Auth + Firestore con role admin).
  Future<UserCredential?> signUpAdminWithEmail({
    required String email,
    required String password,
    required String fullName,
    String? adminCode,
  }) async {
    const expectedCode = 'FLUIDLEARN-ADMIN';
    if (adminCode?.trim().toUpperCase() != expectedCode) {
      throw Exception(
        'Código de administrador incorrecto. El código institucional es FLUIDLEARN-ADMIN.',
      );
    }

    try {
      final normalizedEmail = email.trim().toLowerCase();
      final userCredential = await _auth.createUserWithEmailAndPassword(
        email: normalizedEmail,
        password: password,
      );

      await _firestore.collection('users').doc(userCredential.user!.uid).set({
        'uid': userCredential.user!.uid,
        'email': normalizedEmail,
        'fullName': fullName.trim(),
        'studentId': 'ADMIN',
        'profileComplete': true,
        'role': 'admin',
        'createdAt': DateTime.now().toIso8601String(),
        ..._defaultSettings,
      });

      return userCredential;
    } on FirebaseAuthException catch (e) {
      debugPrint('Error en registro admin: ${e.message}');
      rethrow;
    }
  }

  /// Guarda niveles CEFR en Firestore según progreso actual (home).
  Future<void> syncSkillLevelsFromProgress(String uid) async {
    final progress = await getSkillProgress(uid);
    final levels = SkillLevel.levelsFromProgress(progress);
    await _firestore.collection('users').doc(uid).set({
      'skillLevels': levels,
      'skillProgress': progress,
    }, SetOptions(merge: true));
  }

  Future<UserModel?> getUserProfile(String uid) async {
    try {
      final doc = await _firestore.collection('users').doc(uid).get();
      if (!doc.exists || doc.data() == null) return null;
      return UserModel.fromMap(doc.data()!);
    } catch (e) {
      debugPrint('Error obteniendo perfil: $e');
      return null;
    }
  }

  Future<Map<String, dynamic>> getUserSettings(String uid) async {
    try {
      final doc = await _firestore.collection('users').doc(uid).get();
      final raw = doc.data() ?? const <String, dynamic>{};

      final appLanguage = (raw['appLanguage'] as String?) ?? 'es';
      final notificationsRaw =
          (raw['notifications'] as Map<String, dynamic>?) ??
          const <String, dynamic>{};
      final progressRaw =
          (raw['skillProgress'] as Map<String, dynamic>?) ??
          const <String, dynamic>{};

      return {
        'appLanguage': appLanguage,
        'notifications': {
          'dailyReminders': notificationsRaw['dailyReminders'] ?? true,
          'pendingActivities': notificationsRaw['pendingActivities'] ?? true,
          'levelUpdates': notificationsRaw['levelUpdates'] ?? true,
        },
        'skillProgress': {
          'listening': (progressRaw['listening'] as num?)?.toDouble() ?? 0.0,
          'speaking': (progressRaw['speaking'] as num?)?.toDouble() ?? 0.0,
          'reading': (progressRaw['reading'] as num?)?.toDouble() ?? 0.0,
          'writing': (progressRaw['writing'] as num?)?.toDouble() ?? 0.0,
        },
      };
    } catch (e) {
      debugPrint('Error obteniendo settings: $e');
      return _defaultSettings;
    }
  }

  Future<void> updateAppLanguage({
    required String uid,
    required String languageCode,
  }) async {
    await _firestore.collection('users').doc(uid).set({
      'appLanguage': languageCode,
    }, SetOptions(merge: true));
  }

  Future<void> updateNotificationPreferences({
    required String uid,
    required bool dailyReminders,
    required bool pendingActivities,
    required bool levelUpdates,
  }) async {
    await _firestore.collection('users').doc(uid).set({
      'notifications': {
        'dailyReminders': dailyReminders,
        'pendingActivities': pendingActivities,
        'levelUpdates': levelUpdates,
      },
    }, SetOptions(merge: true));
  }

  Future<Map<String, double>> getSkillProgress(String uid) async {
    final settings = await getUserSettings(uid);
    final progress =
        (settings['skillProgress'] as Map<String, dynamic>?) ??
        const <String, dynamic>{};
    return {
      'listening': (progress['listening'] as num?)?.toDouble() ?? 0.0,
      'speaking': (progress['speaking'] as num?)?.toDouble() ?? 0.0,
      'reading': (progress['reading'] as num?)?.toDouble() ?? 0.0,
      'writing': (progress['writing'] as num?)?.toDouble() ?? 0.0,
    };
  }

  /// Actualiza el home y otras pantallas cuando cambia `skillProgress` en Firestore.
  Stream<Map<String, double>> watchSkillProgress(String uid) {
    return _firestore.collection('users').doc(uid).snapshots().map((snap) {
      final raw = snap.data() ?? const <String, dynamic>{};
      final progressRaw =
          (raw['skillProgress'] as Map<String, dynamic>?) ??
          const <String, dynamic>{};
      return {
        'listening': (progressRaw['listening'] as num?)?.toDouble() ?? 0.0,
        'speaking': (progressRaw['speaking'] as num?)?.toDouble() ?? 0.0,
        'reading': (progressRaw['reading'] as num?)?.toDouble() ?? 0.0,
        'writing': (progressRaw['writing'] as num?)?.toDouble() ?? 0.0,
      };
    });
  }

  /// Tareas completadas (mismo campo que usa el home para actividades pendientes).
  Stream<List<String>> watchCompletedTaskIds(String uid) {
    return _firestore.collection('users').doc(uid).snapshots().map((snap) {
      final raw = snap.data()?['completedTaskIds'];
      if (raw is! List) return <String>[];
      return raw.map((e) => e.toString()).toList();
    });
  }

  Future<UserCredential?> signUpWithEmail({
    required String email,
    required String password,
    required String fullName,
    required String studentId,
  }) async {
    try {
      final UserCredential userCredential = await _auth
          .createUserWithEmailAndPassword(email: email, password: password);

      await _firestore.collection('users').doc(userCredential.user!.uid).set({
        'uid': userCredential.user!.uid,
        'email': email,
        'fullName': fullName.trim(),
        'studentId': studentId.trim(),
        'profileComplete': true,
        'role': 'student',
        'createdAt': DateTime.now().toIso8601String(),
        ..._defaultSettings,
      });

      return userCredential;
    } on FirebaseAuthException catch (e) {
      debugPrint('Error en registro: ${e.message}');
      rethrow;
    }
  }

  Future<UserCredential?> signInWithEmail({
    required String email,
    required String password,
  }) async {
    try {
      final cred = await _auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
      await ensureUserRoleAfterSignIn(cred.user!.uid, email);
      return cred;
    } on FirebaseAuthException catch (e) {
      debugPrint('Error en inicio de sesión: ${e.message}');
      rethrow;
    }
  }

  /// En web usa el popup nativo de Firebase Auth; en móvil usa GoogleSignIn SDK.
  Future<UserCredential?> signInWithGoogle() async {
    try {
      final UserCredential userCredential;

      if (kIsWeb) {
        final provider = GoogleAuthProvider();
        userCredential = await _auth.signInWithPopup(provider);
      } else {
        final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();
        if (googleUser == null) return null;

        final GoogleSignInAuthentication googleAuth =
            await googleUser.authentication;

        final credential = GoogleAuthProvider.credential(
          accessToken: googleAuth.accessToken,
          idToken: googleAuth.idToken,
        );

        userCredential = await _auth.signInWithCredential(credential);
      }

      final email = userCredential.user?.email ?? '';
      if (userCredential.additionalUserInfo?.isNewUser ?? false) {
        await _firestore.collection('users').doc(userCredential.user!.uid).set({
          'uid': userCredential.user!.uid,
          'email': email,
          'fullName': '',
          'studentId': '',
          'profileComplete': false,
          'role': emailIsAdmin(email) ? 'admin' : 'student',
          'createdAt': DateTime.now().toIso8601String(),
          ..._defaultSettings,
        });
      } else {
        await ensureUserRoleAfterSignIn(userCredential.user!.uid, email);
      }

      return userCredential;
    } catch (e) {
      debugPrint('Error en inicio de sesión con Google: $e');
      rethrow;
    }
  }

  Future<void> completeStudentProfile({
    required String uid,
    required String email,
    required String fullName,
    required String studentId,
    String? bio,
    String? profilePhotoUrl,
    int? avatarIndex,
    bool clearProfilePhoto = false,
  }) async {
    final ref = _firestore.collection('users').doc(uid);
    final snap = await ref.get();
    final data = <String, dynamic>{
      'uid': uid,
      'email': email,
      'fullName': fullName.trim(),
      'studentId': studentId.trim(),
      'profileComplete': true,
      if (bio != null) 'bio': bio.trim(),
      if (profilePhotoUrl != null && profilePhotoUrl.trim().isNotEmpty)
        'profilePhotoUrl': profilePhotoUrl.trim(),
      if (avatarIndex != null) 'avatarIndex': avatarIndex,
      if (clearProfilePhoto) 'profilePhotoUrl': FieldValue.delete(),
    };
    if (!snap.exists) {
      data['createdAt'] = DateTime.now().toIso8601String();
    }
    await ref.set(data, SetOptions(merge: true));
  }

  /// Sube imagen de perfil a Storage y devuelve la URL pública, o null si falla.
  ///
  /// Usa un nombre único por subida para que la URL cambie; si siempre se
  /// sobrescribe `.../$uid.jpg`, la URL puede repetirse y [Image.network] /
  /// [NetworkImage] muestran la foto **en caché** antigua aunque el archivo
  /// nuevo esté en Storage.
  ///
  /// [bytes] opcional: si ya leíste los bytes (p. ej. en web tras elegir foto),
  /// evita un segundo `readAsBytes()` que a veces falla o se bloquea con el mismo [XFile].
  Future<String?> uploadProfilePhoto({
    required String uid,
    required XFile file,
    Uint8List? bytes,
  }) async {
    try {
      final data = bytes ?? await file.readAsBytes();
      if (data.isEmpty) return null;

      // Firma de archivo (en web el path del blob no lleva extensión).
      final isPng = data.length >= 8 &&
          data[0] == 0x89 &&
          data[1] == 0x50 &&
          data[2] == 0x4E &&
          data[3] == 0x47;
      final lower = file.path.toLowerCase();
      final name = file.name.toLowerCase();
      final looksPngFromName =
          lower.endsWith('.png') || name.endsWith('.png');
      final usePng = isPng || looksPngFromName;
      final ext = usePng ? 'png' : 'jpg';
      final contentType = usePng ? 'image/png' : 'image/jpeg';

      final unique =
          '${uid}_${DateTime.now().millisecondsSinceEpoch}.$ext';
      final storageRef =
          FirebaseStorage.instance.ref().child('profile_photos/$unique');
      await storageRef.putData(
        data,
        SettableMetadata(contentType: contentType),
      );
      return await storageRef.getDownloadURL();
    } catch (e) {
      debugPrint('uploadProfilePhoto: $e');
      return null;
    }
  }

  Future<void> signOut() async {
    if (!kIsWeb) {
      try {
        await _googleSignIn.signOut();
      } catch (_) {}
    }
    await _auth.signOut();
  }

  Future<void> deleteAccount() async {
    final user = _auth.currentUser;
    if (user == null) {
      throw Exception('No hay usuario autenticado');
    }

    final uid = user.uid;
    await _firestore.collection('users').doc(uid).delete();
    await user.delete();
  }
}
