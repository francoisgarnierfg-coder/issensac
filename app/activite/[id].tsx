import React, { useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ACTIVITES } from '../../data/activites';
import {
  Couleurs,
  Espace,
  Rayon,
  Typo,
  Ombre,
  couleursCategorie,
} from '../../constants/tokens';
import { PiluleAge } from '../../components/ui/atomes/PiluleAge';
import { PiluleDuree } from '../../components/ui/atomes/PiluleDuree';
import { BadgeReservation } from '../../components/ui/atomes/BadgeReservation';
import { EtiquettePrix } from '../../components/ui/atomes/EtiquettePrix';
import { CarteConseil } from '../../components/ui/molecules/CarteConseil';
import { LigneInfo } from '../../components/ui/molecules/LigneInfo';
import { PrixGrille } from '../../components/ui/organismes/PrixGrille';
import { useAppStore } from '../../store/useAppStore';
import { appeler, ouvrirSite, ouvrirItineraire } from '../../utils/liens';
import { hapticLeger } from '../../utils/haptiques';

function statutBadge(activite: typeof ACTIVITES[0]) {
  if (activite.tarif.note?.includes('Inclus')) return 'inclus' as const;
  if (activite.tarif.gratuit) return 'gratuit' as const;
  if (!activite.reservation.requise) return 'confirme' as const;
  if (activite.reservation.urgente) return 'urgent' as const;
  return 'afaire' as const;
}

