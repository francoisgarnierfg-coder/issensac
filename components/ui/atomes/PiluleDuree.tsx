import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Couleurs, Rayon, Typo } from '../../../constants/tokens';

interface Props {
  min: number;
  max: number;
  unite: 'min' | 'h';
}

function formater(valeur: number, unite: 'min' | 'h'): string {
  if (unite === 'h') return `${valeur}h`;
  if (valeur >= 60) {
    const h = Math.floor(valeur / 60);
    const m = valeur % 60;
    return m > 0 ? `${h}h${m.toString().padStart(2, '0')}` : `${h}h`;
  }
  return `${valeur} min`;
}

export const PiluleDuree = React.memo(function PiluleDuree({ min, max, unite }: Props) {
  const texte =
    min === max
      ? formater(min, unite)
      : `${formater(min, unite)} – ${formater(max, unite)}`;

  return (
    <View style={styles.pilule}>
      <Text style={[Typo.legende, { color: Couleurs.attenué }]}>⏱ {texte}</Text>
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
