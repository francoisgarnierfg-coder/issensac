import React, { useRef, useCallback, useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PROGRAMME } from '../../data/programme';
import { useAppStore } from '../../store/useAppStore';
import { CartJour } from '../../components/ui/organismes/CartJour';
import { BlocCreneau } from '../../components/ui/organismes/BlocCreneau';
import { Couleurs, Espace, Rayon, Typo } from '../../constants/tokens';

const ITEM_WIDTH = 60; // 52px carte + 8px gap

export default function EcranProgramme() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const jourSelectionne = useAppStore((s) => s.jourSelectionne);
  const setJour = useAppStore((s) => s.setJour);
  const configMoment = useAppStore((s) => s.configMoment);

  const scrollRef = useRef<ScrollView>(null);
  const [cle, setCle] = useState(0);

  const jourActuel = PROGRAMME.find((j) => j.numero === jourSelectionne) ?? PROGRAMME[0];

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollRef.current?.scrollTo({
        x: Math.max(0, (jourSelectionne - 1) * ITEM_WIDTH - ITEM_WIDTH),
        animated: false,
      });
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectJour = useCallback(
    (numero: number) => {
      setJour(numero);
      setCle((k) => k + 1);
      scrollRef.current?.scrollTo({
        x: Math.max(0, (numero - 1) * ITEM_WIDTH - ITEM_WIDTH),
        animated: true,
      });
    },
    [setJour]
  );

  const handleActivitePress = useCallback(
    (id: string) => {
      router.push(`/activite/${id}`);
    },
    [router]
  );

  const aDesReservations = jourActuel.reservationsRequises.length > 0;

  return (
    <View style={styles.ecran}>
      {/* Header gradient heure du jour */}
      <LinearGradient
        colors={configMoment.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + Espace.lg }]}
      >
        <View style={styles.headerContenu}>
          <View style={styles.headerTextes}>
            <Text style={styles.sousHeaderTexte}>
              Hauts d'Issensac · 25 juil.–1er août 2026
            </Text>
            <Text style={[styles.titreHeader, { color: configMoment.couleurTexteHeader }]}>
              Programme 🌿
            </Text>
          </View>
          <View style={styles.piluleMeteo}>
            <Text style={styles.meteoTexte}>35°C ☀️</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Sélecteur de jours */}
        <View style={styles.selecteurJours}>
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listeJours}
          >
            {PROGRAMME.map((item) => (
              <CartJour
                key={String(item.numero)}
                jour={item}
                estSelectionne={item.numero === jourSelectionne}
                onPress={handleSelectJour}
              />
            ))}
          </ScrollView>
        </View>

        {/* Hero du jour */}
        <Animated.View
          key={`hero-${cle}`}
          entering={FadeInDown.duration(250).springify()}
          style={styles.heroJour}
        >
          <Text style={styles.themeJour}>{jourActuel.theme}</Text>
          <View style={styles.metaJour}>
            <Text style={[Typo.legende, { color: Couleurs.attenué }]}>
              {jourActuel.date}
            </Text>
            <Text style={styles.emojiHumeur}>{jourActuel.emoji}</Text>
          </View>

          {aDesReservations && (
            <View style={styles.alerteResa}>
              <Text style={[Typo.legende, { color: Couleurs.or }]}>
                📅 Pensez à confirmer vos réservations pour aujourd'hui
              </Text>
            </View>
          )}
        </Animated.View>

        {/* Créneaux */}
        <Animated.View
          key={`creneaux-${cle}`}
          entering={FadeInDown.delay(80).duration(250).springify()}
          style={styles.creneaux}
        >
          <BlocCreneau
            creneau={jourActuel.matin}
            horaire="MATIN"
            humeurJour={jourActuel.humeur}
            onPress={handleActivitePress}
          />

          <View style={styles.connecteur}>
            <View style={styles.ligneConnecteur} />
            <Text style={styles.pointConnecteur}>●</Text>
            <View style={styles.ligneConnecteur} />
          </View>

          <BlocCreneau
            creneau={jourActuel.apresmidi}
            horaire="APR.-MIDI"
            humeurJour={jourActuel.humeur}
            onPress={handleActivitePress}
          />

          {jourActuel.soiree && (
            <>
              <View style={styles.connecteur}>
                <View style={styles.ligneConnecteur} />
                <Text style={styles.pointConnecteur}>🌙</Text>
                <View style={styles.ligneConnecteur} />
              </View>
              <BlocCreneau
                creneau={jourActuel.soiree}
                horaire="SOIRÉE"
                humeurJour={jourActuel.humeur}
                onPress={handleActivitePress}
              />
            </>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ecran: {
    flex: 1,
    backgroundColor: Couleurs.fond,
  },
  header: {
    paddingHorizontal: Espace.lg,
    paddingBottom: Espace.xxl,
  },
  headerContenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerTextes: {
    flex: 1,
  },
  sousHeaderTexte: {
    ...Typo.legende,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 4,
  },
  titreHeader: {
    fontFamily: 'DMSerifDisplay_400Regular',
    fontSize: 28,
    lineHeight: 34,
  },
  piluleMeteo: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: Rayon.pilule,
    paddingHorizontal: Espace.md,
    paddingVertical: Espace.xs,
  },
  meteoTexte: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 13,
    color: '#FFFFFF',
  },
  scroll: {
    flex: 1,
  },
  selecteurJours: {
    backgroundColor: Couleurs.surface,
    paddingVertical: Espace.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  listeJours: {
    paddingHorizontal: Espace.lg,
    gap: Espace.sm,
  },
  heroJour: {
    paddingHorizontal: Espace.lg,
    paddingTop: Espace.xl,
    gap: Espace.sm,
  },
  themeJour: {
    fontFamily: 'DMSerifDisplay_400Regular',
    fontSize: 28,
    lineHeight: 34,
    color: Couleurs.encre,
  },
  metaJour: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espace.sm,
  },
  emojiHumeur: {
    fontSize: 20,
  },
  alerteResa: {
    backgroundColor: Couleurs.orClair,
    borderLeftWidth: 3,
    borderLeftColor: Couleurs.or,
    borderRadius: Rayon.sm,
    padding: Espace.md,
  },
  creneaux: {
    paddingHorizontal: Espace.lg,
    paddingTop: Espace.lg,
    gap: 0,
  },
  connecteur: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Espace.sm,
    paddingHorizontal: Espace.xxl,
    gap: Espace.xs,
  },
  ligneConnecteur: {
    flex: 1,
    height: 1,
    backgroundColor: Couleurs.sarcelle,
    opacity: 0.3,
  },
  pointConnecteur: {
    fontSize: 8,
    color: Couleurs.sarcelle,
  },
});