export default function EcranDetailActivite() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const favoris = useAppStore((s) => s.favoris);
  const toggleFavori = useAppStore((s) => s.toggleFavori);
  const estFavori = favoris.has(id ?? '');

  const activite = ACTIVITES.find((a) => a.id === id);

  const scaleCoeur = useSharedValue(1);
  const styleCoeur = useAnimatedStyle(() => ({
    transform: [{ scale: scaleCoeur.value }],
  }));

  const handleFavori = useCallback(async () => {
    scaleCoeur.value = withSpring(1.3, { damping: 8 }, () => {
      scaleCoeur.value = withSpring(1, { damping: 12 });
    });
    await hapticLeger();
    if (id) toggleFavori(id);
  }, [id, toggleFavori, scaleCoeur]);

  if (!activite) {
    return (
      <View style={styles.erreur}>
        <Text style={[Typo.titre, { color: Couleurs.encre }]}>Activité introuvable</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[Typo.corps, { color: Couleurs.sarcelle }]}>← Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const couleurs = couleursCategorie(activite.categorie);
  const aTelephone = !!activite.reservation.telephone;
  const aSite = !!activite.reservation.url;

  return (
    <View style={styles.ecran}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={[styles.hero, { paddingTop: insets.top + Espace.lg }]}>
          {activite.photo ? (
            <>
              {activite.categorie === 'vin' && (
                <LinearGradient
                  colors={[couleurs.base, couleurs.milieu]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={StyleSheet.absoluteFill}
                />
              )}
              <Image
                source={activite.photo}
                style={StyleSheet.absoluteFill}
                resizeMode={activite.categorie === 'vin' ? 'contain' : 'cover'}
              />
            </>
          ) : (
            <LinearGradient
              colors={[couleurs.base, couleurs.milieu]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
          )}
          <View style={styles.headerHero}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.boutonVerre}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel="Retour"
            >
              <BlurView intensity={60} tint="light" style={styles.blurBouton}>
                <Text style={[Typo.corpsMoyen, { color: '#FFF' }]}>‹ Retour</Text>
              </BlurView>
            </TouchableOpacity>

            <Animated.View style={styleCoeur}>
              <TouchableOpacity
                onPress={handleFavori}
                style={styles.boutonVerre}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                accessibilityRole="button"
                accessibilityLabel={estFavori ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              >
                <BlurView intensity={60} tint="light" style={styles.blurBouton}>
                  <Text style={{ fontSize: 18 }}>{estFavori ? '❤️' : '🤍'}</Text>
                </BlurView>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>

        {/* Carte chevauchante */}
        <View style={styles.carteContenu}>
          {/* Nom + accroche */}
          <Text style={[styles.nomActivite, { color: Couleurs.encre }]}>
            {activite.nom}
          </Text>
          <Text style={[Typo.corps, styles.accrocheDetail]}>
            {activite.accroche}
          </Text>

          {/* Rangée de badges */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.badges}
          >
            <PiluleAge ageMin={activite.ageMin} label={activite.labelAge} />
            <PiluleDuree
              min={activite.duree.min}
              max={activite.duree.max}
              unite={activite.duree.unite}
            />
            <BadgeReservation statut={statutBadge(activite)} />
            <EtiquettePrix
              adulte={activite.tarif.adulte}
              enfant={activite.tarif.enfant}
              gratuit={activite.tarif.gratuit}
            />
          </ScrollView>

          {/* Description */}
          <Text style={[Typo.corps, styles.description]}>
            {activite.description}
          </Text>

          {/* Infos pratiques */}
          <View style={styles.section}>
            <Text style={[Typo.etiquette, styles.labelSection]}>INFOS PRATIQUES</Text>
            <View style={styles.blocInfos}>
              <LigneInfo icone="📍" label="Lieu" valeur={activite.lieu.nom} />
              <View style={styles.separateurInfo} />
              <LigneInfo
                icone="🚗"
                label="Distance"
                valeur={activite.lieu.distanceDomaine}
              />
              <View style={styles.separateurInfo} />
              <LigneInfo
                icone="⏱"
                label="Durée"
                valeur={`${activite.duree.min === activite.duree.max
                  ? `${activite.duree.min}${activite.duree.unite}`
                  : `${activite.duree.min}–${activite.duree.max} ${activite.duree.unite}`
                }`}
              />
              <View style={styles.separateurInfo} />
              <LigneInfo
                icone="⏰"
                label="Idéal"
                valeur={activite.meilleureHeure}
              />
              <View style={styles.separateurInfo} />
              <LigneInfo icone="👶" label="Âge" valeur={activite.labelAge} />
              {activite.reservation.telephone && (
                <>
                  <View style={styles.separateurInfo} />
                  <LigneInfo
                    icone="📞"
                    label="Contact"
                    valeur={activite.reservation.telephone}
                    onPress={() => appeler(activite.reservation.telephone!)}
                    copiable
                  />
                </>
              )}
            </View>
          </View>

          {/* Tarifs */}
          {(activite.tarif.adulte !== undefined ||
            activite.tarif.enfant !== undefined ||
            activite.tarif.gratuit) && (
            <View style={styles.section}>
              <Text style={[Typo.etiquette, styles.labelSection]}>TARIFS</Text>
              <PrixGrille tarif={activite.tarif} />
            </View>
          )}

          {/* Conseils & avertissements */}
          {(activite.conseils.length > 0 || activite.avertissements.length > 0) && (
            <View style={styles.section}>
              <Text style={[Typo.etiquette, styles.labelSection]}>CONSEILS</Text>
              <View style={styles.conseilsListe}>
                {activite.avertissements.map((a, i) => (
                  <CarteConseil key={`att-${i}`} texte={a} variante="attention" />
                ))}
                {activite.conseils.map((c, i) => (
                  <CarteConseil key={`co-${i}`} texte={c} variante="conseil" />
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Pied d'action fixe */}
      <View style={[styles.piedAction, { paddingBottom: insets.bottom + Espace.md }]}>
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/programme')}
          style={styles.lienProgramme}
        >
          <Text style={[Typo.legende, { color: Couleurs.sarcelle }]}>
            Voir dans le programme →
          </Text>
        </TouchableOpacity>
        <View style={styles.boutonsPied}>
          {aTelephone && (
            <TouchableOpacity
              onPress={() => appeler(activite.reservation.telephone!)}
              style={[styles.btnPied, styles.btnPrimaire]}
              accessibilityRole="button"
              accessibilityLabel="Appeler"
            >
              <Text style={[Typo.corpsMoyen, { color: '#FFF' }]}>📞 Appeler</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() =>
              ouvrirItineraire(activite.lieu.lat, activite.lieu.lng, activite.nom)
            }
            style={[
              styles.btnPied,
              aTelephone ? styles.btnSecondaire : styles.btnPrimaire,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Itinéraire"
          >
            <Text
              style={[
                Typo.corpsMoyen,
                { color: aTelephone ? Couleurs.sarcelle : '#FFF' },
              ]}
            >
              🗺️ Itinéraire
            </Text>
          </TouchableOpacity>
          {aSite && (
            <TouchableOpacity
              onPress={() => ouvrirSite(activite.reservation.url!)}
              style={[styles.btnPied, styles.btnSecondaire]}
              accessibilityRole="button"
              accessibilityLabel="Site web"
            >
              <Text style={[Typo.corpsMoyen, { color: Couleurs.sarcelle }]}>🌐 Site</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ecran: {
    flex: 1,
    backgroundColor: Couleurs.fond,
  },
  erreur: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Espace.lg,
  },
  scroll: {
    flex: 1,
  },
  hero: {
    height: 240,
    paddingHorizontal: Espace.lg,
    overflow: 'hidden',
  },
  headerHero: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boutonVerre: {
    borderRadius: Rayon.pilule,
    overflow: 'hidden',
  },
  blurBouton: {
    paddingHorizontal: Espace.md,
    paddingVertical: Espace.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carteContenu: {
    backgroundColor: Couleurs.surface,
    borderTopLeftRadius: Rayon.xl,
    borderTopRightRadius: Rayon.xl,
    marginTop: -Rayon.xl,
    padding: Espace.xl,
    gap: Espace.xl,
  },
  nomActivite: {
    fontFamily: 'DMSerifDisplay_400Regular',
    fontSize: 32,
    lineHeight: 38,
  },
  accrocheDetail: {
    color: Couleurs.attenué,
    fontStyle: 'italic',
    marginTop: -Espace.md,
  },
  badges: {
    gap: Espace.sm,
  },
  description: {
    color: Couleurs.encreDouce,
    lineHeight: 22,
  },
  section: {
    gap: Espace.md,
  },
  labelSection: {
    color: Couleurs.attenué,
    borderTopWidth: 1,
    borderTopColor: Couleurs.bordureClaire,
    paddingTop: Espace.md,
  },
  blocInfos: {
    backgroundColor: Couleurs.fond,
    borderRadius: Rayon.md,
    padding: Espace.lg,
  },
  separateurInfo: {
    height: 1,
    backgroundColor: Couleurs.bordureClaire,
  },
  conseilsListe: {
    gap: Espace.sm,
  },
  piedAction: {
    backgroundColor: Couleurs.surface,
    borderTopWidth: 1,
    borderTopColor: Couleurs.bordureClaire,
    paddingHorizontal: Espace.lg,
    paddingTop: Espace.md,
    gap: Espace.sm,
    ...Ombre.lg,
  },
  lienProgramme: {
    alignItems: 'center',
  },
  boutonsPied: {
    flexDirection: 'row',
    gap: Espace.sm,
  },
  btnPied: {
    flex: 1,
    height: 48,
    borderRadius: Rayon.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimaire: {
    backgroundColor: Couleurs.sarcelle,
  },
  btnSecondaire: {
    borderWidth: 1.5,
    borderColor: Couleurs.sarcelle,
    backgroundColor: Couleurs.surface,
  },
});
