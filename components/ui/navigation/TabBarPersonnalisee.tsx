import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import type { BottomTabBarProps } from 'expo-router/build/react-navigation/bottom-tabs/types';
import { Couleurs, Espace, Rayon, Typo, Ombre } from '../../../constants/tokens';

const TABS = [
  { name: 'programme', label: 'Programme', emoji: '📅' },
  { name: 'activites', label: 'Activités', emoji: '🗺️' },
  { name: 'carte', label: 'Carte', emoji: '📍' },
  { name: 'infos', label: 'Infos', emoji: 'ℹ️' },
];

interface TabItemProps {
  tab: typeof TABS[0];
  isFocused: boolean;
  onPress: (name: string, isFocused: boolean) => void;
}

function TabItem({ tab, isFocused, onPress }: TabItemProps) {
  const scale = useSharedValue(1);
  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = useCallback(() => {
    scale.value = withSpring(1.08, { damping: 8 }, () => {
      scale.value = withSpring(1);
    });
    onPress(tab.name, isFocused);
  }, [tab.name, isFocused, onPress, scale]);

  return (
    <Animated.View style={[styles.tabWrapper, scaleStyle]}>
      <TouchableOpacity
        onPress={handlePress}
        style={[styles.tab, isFocused && styles.tabActive]}
        accessibilityRole="tab"
        accessibilityState={{ selected: isFocused }}
        accessibilityLabel={tab.label}
        hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
      >
        <Text style={[styles.emoji, { opacity: isFocused ? 1 : 0.65 }]}>{tab.emoji}</Text>
        <Text
          style={[
            Typo.micro,
            {
              color: isFocused ? '#FFFFFF' : Couleurs.attenué,
              fontFamily: isFocused ? 'DMSans_600SemiBold' : 'DMSans_400Regular',
            },
          ]}
        >
          {tab.label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export function TabBarPersonnalisee({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const handlePress = useCallback(
    (routeName: string, isFocused: boolean) => {
      if (!isFocused) {
        navigation.navigate(routeName);
      }
    },
    [navigation]
  );

  return (
    <View style={[styles.conteneur, { paddingBottom: insets.bottom || Espace.lg }]}>
      <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
      <View style={styles.fond} />
      <View style={styles.tabs}>
        {TABS.map((tab, i) => (
          <TabItem
            key={tab.name}
            tab={tab}
            isFocused={state.index === i}
            onPress={handlePress}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    ...Ombre.lg,
  },
  fond: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderTopWidth: 1,
    borderTopColor: Couleurs.bordureClaire,
  },
  tabs: {
    flexDirection: 'row',
    height: 64,
    paddingHorizontal: Espace.lg,
    paddingTop: Espace.sm,
  },
  tabWrapper: {
    flex: 1,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Rayon.md,
    gap: 2,
    paddingVertical: 6,
  },
  tabActive: {
    backgroundColor: Couleurs.marine,
  },
  emoji: {
    fontSize: 20,
  },
});
