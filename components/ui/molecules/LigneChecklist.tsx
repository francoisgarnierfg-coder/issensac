import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { ElementChecklist } from '../../../data/checklist';
import { Couleurs, Espace, Rayon, Typo } from '../../../constants/tokens';
import { hapticMedium } from '../../../utils/haptiques';
import { ouvrirSite } from '../../../utils/liens';

interface Props {
  element: ElementChecklist;
  coche: boolean;
  onToggle: (id: string) => void;
}

const COULEUR_URGENCE: Record<string, string> = {
  haute: Couleurs.danger,
  moyenne: Couleurs.attention,
  basse: Couleurs.succes,
};

export const LigneChecklist = React.memo(function LigneChecklist({
  element,
  coche,
  onToggle,
}: Props) {
  const scale = useSharedValue(1);

  const styleCase = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleToggle = useCallback(async () => {
    scale.value = withSpring(1.15, { damping: 8 }, () => {
      scale.value = withSpring(1, { damping: 12 });
    });
    await hapticMedium();
    onToggle(element.id);
  }, [element.id, onToggle, scale]);

  return (
    <TouchableOpacity
      onPress={handleToggle}
      style={styles.ligne}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: coche }}
      accessibilityLabel={element.label}
      hitSlop={{ top: 4, bottom: 4 }}
    >
      <Animated.View
        style={[
          styles.case,
          coche ? styles.caseCochee : styles.caseVide,
          styleCase,
        ]}
      >
        {coche && <Text style={styles.coche}>✓</Text>}
      </Animated.View>

      <View style={styles.centre}>
        <Text
          style={[
            Typo.corpsMoyen,
            { color: coche ? Couleurs.attenué : Couleurs.encre },
            coche && styles.barre,
          ]}
          numberOfLines={2}
        >
          {element.emoji} {element.label}
        </Text>
        {element.tagJour && (
          <View style={styles.piluleJour}>
            <Text style={[Typo.micro, { color: Couleurs.marine }]}>{element.tagJour}</Text>
          </View>
        )}
      </View>

      <View style={styles.droite}>
        <View
          style={[styles.pointUrgence, { backgroundColor: COULEUR_URGENCE[element.urgence] }]}
        />
        {element.lien && (
          <Pressable
            onPress={(e) => { e.stopPropagation?.(); ouvrirSite(element.lien!); }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.lienIcone}>🔗</Text>
          </Pressable>
        )}
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  ligne: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Espace.sm + 2,
    gap: Espace.md,
  },
  case: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caseVide: {
    borderWidth: 2,
    borderColor: Couleurs.bordure,
    backgroundColor: Couleurs.surface,
  },
  caseCochee: {
    backgroundColor: Couleurs.sarcelle,
    borderWidth: 0,
  },
  coche: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  centre: {
    flex: 1,
    gap: 2,
  },
  barre: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  piluleJour: {
    backgroundColor: '#E0F0FF',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: Rayon.pilule,
    alignSelf: 'flex-start',
  },
  droite: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espace.sm,
  },
  pointUrgence: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  lienIcone: {
    fontSize: 16,
  },
});
