import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Couleurs, Rayon, Typo } from '../../../constants/tokens';

interface Props {
  adulte?: number;
  enfant?: number;
  gratuit: boolean;
  note?: string;
}

export const EtiquettePrix = React.memo(function EtiquettePrix({
  adulte,
  enfant,
  gratuit,
}: Props) {
  if (gratuit) {
    return (
      <View style={styles.pilule}>
        <Text style={[Typo.legende, { color: Couleurs.sarcelle, fontFamily: 'DMSans_500Medium' }]}>
          ✓ Gratuit
        </Text>
      </View>
    );
  }

  const parties: string[] = [];
  if (adulte !== undefined) parties.push(`${adulte} €`);
  if (enfant !== undefined) parties.push(`${enfant} € enf.`);

  if (parties.length === 0) return null;

  return (
    <View style={styles.pilule}>
      <Text style={[Typo.legende, { color: Couleurs.encre, fontFamily: 'DMSans_500Medium' }]}>
        💶 {parties.join(' · ')}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  pilule: {
    backgroundColor: Couleurs.surfaceAlt,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Rayon.pilule,
    alignSelf: 'flex-start',
  },
});
