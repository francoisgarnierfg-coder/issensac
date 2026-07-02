import React from 'react';
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CONTACTS, LABELS_GROUPES, GroupeContact } from '../../data/contacts';
import { useChecklist } from '../../hooks/useChecklist';
import { CarteContact } from '../../components/ui/molecules/CarteContact';
import { LigneChecklist } from '../../components/ui/molecules/LigneChecklist';
import { CarteMétéo } from '../../components/ui/molecules/CarteMétéo';
import { AnneauProgression } from '../../components/ui/molecules/AnneauProgression';
import { Couleurs, Espace, Rayon, Typo, Ombre } from '../../constants/tokens';
import { useAppStore } from '../../store/useAppStore';
import { ouvrirItineraire } from '../../utils/liens';

const METEO_DATA = [
  { emoji: '🌡️', label: 'Journée', valeur: '28–36°C', conseil: 'Sorties avant 10h ou après 17h' },
  { emoji: '🌙', label: 'Nuit', valeur: '16–20°C', conseil: 'Nuits fraîches — drap léger pour les enfants' },
  { emoji: '🕳️', label: 'Grotte', valeur: '14°C constants', conseil: 'Pull obligatoire — choc thermique garanti !' },
  { emoji: '🏊', label: 'Piscine', valeur: '26–30°C', conseil: 'Parfaite toute la journée' },
  { emoji: '🌊', label: 'Hérault', valeur: '22–26°C', conseil: 'Surveiller le courant' },
  { emoji: '💧', label: 'Buèges', valeur: '18–22°C', conseil: 'Idéale pour les tout-petits' },
  { emoji: '☀️', label: 'UV', valeur: 'Très forts', conseil: 'SPF50+, chapeau, renouveler toutes 2h' },
  { emoji: '⛈️', label: 'Orage', valeur: 'Rare mais vif', conseil: 'Quitter les rivières si orage visible' },
];

const ORDRE_GROUPES: GroupeContact[] = ['urgences', 'domaine', 'activites', 'vins', 'sante'];

function SectionHeader({
  titre,
  droite,
  couleur,
}: {
  titre: string;
  droite?: React.ReactNode;
  couleur?: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <View
        style={[styles.pointCat, { backgroundColor: couleur ?? Couleurs.marine }]}
      />
      <Text style={[Typo.etiquette, { color: Couleurs.encreDouce }]}>{titre}</Text>
      <View style={styles.spacer} />
      {droite}
    </View>
  );
}

