import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActiviteData } from '../../../data/activites';
import { Couleurs, Espace, Rayon, Typo, Ombre } from '../../../constants/tokens';

interface Props {
  tarif: ActiviteData['tarif'];
}

export const PrixGrille = React.memo(function PrixGrille({ tarif }: Props) {
  if (tarif.gratuit && !tarif.adulte && !tarif.enfant) {
    return (
      <View style={styles.gratuitBadge}>
        <Text style={[Typo.soustitre, { color: Couleurs.sarcelle }]}>✓ Gratuit</Text>
        {tarif.note && (
          <Text style={[Typo.legende, { color: Couleurs.attenué }]}>{tarif.note}</Text>
        )}
      </View>
    );
  }

  const colonnes: { prix: string; label: string }[] = [];
  if (tarif.adulte !== undefined) colonnes.push({ prix: `${tarif.adulte} €`, label: 'Adulte' });
  if (tarif.enfant !== undefined)
    colonnes.push({ prix: `${tarif.enfant} €`, label: tarif.ageEnfant ?? 'Enfant' });
  if (tarif.groupe) colonnes.push({ prix: tarif.groupe, label: 'Groupe' });

  return (
    <View style={styles.grille}>
      {colonnes.map((col, i) => (
        <View key={i} style={styles.colonne}>
          <Text style={[Typo.titre, { color: Couleurs.sarcelle }]}>{col.prix}</Text>
          <Text style={[Typo.micro, styles.labelCol]}>{col.label}</Text>
        </View>
      ))}
      {tarif.note && (
        <Text style={[Typo.legende, styles.note]}>{tarif.note}</Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  grille: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Espace.sm,
  },
  colonne: {
    flex: 1,
    minWidth: 80,
    backgroundColor: Couleurs.sarcelleClaire,
    borderRadius: Rayon.md,
    padding: Espace.md,
    alignItems: 'center',
    ...Ombre.sm,
  },
  labelCol: {
    color: Couleurs.attenué,
    textAlign: 'center',
    marginTop: 2,
  },
  note: {
    width: '100%',
    color: Couleurs.attenué,
    fontStyle: 'italic',
  },
  gratuitBadge: {
    backgroundColor: Couleurs.sarcelleClaire,
    borderRadius: Rayon.md,
    padding: Espace.lg,
    alignItems: 'center',
    gap: 4,
  },
});
