import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Animated, { FadeInDown, LinearTransition } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ACTIVITES, Categorie } from '../../data/activites';
import { useAppStore } from '../../store/useAppStore';
import { CarteActivite } from '../../components/ui/organismes/CarteActivite';
import { Couleurs, Espace, Rayon, Typo } from '../../constants/tokens';

type Filtre = 'toutes' | Categorie | 'favoris';

const FILTRES: { id: Filtre; emoji: string; label: string }[] = [
  { id: 'toutes', emoji: '✨', label: 'Toutes' },
  { id: 'eau', emoji: '💧', label: 'Eau' },
  { id: 'culture', emoji: '🏛', label: 'Culture' },
  { id: 'nature', emoji: '🏞', label: 'Nature' },
  { id: 'domaine', emoji: '🏡', label: 'Domaine' },
  { id: 'vin', emoji: '🍷', label: 'Vin' },
  { id: 'favoris', emoji: '❤️', label: 'Favoris' },
];

const LABELS_CAT: Record<Categorie, string> = {
  eau: '💧 Eau & Baignade',
  culture: '🏛 Culture & Patrimoine',
  nature: '🏞 Nature & Panoramas',
  domaine: '🏡 Sur le Domaine',
  vin: '🍷 Oenotourisme',
};

export default function EcranActivites() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [filtre, setFiltre] = useState<Filtre>('toutes');
  const favoris = useAppStore((s) => s.favoris);

  const activitesFiltrees = (() => {
    if (filtre === 'toutes') return ACTIVITES;
    if (filtre === 'favoris') return ACTIVITES.filter((a) => favoris.has(a.id));
    return ACTIVITES.filter((a) => a.categorie === filtre);
  })();

  const sections = (() => {
    if (filtre !== 'toutes') return null;
    const groupes: Record<string, typeof ACTIVITES> = {};
    ACTIVITES.forEach((a) => {
      if (!groupes[a.categorie]) groupes[a.categorie] = [];
      groupes[a.categorie].push(a);
    });
    return Object.entries(groupes).map(([cat, data]) => ({
      title: cat as Categorie,
      data,
    }));
  })();

  const handlePress = useCallback(
    (id: string) => router.push(`/activite/${id}`),
    [router]
  );

  const nombreFavoris = favoris.size;

  const renderFiltre = ({ id, emoji, label }: typeof FILTRES[0]) => (
    <TouchableOpacity
      key={id}
      onPress={() => setFiltre(id)}
      style={[
        styles.piluleFiltre,
        filtre === id && styles.piluleFiltreActive,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected: filtre === id }}
      accessibilityLabel={`Filtrer : ${label}`}
    >
      <Text
        style={[
          Typo.legende,
          {
            color: filtre === id ? '#FFFFFF' : Couleurs.encreDouce,
            fontFamily: 'DMSans_500Medium',
          },
        ]}
      >
        {emoji} {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.ecran, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[Typo.titre, { color: Couleurs.encre }]}>Nos activités</Text>
        {nombreFavoris > 0 && (
          <Text style={[Typo.legende, { color: Couleurs.attenué }]}>
            ❤️ {nombreFavoris} coup{nombreFavoris > 1 ? 's' : ''} de cœur
          </Text>
        )}
      </View>

      {/* Barre de filtres */}
      {Platform.OS === 'web' ? (
        <View style={[styles.filtresScroll, styles.filtresWebConteneur]}>
          {FILTRES.map(renderFiltre)}
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtresScroll}
          contentContainerStyle={styles.filtresContenu}
        >
          {FILTRES.map(renderFiltre)}
        </ScrollView>
      )}

      {/* Liste des activités */}
      {filtre === 'favoris' && activitesFiltrees.length === 0 ? (
        <View style={styles.vide}>
          <Text style={styles.videEmoji}>🤍</Text>
          <Text style={[Typo.soustitre, { color: Couleurs.encreDouce }]}>
            Pas encore de favoris
          </Text>
          <Text style={[Typo.corps, { color: Couleurs.attenué, textAlign: 'center' }]}>
            Appuie sur ❤️ pour garder tes activités préférées
          </Text>
        </View>
      ) : Platform.OS === 'web' ? (
        <ScrollView
          style={styles.listeWeb}
          contentContainerStyle={[
            styles.listeContenu,
            { paddingBottom: insets.bottom + 80 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {sections ? sections.map((section) => (
            <View key={section.title}>
              <View style={styles.sectionHeader}>
                <View style={[styles.bandeSectionHeader, { backgroundColor: Couleurs[section.title as Categorie].base }]} />
                <Text style={[Typo.etiquette, { color: Couleurs[section.title as Categorie].base }]}>
                  {LABELS_CAT[section.title as Categorie]}
                </Text>
                <View style={styles.spacer} />
                <Text style={[Typo.legende, { color: Couleurs.subtil }]}>{section.data.length}</Text>
              </View>
              {section.data.map((item, i) => (
                <View key={item.id} style={i > 0 ? { marginTop: Espace.sm } : undefined}>
                  <CarteActivite activite={item} variante="liste" onPress={handlePress} />
                </View>
              ))}
              <View style={{ height: Espace.lg }} />
            </View>
          )) : activitesFiltrees.map((item, i) => (
            <View key={item.id} style={i > 0 ? { marginTop: Espace.sm } : undefined}>
              <CarteActivite activite={item} variante="liste" onPress={handlePress} />
            </View>
          ))}
        </ScrollView>
      ) : sections ? (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.listeContenu,
            { paddingBottom: insets.bottom + 80 },
          ]}
          stickySectionHeadersEnabled={false}
          ItemSeparatorComponent={() => <View style={{ height: Espace.sm }} />}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <View
                style={[
                  styles.bandeSectionHeader,
                  { backgroundColor: Couleurs[section.title as Categorie].base },
                ]}
              />
              <Text style={[Typo.etiquette, { color: Couleurs[section.title as Categorie].base }]}>
                {LABELS_CAT[section.title as Categorie]}
              </Text>
              <View style={styles.spacer} />
              <Text style={[Typo.legende, { color: Couleurs.subtil }]}>
                {section.data.length}
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <Animated.View entering={FadeInDown.springify()} layout={LinearTransition.springify()}>
              <CarteActivite activite={item} variante="liste" onPress={handlePress} />
            </Animated.View>
          )}
          renderSectionFooter={() => <View style={{ height: Espace.lg }} />}
        />
      ) : (
        <FlatList
          data={activitesFiltrees}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.listeContenu,
            { paddingBottom: insets.bottom + 80 },
          ]}
          ItemSeparatorComponent={() => <View style={{ height: Espace.sm }} />}
          renderItem={({ item }) => (
            <Animated.View entering={FadeInDown.springify()} layout={LinearTransition.springify()}>
              <CarteActivite activite={item} variante="liste" onPress={handlePress} />
            </Animated.View>
          )}
        />
      )}
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
    paddingVertical: Espace.lg,
    gap: 2,
    backgroundColor: Couleurs.surface,
    borderBottomWidth: 1,
    borderBottomColor: Couleurs.bordureClaire,
  },
  filtresScroll: {
    backgroundColor: Couleurs.surface,
    borderBottomWidth: 1,
    borderBottomColor: Couleurs.bordureClaire,
  },
  filtresContenu: {
    paddingHorizontal: Espace.lg,
    paddingVertical: Espace.sm,
    gap: Espace.sm,
  },
  filtresWebConteneur: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Espace.lg,
    paddingVertical: Espace.sm,
    gap: Espace.sm,
  },
  piluleFiltre: {
    paddingHorizontal: Espace.md,
    paddingVertical: Espace.xs + 2,
    borderRadius: Rayon.pilule,
    backgroundColor: Couleurs.surfaceAlt,
  },
  piluleFiltreActive: {
    backgroundColor: Couleurs.marine,
  },
  listeWeb: {
    flex: 1,
  },
  listeContenu: {
    padding: Espace.lg,
    gap: Espace.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espace.sm,
    marginBottom: Espace.sm,
    marginTop: Espace.lg,
    paddingBottom: Espace.sm,
    borderBottomWidth: 1,
    borderBottomColor: Couleurs.bordureClaire,
  },
  bandeSectionHeader: {
    width: 3,
    height: 16,
    borderRadius: 2,
  },
  spacer: {
    flex: 1,
  },
  vide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Espace.lg,
    padding: Espace.xxxl,
  },
  videEmoji: {
    fontSize: 48,
  },
});
