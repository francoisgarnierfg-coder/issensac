import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Couleurs, Espace, Rayon, Typo, Ombre } from '../../../constants/tokens';

interface Props {
  emoji: string;
  label: string;
  valeur: string;
  conseil: string;
}

export const CarteMétéo = React.memo(function CarteMétéo({
  emoji,
  label,
  valeur,
  conseil,
}: Props) {
  return (
    <View style={styles.carte}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={[Typo.legende, styles.label]}>{label}</Text>
      <Text style={[Typo.corpsMoyen, styles.valeur]}>{valeur}</Text>
      <Text style={[Typo.micro, styles.conseil]} numberOfLines={2}>
        {conseil}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  carte: {
    flex: 1,
    minHeight: 100,
    backgroundColor: Couleurs.surface,
    borderRadius: Rayon.md,
    padding: Espace.md,
    gap: 2,
    ...Ombre.sm,
  },
  emoji: {
    fontSize: 22,
    marginBottom: 2,
  },
  label: {
    color: Couleurs.attenué,
  },
  valeur: {
    color: Couleurs.encre,
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
  },
  conseil: {
    color: Couleurs.subtil,
    marginTop: 2,
  },
});
