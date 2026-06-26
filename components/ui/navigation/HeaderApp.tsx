import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Couleurs, Espace, Rayon, Typo, Ombre } from '../../../constants/tokens';
import { useAppStore } from '../../../store/useAppStore';

interface Props {
  titre: string;
  sousTitre?: string;
  elementDroit?: React.ReactNode;
  afficherRetour?: boolean;
  utiliserGradient?: boolean;
}

export const HeaderApp = React.memo(function HeaderApp({
  titre,
  sousTitre,
  elementDroit,
  afficherRetour = false,
  utiliserGradient = false,
}: Props) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const configMoment = useAppStore((s) => s.configMoment);

  const hauteurPaddingTop = insets.top + Espace.xl;

  if (utiliserGradient) {
    return (
      <LinearGradient
        colors={configMoment.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, { paddingTop: hauteurPaddingTop }]}
      >
        <View style={styles.contenuHeader}>
          {afficherRetour && (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.boutonRetour}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel="Retour"
            >
              <Text style={[styles.retourTexte, { color: configMoment.couleurTexteHeader }]}>
                ‹ Retour
              </Text>
            </TouchableOpacity>
          )}
          <View style={styles.centreHeader}>
            {sousTitre && (
              <Text style={[Typo.legende, { color: 'rgba(255,255,255,0.7)' }]}>
                {sousTitre}
              </Text>
            )}
            <Text
              style={[
                styles.titreGradient,
                { color: configMoment.couleurTexteHeader },
              ]}
              numberOfLines={2}
            >
              {titre}
            </Text>
          </View>
          {elementDroit && <View style={styles.droite}>{elementDroit}</View>}
        </View>
      </LinearGradient>
    );
  }

  return (
    <View style={[styles.surface, { paddingTop: hauteurPaddingTop }]}>
      <View style={styles.contenuHeader}>
        {afficherRetour && (
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.boutonRetour}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel="Retour"
          >
            <Text style={[styles.retourTexte, { color: Couleurs.sarcelle }]}>‹ Retour</Text>
          </TouchableOpacity>
        )}
        <Text style={[Typo.titre, { color: Couleurs.encre, flex: 1 }]} numberOfLines={1}>
          {titre}
        </Text>
        {elementDroit && <View style={styles.droite}>{elementDroit}</View>}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  gradient: {
    paddingBottom: Espace.xxl,
    paddingHorizontal: Espace.lg,
  },
  surface: {
    backgroundColor: Couleurs.surface,
    paddingBottom: Espace.lg,
    paddingHorizontal: Espace.lg,
    borderBottomWidth: 1,
    borderBottomColor: Couleurs.bordureClaire,
  },
  contenuHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Espace.sm,
  },
  centreHeader: {
    flex: 1,
  },
  titreGradient: {
    fontFamily: 'DMSerifDisplay_400Regular',
    fontSize: 28,
    lineHeight: 34,
  },
  boutonRetour: {
    paddingRight: Espace.sm,
  },
  retourTexte: {
    ...Typo.corpsMoyen,
  },
  droite: {
    alignItems: 'flex-end',
  },
});
