import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Rayon, Typo } from '../../../constants/tokens';

interface Props {
  label: string;
  couleur: string;
  fond: string;
}

export const TexteBadge = React.memo(function TexteBadge({ label, couleur, fond }: Props) {
  return (
    <View style={[styles.badge, { backgroundColor: fond, borderRadius: Rayon.pilule }]}>
      <Text style={[Typo.etiquette, { color: couleur, fontSize: 10 }]}>{label}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
});
