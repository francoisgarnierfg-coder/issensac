import React, { useCallback } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { JourData } from '../../../data/programme';
import { Couleurs, Rayon, Typo } from '../../../constants/tokens';

const JOURS_COURTS = ['Sam', 'Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven'];

interface Props {
  jour: JourData;
  estSelectionne: boolean;
  onPress: (numero: number) => void;
}

export const CartJour = React.memo(function CartJour({
  jour,
  estSelectionne,
  onPress,
}: Props) {
  const scale = useSharedValue(1);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = useCallback(() => {
    scale.value = withSpring(1.06, { damping: 10 }, () => {
      scale.value = withSpring(1, { damping: 14 });
    });
    onPress(jour.numero);
  }, [jour.numero, onPress, scale]);

  // J1 = Samedi 25 juillet → offset 6 pour que (6+1)%7=0='Sam'
  const jourSemaine = JOURS_COURTS[(6 + jour.numero) % 7];

  return (
    <Animated.View style={style}>
      <TouchableOpacity
        onPress={handlePress}
        style={[styles.carte, estSelectionne && styles.carteActive]}
        accessibilityRole="button"
        accessibilityState={{ selected: estSelectionne }}
        accessibilityLabel={`Jour ${jour.numero} — ${jour.date}`}
      >
        <Text
          style={[
            styles.numero,
            estSelectionne ? styles.texteActif : styles.texteInactif,
          ]}
        >
          {jour.numero}
        </Text>
        <Text
          style={[
            Typo.micro,
            estSelectionne ? styles.texteActif : { color: Couleurs.subtil },
          ]}
        >
          {jourSemaine}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  carte: {
    width: 52,
    height: 68,
    borderRadius: Rayon.md,
    backgroundColor: Couleurs.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  carteActive: {
    backgroundColor: Couleurs.marine,
    shadowColor: Couleurs.marine,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  numero: {
    ...Typo.titre,
    fontSize: 20,
  },
  texteActif: {
    color: '#FFFFFF',
  },
  texteInactif: {
    color: Couleurs.encreDouce,
  },
});
