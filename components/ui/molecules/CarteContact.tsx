import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ContactData } from '../../../data/contacts';
import { Couleurs, Espace, Rayon, Typo, Ombre } from '../../../constants/tokens';
import { appeler } from '../../../utils/liens';
import { hapticLeger } from '../../../utils/haptiques';

interface Props {
  contact: ContactData;
}

export const CarteContact = React.memo(function CarteContact({ contact }: Props) {
  const handleAppel = async () => {
    if (!contact.telephone) return;
    await hapticLeger();
    await appeler(contact.telephone);
  };

  return (
    <View
      style={[
        styles.carte,
        contact.estUrgent && styles.carteUrgent,
      ]}
    >
      <View style={styles.gauche}>
        <Text style={styles.icone}>{contact.icone}</Text>
      </View>
      <View style={styles.centre}>
        <Text style={[Typo.soustitre, { color: Couleurs.encre }]} numberOfLines={1}>
          {contact.nom}
        </Text>
        {contact.note && (
          <Text style={[Typo.legende, { color: Couleurs.attenué }]} numberOfLines={1}>
            {contact.note}
          </Text>
        )}
        {contact.telephone && (
          <TouchableOpacity onPress={handleAppel} hitSlop={{ top: 4, bottom: 4 }}>
            <Text style={[Typo.corpsMoyen, { color: Couleurs.sarcelle }]}>
              {contact.telephone}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {contact.telephone && (
        <TouchableOpacity
          onPress={handleAppel}
          style={styles.boutonAppel}
          accessibilityRole="button"
          accessibilityLabel={`Appeler ${contact.nom}`}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.texteAppel}>📞</Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  carte: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Couleurs.surface,
    borderRadius: Rayon.md,
    padding: Espace.lg,
    gap: Espace.md,
    ...Ombre.sm,
  },
  carteUrgent: {
    borderLeftWidth: 3,
    borderLeftColor: Couleurs.danger,
  },
  gauche: {
    width: 40,
    height: 40,
    borderRadius: Rayon.lg,
    backgroundColor: Couleurs.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icone: {
    fontSize: 20,
  },
  centre: {
    flex: 1,
    gap: 2,
  },
  boutonAppel: {
    width: 40,
    height: 40,
    borderRadius: Rayon.lg,
    backgroundColor: Couleurs.sarcelleClaire,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texteAppel: {
    fontSize: 18,
  },
});
