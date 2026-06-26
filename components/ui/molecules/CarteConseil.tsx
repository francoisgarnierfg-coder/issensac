import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Couleurs, Espace, Rayon, Typo } from '../../../constants/tokens';

type Variante = 'conseil' | 'attention' | 'info';

interface Props {
  texte: string;
  variante: Variante;
}

const CONFIG: Record<Variante, { bordure: string; fond: string; icone: string }> = {
  conseil:   { bordure: Couleurs.or,      fond: Couleurs.orClair,       icone: '💡' },
  attention: { bordure: Couleurs.danger,  fond: '#FEF2F2',              icone: '⚠️' },
  info:      { bordure: Couleurs.info,    fond: '#EFF6FF',              icone: 'ℹ️' },
};

export const CarteConseil = React.memo(function CarteConseil({ texte, variante }: Props) {
  const c = CONFIG[variante];
  return (
    <View style={[styles.carte, { backgroundColor: c.fond, borderLeftColor: c.bordure }]}>
      <Text style={styles.icone}>{c.icone}</Text>
      <Text style={[Typo.corps, styles.texte]}>{texte}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  carte: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderLeftWidth: 3,
    borderRadius: Rayon.sm,
    padding: Espace.md,
    gap: Espace.sm,
  },
  icone: {
    fontSize: 16,
    lineHeight: 21,
  },
  texte: {
    flex: 1,
    color: Couleurs.encreDouce,
  },
});
