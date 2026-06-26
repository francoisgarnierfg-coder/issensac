import * as Haptics from 'expo-haptics';
import { AccessibilityInfo } from 'react-native';

async function reduceMotionActif(): Promise<boolean> {
  return AccessibilityInfo.isReduceMotionEnabled();
}

export async function hapticLeger(): Promise<void> {
  if (await reduceMotionActif()) return;
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

export async function hapticMedium(): Promise<void> {
  if (await reduceMotionActif()) return;
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
}

export async function hapticSucces(): Promise<void> {
  if (await reduceMotionActif()) return;
  await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
}
