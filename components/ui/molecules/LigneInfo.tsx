import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Couleurs, Espace, Typo } from '../../../constants/tokens';

interface Props {
  icone: string;
  label: string;
  valeur: string;
  onPress?: () => void;
  copiable?: boolean;
}

export const LigneInfo = React.memo(function LigneInfo({
  icone,
  label,
  valeur,
  onPress,
  copiable,
}: Props) {
  const handleLongPress = async () => {
    if (copiable) {
      await Clipboard.setStringAsync(valeur);
      Alert.alert('Copié !', valeur);
    }
  };

  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      onPress={onPress}
      onLongPress={copiable ? handleLongPress : undefined}
      style={styles.ligne}
      accessibilityRole={onPress ? 'button' : 'text'}
      accessibilityLabel={`${label} : ${valeur}`}
      hitSlop={onPress ? { top: 4, bottom: 4 } : undefined}
    >
      <Text style={styles.icone}>{icone}</Text>
      <Text style={[Typo.legende, styles.label]}>{label}</Text>
      <View style={styles.spacer} />
      <Text
        style={[Typo.corpsMoyen, styles.valeur, onPress ? { color: Couleurs.sarcelle } : {}]}
        numberOfLines={2}
      >
        {valeur}
      </Text>
      {onPress && <Text style={[styles.fleche, { color: Couleurs.attenué }]}>›</Text>}
    </Wrapper>
  );
});

const styles = StyleSheet.create({
  ligne: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Espace.sm,
    gap: Espace.sm,
  },
  icone: {
    fontSize: 18,
    width: 24,
    textAlign: 'center',
  },
  label: {
    width: 80,
    color: Couleurs.attenué,
  },
  spacer: {
    flex: 1,
  },
  valeur: {
    color: Couleurs.encre,
    textAlign: 'right',
    maxWidth: '60%',
  },
  fleche: {
    fontSize: 18,
    marginLeft: 4,
  },
});
