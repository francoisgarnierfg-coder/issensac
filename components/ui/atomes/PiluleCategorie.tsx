import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Couleurs, Rayon, Typo, Categorie, couleursCategorie } from '../../../constants/tokens';

const LABELS: Record<Categorie, string> = {
  eau: 'Eau',
  culture: 'Culture',
  nature: 'Nature',
  domaine: 'Domaine',
  vin: 'Vin',
};

const EMOJIS: Record<Categorie, string> = {
  eau: '💧',
  culture: '🏛',
  nature: '🏞',
  domaine: '🏡',
  vin: '🍷',
};

interface Props {
  categorie: Categorie;
  taille?: 'sm' | 'md';
  actif?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export const PiluleCategorie = React.memo(function PiluleCategorie({
  categorie,
  taille = 'sm',
  actif = false,
  onPress,
  style,
}: Props) {
  const couleurs = couleursCategorie(categorie);
  const hauteur = taille === 'sm' ? 24 : 32;
  const paddingH = taille === 'sm' ? 8 : 12;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
      accessibilityRole="button"
      accessibilityLabel={`Filtrer : ${LABELS[categorie]}`}
      style={[
        styles.pilule,
        {
          backgroundColor: actif ? couleurs.base : couleurs.clair,
          height: hauteur,
          paddingHorizontal: paddingH,
          borderRadius: Rayon.pilule,
        },
        style,
      ]}
    >
      <Text
        style={[
          taille === 'sm' ? Typo.legende : Typo.corps,
          { color: actif ? '#FFFFFF' : couleurs.base, fontFamily: 'DMSans_500Medium' },
        ]}
      >
        {EMOJIS[categorie]} {LABELS[categorie]}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  pilule: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
