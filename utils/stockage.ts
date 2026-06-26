import AsyncStorage from '@react-native-async-storage/async-storage';

export async function sauvegarder<T>(cle: string, valeur: T): Promise<void> {
  try {
    await AsyncStorage.setItem(`issensac_${cle}`, JSON.stringify(valeur));
  } catch {
    // Échec silencieux — l'état reste en mémoire
  }
}

export async function charger<T>(cle: string): Promise<T | null> {
  try {
    const valeur = await AsyncStorage.getItem(`issensac_${cle}`);
    return valeur ? (JSON.parse(valeur) as T) : null;
  } catch {
    return null;
  }
}

export async function supprimer(cle: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(`issensac_${cle}`);
  } catch {
    // Échec silencieux
  }
}
