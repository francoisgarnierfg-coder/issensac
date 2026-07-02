import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { CreneauData, Humeur } from '../../../data/programme';
import { ouvrirItineraire } from '../../../utils/liens';
import { ACTIVITES } from '../../../data/activites';
import {
  Couleurs,
  Espace,
  Rayon,
  Typo,
  Ombre,
  couleursCategorie,
} from '../../../constants/tokens';

interface Props {
  creneau: CreneauData;
  horaire: 'MATIN' | 'APR.-MIDI' | 'SOIRÉE';
  humeurJour: Humeur;
  onPress?: (activiteId: string) => void;
}

const COULEUR_HUMEUR: Record<Humeur, string> = {
  aventure: Couleurs.eau.milieu,
  culture: Couleurs.culture.milieu,
  detente: Couleurs.nature.milieu,
  convivial: Couleurs.domaine.milieu,
};

export const BlocCreneau = React.memo(function BlocCreneau({
  creneau,
  horaire,
  humeurJour,
  onPress,
}: Props) {
  const activite = creneau.activiteId
    ? ACTIVITES.find((a) => a.id === creneau.activiteId)
    : null;
  const couleurs = activite ? couleursCategorie(activite.categorie) : null;

  const scale = useSharedValue(1);
  const styleAnim = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = useCallback(() => {
    if (!creneau.activiteId || !onPress) return;
    scale.value = withSpring(0.97, { damping: 12 }, () => {
      scale.value = withSpring(1);
    });
    onPress(creneau.activiteId);
  }, [creneau.activiteId, onPress, scale]);

  const estInteractif = !!creneau.activiteId && !!onPress;

  return (
    <Animated.View style={styleAnim}>
      <TouchableOpacity
        onPress={estInteractif ? handlePress : undefined}
        disabled={!estInteractif}
        activeOpacity={estInteractif ? 0.9 : 1}
        style={[styles.bloc, couleurs ? { borderLeftColor: couleurs.base } : styles.blocVide]}
        accessibilityRole={estInteractif ? 'button' : 'text'}
        accessibilityLabel={`${horaire} : ${creneau.titre}`}
      >
        {/* Étiquette horaire verticale */}
        <View style={styles.horaire}>
          <Text style={[Typo.etiquette, styles.texteHoraire]}>{horaire}</Text>
        </View>

        {/* Contenu */}
        <View style={styles.contenu}>
          {activite && (
            <View style={styles.headerCreneau}>
              <Text style={styles.emojiActivite}>{activite.emoji}</Text>
              <Text
                style={[
                  Typo.corpsMoyen,
                  { color: couleurs ? couleurs.base : Couleurs.encre, flex: 1 },
                ]}
                numberOfLines={1}
              >
                {activite.nom}
              </Text>
              {creneau.estOptionnel && (
                <View style={styles.optionnel}>
                  <Text style={[Typo.micro, { color: Couleurs.culture.base }]}>◇ Opt.</Text>
                </View>
              )}
            </View>
          )}

          <Text
            style={[Typo.corps, { color: activite ? Couleurs.encreDouce : Couleurs.attenué }]}
            numberOfLines={2}
          >
            {creneau.sousTitre || (activite ? activite.accroche : 'Temps libre 🏊')}
          </Text>

          {creneau.note && (
            <View style={styles.note}>
              <Text style={[Typo.legende, { color: Couleurs.or }]}>
                💡 {creneau.note}
              </Text>
            </View>
          )}

          {creneau.boutonItineraire && (
            <Pressable
              onPress={(e) => {
                e.stopPropagation?.();
                ouvrirItineraire(
                  creneau.boutonItineraire!.lat,
                  creneau.boutonItineraire!.lng,
                  creneau.boutonItineraire!.nom,
                );
              }}
              style={styles.btnItineraireCreneau}
              accessibilityRole="button"
              accessibilityLabel="Itinéraire"
            >
              <Text style={[Typo.legende, { color: Couleurs.sarcelle }]}>🗺️ Itinéraire</Text>
            </Pressable>
          )}
        </View>

        {estInteractif && (
          <Text style={[Typo.corps, { color: Couleurs.sarcelle, alignSelf: 'center' }]}>
            ›
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  bloc: {
    flexDirection: 'row',
    backgroundColor: Couleurs.surface,
    borderRadius: Rayon.md,
    borderLeftWidth: 4,
    ...Ombre.sm,
    overflow: 'hidden',
  },
  blocVide: {
    borderLeftColor: Couleurs.bordure,
    borderStyle: 'dashed',
  },
  horaire: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Espace.lg,
    backgroundColor: Couleurs.surfaceAlt,
  },
  texteHoraire: {
    color: Couleurs.attenué,
    transform: [{ rotate: '-90deg' }],
    width: 60,
    textAlign: 'center',
  },
  contenu: {
    flex: 1,
    padding: Espace.lg,
    gap: Espace.xs,
  },
  headerCreneau: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espace.sm,
  },
  emojiActivite: {
    fontSize: 18,
  },
  optionnel: {
    backgroundColor: Couleurs.culture.clair,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Rayon.pilule,
  },
  note: {
    backgroundColor: Couleurs.orClair,
    borderRadius: Rayon.sm,
    padding: Espace.sm,
    marginTop: Espace.xs,
  },
  btnItineraireCreneau: {
    alignSelf: 'flex-start',
    marginTop: Espace.xs,
    paddingHorizontal: Espace.md,
    paddingVertical: Espace.xs,
    borderRadius: Rayon.pilule,
    borderWidth: 1,
    borderColor: Couleurs.sarcelle,
  },
});
