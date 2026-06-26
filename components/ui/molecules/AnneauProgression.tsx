import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Couleurs, Typo } from '../../../constants/tokens';

interface Props {
  valeur: number;
  total: number;
  taille?: number;
  couleur?: string;
}

export const AnneauProgression = React.memo(function AnneauProgression({
  valeur,
  total,
  taille = 48,
  couleur = Couleurs.sarcelle,
}: Props) {
  const rayon = (taille - 6) / 2;
  const circonference = 2 * Math.PI * rayon;
  const progression = total > 0 ? valeur / total : 0;
  const dashOffset = circonference * (1 - progression);

  return (
    <View style={[styles.conteneur, { width: taille, height: taille }]}>
      <Svg width={taille} height={taille} style={StyleSheet.absoluteFill}>
        <Circle
          cx={taille / 2}
          cy={taille / 2}
          r={rayon}
          stroke={Couleurs.bordure}
          strokeWidth={3}
          fill="none"
        />
        <Circle
          cx={taille / 2}
          cy={taille / 2}
          r={rayon}
          stroke={couleur}
          strokeWidth={3}
          fill="none"
          strokeDasharray={`${circonference} ${circonference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${taille / 2} ${taille / 2})`}
        />
      </Svg>
      <Text style={[Typo.micro, styles.texte]}>
        {valeur}/{total}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  conteneur: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  texte: {
    color: Couleurs.encreDouce,
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 11,
  },
});
