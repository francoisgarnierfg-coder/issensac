import { Link, Stack } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Couleurs, Typo, Espace } from '../constants/tokens';

export default function EcranIntrouvable() {
  return (
    <>
      <Stack.Screen options={{ title: 'Page introuvable' }} />
      <View style={styles.ecran}>
        <Text style={styles.emoji}>🗺️</Text>
        <Text style={[Typo.titre, { color: Couleurs.encre }]}>Page introuvable</Text>
        <Link href="/(tabs)/programme">
          <Text style={[Typo.corps, { color: Couleurs.sarcelle }]}>
            ← Retour au programme
          </Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  ecran: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Couleurs.fond,
    gap: Espace.lg,
  },
  emoji: {
    fontSize: 64,
  },
});