export default function EcranInfos() {
  const insets = useSafeAreaInsets();
  const etatChecklist = useAppStore((s) => s.etatChecklist);
  const resaHook = useChecklist('reservations');
  const bagHook = useChecklist('bagages');

  const groupesContacts = ORDRE_GROUPES.map((groupe) => ({
    groupe,
    contacts: CONTACTS.filter((c) => c.groupe === groupe),
  }));

  return (
    <ScrollView
      style={[styles.ecran, { paddingTop: insets.top }]}
      contentContainerStyle={[
        styles.contenu,
        { paddingBottom: insets.bottom + 80 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Titre de page */}
      <View style={styles.header}>
        <Text style={[Typo.titre, { color: Couleurs.encre }]}>Infos pratiques</Text>
      </View>

      {/* SECTION : CONTACTS */}
      <SectionHeader titre="CONTACTS" couleur={Couleurs.marine} />
      {groupesContacts.map(({ groupe, contacts }) => (
        <View key={groupe} style={styles.bloc}>
          <View style={styles.sousTitreContact}>
            {groupe === 'urgences' && (
              <View style={styles.pointUrgent} />
            )}
            <Text
              style={[
                Typo.etiquette,
                { color: groupe === 'urgences' ? Couleurs.danger : Couleurs.attenué, fontSize: 10 },
              ]}
            >
              {LABELS_GROUPES[groupe].toUpperCase()}
            </Text>
          </View>
          {contacts.map((c) => (
            <CarteContact key={c.id} contact={c} />
          ))}
        </View>
      ))}

      {/* SECTION : MÉTÉO */}
      <View style={styles.separateur} />
      <SectionHeader titre="MÉTÉO JUIL.–AOÛT" couleur={Couleurs.sarcelle} />
      <View style={styles.grilleMeteo}>
        {METEO_DATA.map((item, i) => (
          <View key={i} style={styles.celluleMeteo}>
            <CarteMétéo
              emoji={item.emoji}
              label={item.label}
              valeur={item.valeur}
              conseil={item.conseil}
            />
          </View>
        ))}
      </View>

      {/* SECTION : RÉSERVATIONS */}
      <View style={styles.separateur} />
      <SectionHeader
        titre="RÉSERVATIONS"
        couleur={Couleurs.danger}
        droite={
          <AnneauProgression
            valeur={resaHook.nombreCoches}
            total={resaHook.total}
            taille={40}
            couleur={Couleurs.succes}
          />
        }
      />
      <View style={styles.bloc}>
        {resaHook.toutCoche ? (
          <View style={styles.toutCoche}>
            <Text style={[Typo.soustitre, { color: Couleurs.succes }]}>
              Tout est confirmé 🎉
            </Text>
          </View>
        ) : (
          resaHook.elements.map((el) => (
            <LigneChecklist
              key={el.id}
              element={el}
              coche={!!etatChecklist[el.id]}
              onToggle={resaHook.toggle}
            />
          ))
        )}
      </View>

      {/* SECTION : BAGAGES */}
      <View style={styles.separateur} />
      <SectionHeader
        titre="BAGAGES"
        couleur={Couleurs.or}
        droite={
          <AnneauProgression
            valeur={bagHook.nombreCoches}
            total={bagHook.total}
            taille={40}
            couleur={Couleurs.or}
          />
        }
      />
      <View style={styles.bloc}>
        {bagHook.toutCoche ? (
          <View style={styles.toutCoche}>
            <Text style={[Typo.soustitre, { color: Couleurs.succes }]}>
              Valises prêtes 🎒
            </Text>
          </View>
        ) : (
          bagHook.elements.map((el) => (
            <LigneChecklist
              key={el.id}
              element={el}
              coche={!!etatChecklist[el.id]}
              onToggle={bagHook.toggle}
            />
          ))
        )}
      </View>

      {/* SECTION : LE DOMAINE */}
      <View style={styles.separateur} />
      <SectionHeader titre="LE DOMAINE" couleur={Couleurs.domaine.base} />
      <View style={styles.bloc}>
        <View style={styles.carteDomaine}>
          <Text style={[Typo.soustitre, { color: Couleurs.encre }]}>
            🏡 Les Hauts d'Issensac
          </Text>
          <Text style={[Typo.corps, { color: Couleurs.encreDouce }]}>
            Causse-de-la-Selle, Hérault
          </Text>
          <View style={styles.infoDomaine}>
            <Text style={[Typo.legende, { color: Couleurs.attenué }]}>Piscine</Text>
            <Text style={[Typo.corpsMoyen, { color: Couleurs.encre }]}>
              Profondeur 1m20–1m50 · Zone 30cm petits
            </Text>
          </View>
          <View style={styles.infoDomaine}>
            <Text style={[Typo.legende, { color: Couleurs.attenué }]}>Rivières</Text>
            <Text style={[Typo.corpsMoyen, { color: Couleurs.encre }]}>
              Buèges & Hérault · 5–10 min à pied
            </Text>
          </View>
          <View style={styles.infoDomaine}>
            <Text style={[Typo.legende, { color: Couleurs.attenué }]}>Horaires</Text>
            <Text style={[Typo.corpsMoyen, { color: Couleurs.encre }]}>
              Piscine 9h–21h · Plages accès libre
            </Text>
          </View>
        </View>

        <View style={[styles.carteTractotour]}>
          <Text style={[Typo.corpsMoyen, { color: Couleurs.or }]}>
            🚜 Tractotour gratuit — à demander dès l'arrivée à Louis Coulet !
          </Text>
          <Text style={[Typo.legende, { color: Couleurs.attenué, marginTop: 4 }]}>
            Balade dans le vignoble biologique — mémorable pour les enfants
          </Text>
        </View>

        <CarteContact
          contact={CONTACTS.find((c) => c.id === 'louis')!}
        />
      </View>

      {/* SECTION : MESSE */}
      <View style={styles.separateur} />
      <SectionHeader titre="MESSE DOMINICALE" couleur="#7B5EA7" />
      <View style={styles.bloc}>
        <View style={styles.carteDomaine}>
          <Text style={[Typo.soustitre, { color: Couleurs.encre }]}>
            ⛪ Saints Pierre et Paul — Ganges
          </Text>
          <Text style={[Typo.corps, { color: Couleurs.encreDouce }]}>
            Dimanche 10h30 · 6 km du domaine (~10 min)
          </Text>
          <View style={styles.infoDomaine}>
            <Text style={[Typo.legende, { color: Couleurs.attenué }]}>Adresse</Text>
            <Text style={[Typo.corpsMoyen, { color: Couleurs.encre }]}>
              Place de la République, 34190 Ganges
            </Text>
          </View>
          <View style={styles.infoDomaine}>
            <Text style={[Typo.legende, { color: Couleurs.attenué }]}>Durée</Text>
            <Text style={[Typo.corpsMoyen, { color: Couleurs.encre }]}>
              ~1h · Retour vers 11h30
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => ouvrirItineraire(43.934, 3.703, 'Église Saints Pierre et Paul — Ganges')}
            style={styles.btnMesse}
            accessibilityRole="button"
            accessibilityLabel="Itinéraire vers l'église"
          >
            <Text style={[Typo.corpsMoyen, { color: '#FFF' }]}>🗺️ Itinéraire</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ecran: {
    flex: 1,
    backgroundColor: Couleurs.fond,
  },
  contenu: {
    gap: Espace.sm,
  },
  header: {
    paddingHorizontal: Espace.lg,
    paddingVertical: Espace.lg,
    backgroundColor: Couleurs.surface,
    borderBottomWidth: 1,
    borderBottomColor: Couleurs.bordureClaire,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espace.sm,
    paddingHorizontal: Espace.lg,
    paddingVertical: Espace.sm,
    backgroundColor: Couleurs.surface,
  },
  pointCat: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  spacer: {
    flex: 1,
  },
  separateur: {
    height: Espace.md,
    backgroundColor: Couleurs.fond,
  },
  bloc: {
    backgroundColor: Couleurs.surface,
    paddingHorizontal: Espace.lg,
    paddingVertical: Espace.md,
    gap: Espace.sm,
  },
  sousTitreContact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espace.xs,
    marginBottom: Espace.xs,
    paddingTop: Espace.xs,
  },
  pointUrgent: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Couleurs.danger,
  },
  grilleMeteo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: Espace.lg,
    gap: Espace.sm,
    backgroundColor: Couleurs.surface,
  },
  celluleMeteo: {
    width: '48%',
  },
  toutCoche: {
    alignItems: 'center',
    paddingVertical: Espace.xl,
  },
  carteDomaine: {
    backgroundColor: Couleurs.fond,
    borderRadius: Rayon.md,
    padding: Espace.lg,
    gap: Espace.sm,
    ...Ombre.sm,
  },
  infoDomaine: {
    borderTopWidth: 1,
    borderTopColor: Couleurs.bordureClaire,
    paddingTop: Espace.sm,
    gap: 2,
  },
  btnMesse: {
    marginTop: Espace.sm,
    height: 44,
    borderRadius: Rayon.md,
    backgroundColor: Couleurs.sarcelle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carteTractotour: {
    backgroundColor: Couleurs.orClair,
    borderLeftWidth: 3,
    borderLeftColor: Couleurs.or,
    borderRadius: Rayon.sm,
    padding: Espace.lg,
  },
});
