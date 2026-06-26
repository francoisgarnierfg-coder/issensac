import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { ActiviteData } from '../../../data/activites';
import {
  Couleurs,
  Espace,
  Rayon,
  Typo,
  Ombre,
  couleursCategorie,
} from '../../../constants/tokens';
import { PiluleCategorie } from '../atomes/PiluleCategorie';
import { PiluleDuree } from '../atomes/PiluleDuree';
import { PiluleAge } from '../atomes/PiluleAge';
import { BadgeReservation } from '../atomes/BadgeReservation';
import { hapticLeger } from '../../../utils/haptiques';
import { useAppStore } from '../../../store/useAppStore';

interface Props {
  activite: ActiviteData;
  variante?: 'liste' | 'compact';
  onPress: (id: string) => void;
  onFavori?: (id: string) => void;
}

function statutBadge(activite: ActiviteData) {
  if (activite.tarif.gratuit || activite.tarif.note?.includes('Inclus'))
    return activite.tarif.note?.includes('Inclus') ? 'inclus' : 'gratuit';
  if (!activite.reservation.requise) return 'confirme';
  if (activite.reservation.urgente) return 'urgent';
  return 'afaire';
}

export const CarteActivite = React.memo(function CarteActivite({
  activite,
  variante = 'liste',
  onPress,
  onFavori,
}: Props) {
  const favoris = useAppStore((s) => s.favoris);
  const toggleFavori = useAppStore((s) => s.toggleFavori);
  const estFavori = favoris.has(activite.id);
  const couleurs = couleursCategorie(activite.categorie);

  const scale = useSharedValue(1);
  const scaleCoeur = useSharedValue(1);

  const styleCard = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const styleCoeur = useAnimatedStyle(() => ({
    transform: [{ scale: scaleCoeur.value }],
  }));

  const handlePress = useCallback(() => {
    scale.value = withSpring(0.97, { damping: 12 }, () => {
      scale.value = withSpring(1, { damping: 14 });
    });
    onPress(activite.id);
  }, [activite.id, onPress, scale]);

  const handleFavori = useCallback(async () => {
    scaleCoeur.value = withSpring(1.3, { damping: 8 }, () => {
      scaleCoeur.value = withSpring(1, { damping: 12 });
    });
    await hapticLeger();
    toggleFavori(activite.id);
    onFavori?.(activite.id);
  }, [activite.id, toggleFavori, onFavori, scaleCoeur]);

  if (variante === 'compact') {
    return (
      <Animated.View style={styleCard}>
        <TouchableOpacity
          onPress={handlePress}
          style={[
            styles.compact,
            { borderLeftColor: couleurs.base, backgroundColor: couleurs.clair },
          ]}
          accessibilityRole="button"
          accessibilityLabel={`Activité : ${activite.nom}`}
        >
          <Text style={styles.emojiCompact}>{activite.emoji}</Text>
          <View style={styles.compactInfos}>
            <Text style={[Typo.corpsMoyen, { color: Couleurs.encre }]} numberOfLines={1}>
              {activite.nom}
            </Text>
            <Text style={[Typo.legende, { color: Couleurs.attenué }]} numberOfLines={1}>
              {activite.accroche}
            </Text>
          </View>
          <Text style={[Typo.corps, { color: Couleurs.sarcelle }]}>›</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.carte, Ombre.sm, styleCard]}>
      <Pressable
        onPress={handlePress}
        style={styles.interactif}
        accessibilityRole="button"
        accessibilityLabel={`Voir les détails de ${activite.nom}`}
      >
        <View style={[styles.bandeCat, { backgroundColor: couleurs.base }]} />
        <View style={styles.contenu}>
          {/* Ligne 1 : emoji + nom + favori */}
          <View style={styles.ligne1}>
            <Text style={styles.emoji}>{activite.emoji}</Text>
            <Text style={[Typo.soustitre, styles.nom]} numberOfLines={1}>
              {activite.nom}
            </Text>
            <Animated.View style={styleCoeur}>
              <Pressable
                onPress={(e) => { e.stopPropagation?.(); handleFavori(); }}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                accessibilityRole="button"
                accessibilityLabel={estFavori ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              >
                <Text style={styles.coeur}>{estFavori ? '❤️' : '🤍'}</Text>
              </Pressable>
            </Animated.View>
          </View>

          {/* Ligne 2 : pilules */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.pilules}
            contentContainerStyle={styles.piluleContenu}
          >
            <PiluleCategorie categorie={activite.categorie} />
            <PiluleDuree
              min={activite.duree.min}
              max={activite.duree.max}
              unite={activite.duree.unite}
            />
            <PiluleAge ageMin={activite.ageMin} label={activite.labelAge} />
          </ScrollView>

          {/* Ligne 3 : accroche */}
          <Text
            style={[Typo.corps, styles.accroche]}
            numberOfLines={1}
          >
            {activite.accroche}
          </Text>

          {/* Ligne 4 : badge + flèche */}
          <View style={styles.ligne4}>
            <BadgeReservation statut={statutBadge(activite)} />
            <Text style={[Typo.corpsMoyen, { color: Couleurs.sarcelle }]}>
              Voir →
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  carte: {
    backgroundColor: Couleurs.surface,
    borderRadius: Rayon.md,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  bandeCat: {
    width: 3,
  },
  interactif: {
    flex: 1,
    flexDirection: 'row',
  },
  contenu: {
    flex: 1,
    padding: Espace.lg,
    gap: Espace.sm,
  },
  ligne1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espace.sm,
  },
  emoji: {
    fontSize: 24,
  },
  nom: {
    flex: 1,
    color: Couleurs.encre,
  },
  coeur: {
    fontSize: 20,
  },
  pilules: {
    marginHorizontal: -Espace.xs,
  },
  piluleContenu: {
    gap: Espace.xs,
    paddingHorizontal: Espace.xs,
  },
  accroche: {
    color: Couleurs.attenué,
    fontStyle: 'italic',
  },
  ligne4: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Espace.xs,
  },
  // Compact
  compact: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderRadius: Rayon.sm,
    padding: Espace.md,
    gap: Espace.sm,
  },
  emojiCompact: {
    fontSize: 22,
  },
  compactInfos: {
    flex: 1,
  },
});
