import { Linking, Platform, Alert } from 'react-native';

export async function appeler(telephone: string): Promise<void> {
  const url = `tel:${telephone.replace(/\s/g, '')}`;
  const possible = await Linking.canOpenURL(url);
  if (possible) {
    await Linking.openURL(url);
  } else {
    Alert.alert('Impossible d\'ouvrir le téléphone', `Numéro : ${telephone}`);
  }
}

export async function ouvrirSite(url: string): Promise<void> {
  const possible = await Linking.canOpenURL(url);
  if (possible) {
    await Linking.openURL(url);
  } else {
    Alert.alert('Impossible d\'ouvrir le lien', url);
  }
}

export async function ouvrirItineraire(
  lat: number,
  lng: number,
  nom: string
): Promise<void> {
  const nomEncode = encodeURIComponent(nom);
  const webFallback = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  const tenterOuverture = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch {
      await Linking.openURL(webFallback);
    }
  };

  // Sur le web, ouvrir directement Google Maps
  if (Platform.OS === 'web') {
    await Linking.openURL(webFallback);
    return;
  }

  const options: { label: string; url: string }[] = [
    {
      label: '🚗 Waze',
      url: `waze://?ll=${lat},${lng}&navigate=yes`,
    },
    {
      label: '🗺️ Google Maps',
      url:
        Platform.OS === 'ios'
          ? `comgooglemaps://?daddr=${lat},${lng}&directionsmode=driving`
          : `https://maps.google.com/?daddr=${lat},${lng}`,
    },
    ...(Platform.OS === 'ios'
      ? [{ label: '📍 Plans (Apple)', url: `maps://?ll=${lat},${lng}&q=${nomEncode}` }]
      : []),
  ];

  Alert.alert(
    `Itinéraire`,
    nom,
    [
      ...options.map((opt) => ({
        text: opt.label,
        onPress: () => tenterOuverture(opt.url),
      })),
      { text: 'Annuler', style: 'cancel' as const },
    ],
    { cancelable: true }
  );
}
