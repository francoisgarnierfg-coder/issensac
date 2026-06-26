import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Couleurs, Rayon, Typo } from '../../../constants/tokens';

type Statut = 'confirme' | 'afaire' | 'urgent' | 'optionnel' | 'gratuit' | 'inclus';

interface Props {
  statut: Statut;
}

const CONFIG: Record<
  Statut,
  { label: string; icone: string; fond: string; texte: string }
> = {
  confirme:  { label: 'Confirmé',    icone: '✓',  fond: '#DCFCE7', texte: '#16A34A' },
  afaire:    { label: 'À réserver',  icone: '📅', fond: '#FDF3E3', texte: '#C97A1A' },
  urgent:    { label: 'Urgent',      icone: '🔴', fond: '#FEF2F2', texte: '#DC2626' },
  optionnel: { label: 'Optionnel',   icone: '◇',  fond: '#F2EEFF', texte: '#5B3FA0' },
  gratuit:   { label: 'Gratuit',     icone: '✓',  fond: Couleurs.sarcelleClaire, texte: Couleurs.sarcelle },
  inclus:    { label: 'Inclus',      icone: '✓',  fond: '#E0F0FF', texte: Couleurs.marine },
};

export const BadgeReservation = React.memo(function BadgeReservation({ statut }: Props) {
  const c = CONFIG[statut];
  return (
    <View
      style={[styles.badge, { backgroundColor: c.fond, borderRadius: Rayon.pilule }]}
      accessibilityLabel={c.label}
    >
      <Text style={[Typo.etiquette, { color: c.texte, fontSize: 10 }]}>
        {c.icone} {c.label}
      </Text>
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
