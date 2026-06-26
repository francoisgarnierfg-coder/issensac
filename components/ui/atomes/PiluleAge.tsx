import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Couleurs, Rayon, Typo } from '../../../constants/tokens';

interface Props {
  ageMin: number;
  label: string;
}

export const PiluleAge = React.memo(function PiluleAge({ label }: Props) {
  return (
    <View style={styles.pilule}>
      <Text style={[Typo.legende, { color: Couleurs.attenué }]}>👶 {label}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  pilule: {
    backgroundColor: Couleurs.surfaceAlt,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Rayon.pilule,
  },
});
