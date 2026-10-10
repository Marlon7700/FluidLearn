import 'package:flutter/material.dart';

import '../../services/auth_service.dart';
import '../home/simple_home_screen.dart';

/// Confirmation before signing out from the Me screen.
Future<void> showSignOutConfirmationDialog(BuildContext context) async {
  final confirmed = await showDialog<bool>(
    context: context,
    builder: (ctx) => AlertDialog(
      title: const Text('Sign out'),
      content: const Text('Do you want to sign out?'),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(ctx, false),
          child: const Text('No'),
        ),
        FilledButton(
          onPressed: () => Navigator.pop(ctx, true),
          child: const Text('Yes'),
        ),
      ],
    ),
  );

  if (!context.mounted || confirmed == null) return;

  if (confirmed) {
    await AuthService().signOut();
    return;
  }

  Navigator.of(context).pushReplacement(
    MaterialPageRoute<void>(builder: (_) => const SimpleHomeScreen()),
  );
}
