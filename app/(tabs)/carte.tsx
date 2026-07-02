import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { ACTIVITES, Categorie } from '../../data/activites';
import {
  Couleurs,
  Espace,
  Rayon,
  Typo,
  Ombre,
  couleursCategorie,
} from '../../constants/tokens';
import { ouvrirItineraire } from '../../utils/liens';
import { PiluleCategorie } from '../../components/ui/atomes/PiluleCategorie';

const { width: SW, height: SH } = Dimensions.get('window');

// Note: MapView from react-native-maps nécessite une config native
// Ce composant montre l'écran complet avec fallback web-compatible
let MapView: any = null;
let Marker: any = null;
let PROVIDER_GOOGLE: any = null;

try {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
  PROVIDER_GOOGLE = Maps.PROVIDER_GOOGLE;
} catch {
  // Maps non disponible en mode Expo Go web
}

type FiltreCategorie = 'toutes' | Categorie;

interface ActiviteSelectionnee {
  id: string;
  nom: string;
  emoji: string;
  categorie: Categorie;
  accroche: string;
  distanceDomaine: string;
  meilleureHeure: string;
  tarif: { gratuit: boolean; adulte?: number; note?: string };
  telephone?: string;
}

const COULEURS_CAT: Record<string, string> = {
  eau: '#0A5C96',
  culture: '#5B3FA0',
  nature: '#2A6B42',
  domaine: '#8B4A00',
  vin: '#8B1A3C',
};

function generateLeafletHTML(activites: typeof ACTIVITES): string {
  const data = activites.map((a) => ({
    n: a.nom,
    e: a.emoji,
    a: a.accroche,
    d: a.lieu.distanceDomaine,
    lat: a.lieu.lat,
    lng: a.lieu.lng,
    c: COULEURS_CAT[a.categorie] ?? '#1C3557',
  }));

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body,#map{height:100%;font-family:-apple-system,BlinkMacSystemFont,sans-serif}
.pin{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;border:2.5px solid white;box-shadow:0 2px 8px rgba(0,0,0,.28)}
.leaflet-popup-content-wrapper{border-radius:14px;box-shadow:0 4px 20px rgba(0,0,0,.15)}
.leaflet-popup-content{margin:14px 16px}
.pn{font-weight:700;font-size:15px;color:#1C3557;margin-bottom:4px}
.pa{color:#666;font-size:13px;line-height:1.4;margin-bottom:5px}
.pd{color:#999;font-size:12px;margin-bottom:12px}
.pb{display:inline-block;padding:8px 16px;background:#1C3557;color:#fff;border-radius:9px;text-decoration:none;font-size:13px;font-weight:600}
.pb:active{opacity:.8}
</style>
</head>
<body>
<div id="map"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
var D=${JSON.stringify(data)};
var map=L.map('map',{zoomControl:true}).setView([43.74,3.58],11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution:'© <a href="https://openstreetmap.org">OpenStreetMap</a>',maxZoom:18
}).addTo(map);
D.forEach(function(a){
  var el=document.createElement('div');
  el.className='pin';el.style.background=a.c;el.textContent=a.e;
  L.marker([a.lat,a.lng],{
    icon:L.divIcon({html:el.outerHTML,iconSize:[44,44],iconAnchor:[22,22],popupAnchor:[0,-26],className:''})
  }).addTo(map).bindPopup(
    '<div class="pn">'+a.e+' '+a.n+'</div>'+
    '<div class="pa">'+a.a+'</div>'+
    '<div class="pd">📍 '+a.d+'</div>'+
    '<a class="pb" href="https://www.google.com/maps/dir/?api=1&destination='+a.lat+','+a.lng+'" target="_blank">🗺️ Itinéraire</a>',
    {maxWidth:280,minWidth:200}
  );
});
</script>
</body>
</html>`;
}

const FILTRES_CARTE: { id: FiltreCategorie; emoji: string; label: string }[] = [
  { id: 'toutes', emoji: '✨', label: 'Toutes' },
  { id: 'eau', emoji: '💧', label: 'Eau' },
  { id: 'culture', emoji: '🏛', label: 'Culture' },
  { id: 'nature', emoji: '🏞', label: 'Nature' },
  { id: 'domaine', emoji: '🏡', label: 'Domaine' },
  { id: 'vin', emoji: '🍷', label: 'Vin' },
];

export default function EcranCarte() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const mapRef = useRef<any>(null);
  const [filtre, setFiltre] = useState<FiltreCategorie>('toutes');
  const [activiteSelectionnee, setActiviteSelectionnee] = useState<ActiviteSelectionnee | null>(null);

  const activitesFiltrees = ACTIVITES.filter(
    (a) => filtre === 'toutes' || a.categorie === filtre
  );

  const centrerDomaine = useCallback(() => {
    mapRef.current?.animateToRegion(
      { latitude: 43.721, longitude: 3.622, latitudeDelta: 0.15, longitudeDelta: 0.1 },
      600
    );
  }, []);

  const handleMarqueurPress = useCallback((activite: typeof ACTIVITES[0]) => {
    setActiviteSelectionnee({
      id: activite.id,
      nom: activite.nom,
      emoji: activite.emoji,
      categorie: activite.categorie,
      accroche: activite.accroche,
      distanceDomaine: activite.lieu.distanceDomaine,
      meilleureHeure: activite.meilleureHeure,
      tarif: activite.tarif,
      telephone: activite.reservation.telephone,
    });
  }, []);

  if (Platform.OS === 'web') {
    const htmlContent = generateLeafletHTML(ACTIVITES);
    return (
      <View style={{ flex: 1, backgroundColor: Couleurs.fond }}>
        <View style={[styles.headerWeb, { paddingTop: insets.top }]}>
          <Text style={[Typo.titre, { color: Couleurs.encre }]}>Carte des activités</Text>
          <Text style={[Typo.legende, { color: Couleurs.attenué }]}>
            {ACTIVITES.length} lieux · tap pour l'itinéraire
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          {(React as any).createElement('iframe', {
            srcDoc: htmlContent,
            style: { width: '100%', height: '100%', border: 'none', display: 'block' },
            title: 'Carte des activités',
          })}
        </View>
      </View>
    );
  }

  if (!MapView) {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: Couleurs.fond }}
        contentContainerStyle={[styles.fallback, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.fallbackEmoji}>🗺️</Text>
        <Text style={[Typo.titre, { color: Couleurs.encre, textAlign: 'center' }]}>
          Carte des activités
        </Text>
        <Text style={[Typo.corps, { color: Couleurs.attenué, textAlign: 'center' }]}>
          Carte disponible sur appareil physique{'\n'}(iOS ou Android)
        </Text>
        <View style={styles.listeActivitesCarte}>
          {ACTIVITES.map((a) => {
            const col = couleursCategorie(a.categorie);
            return (
              <TouchableOpacity
                key={a.id}
                onPress={() => router.push(`/activite/${a.id}`)}
                style={[styles.ligneActiviteCarte, { borderLeftColor: col.base }]}
              >
                <Text style={styles.emojiCarte}>{a.emoji}</Text>
                <View style={styles.infosActiviteCarte}>
                  <Text style={[Typo.corpsMoyen, { color: Couleurs.encre }]} numberOfLines={1}>
                    {a.nom}
                  </Text>
                  <Text style={[Typo.legende, { color: Couleurs.attenué }]}>
                    📍 {a.lieu.distanceDomaine}
                  </Text>
                </View>
                <Text style={[Typo.corps, { color: Couleurs.sarcelle }]}>›</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.ecran}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: 43.74,
          longitude: 3.58,
          latitudeDelta: 0.19,
          longitudeDelta: 0.14,
        }}
        showsCompass={false}
        showsScale={true}
        mapType="standard"
      >
        {ACTIVITES.map((activite) => {
          const col = couleursCategorie(activite.categorie);
          const estSelectionnee = activiteSelectionnee?.id === activite.id;
          const estVisible = filtre === 'toutes' || activite.categorie === filtre;
          const taille = activite.id === 'domaine' ? 52 : estSelectionnee ? 52 : 44;

          return (
            <Marker
              key={activite.id}
              coordinate={{ latitude: activite.lieu.lat, longitude: activite.lieu.lng }}
              onPress={() => handleMarqueurPress(activite)}
              opacity={estVisible ? 1 : 0.25}
            >
              <View
                style={[
                  styles.marqueur,
                  {
                    width: taille,
                    height: taille,
                    borderRadius: taille / 2,
                    backgroundColor: col.base,
                  },
                  estSelectionnee && styles.marqueurSelectionne,
                ]}
              >
                <Text style={{ fontSize: estSelectionnee ? 24 : 20 }}>{activite.emoji}</Text>
              </View>
            </Marker>
          );
        })}
      </MapView>

      {/* Overlay filtres */}
      <View style={[styles.overlayFiltres, { top: insets.top + Espace.lg }]}>
        <BlurView intensity={70} tint="light" style={styles.blurFiltres}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtresContenu}
          >
            {FILTRES_CARTE.map((f) => (
              <TouchableOpacity
                key={f.id}
                onPress={() => setFiltre(f.id)}
                style={[styles.piluleFiltre, filtre === f.id && styles.piluleFiltreActive]}
                accessibilityRole="button"
                accessibilityLabel={`Filtrer : ${f.label}`}
              >
                <Text
                  style={[
                    Typo.legende,
                    { color: filtre === f.id ? '#FFFFFF' : Couleurs.encreDouce },
                  ]}
                >
                  {f.emoji} {f.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </BlurView>

        <TouchableOpacity
          onPress={centrerDomaine}
          style={styles.boutonCentrer}
          accessibilityRole="button"
          accessibilityLabel="Centrer sur le domaine"
        >
          <BlurView intensity={70} tint="light" style={styles.blurBouton}>
            <Text style={[Typo.legende, { color: Couleurs.marine }]}>🏡 Domaine</Text>
          </BlurView>
        </TouchableOpacity>
      </View>

      {/* Bottom sheet simplifié */}
      {activiteSelectionnee && (
        <View style={[styles.bottomSheet, { paddingBottom: insets.bottom + Espace.lg }]}>
          <View style={styles.indicateur} />
          <View style={styles.contenuSheet}>
            <View style={styles.headerSheet}>
              <Text style={styles.emojiSheet}>{activiteSelectionnee.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[Typo.soustitre, { color: Couleurs.encre }]}>
                  {activiteSelectionnee.nom}
                </Text>
                <Text style={[Typo.legende, { color: Couleurs.attenué }]}>
                  📍 {activiteSelectionnee.distanceDomaine}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setActiviteSelectionnee(null)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={[Typo.corps, { color: Couleurs.attenué }]}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text
              style={[Typo.corps, { color: Couleurs.attenué, fontStyle: 'italic' }]}
              numberOfLines={2}
            >
              {activiteSelectionnee.accroche}
            </Text>

            <View style={styles.actionsSheet}>
              {activiteSelectionnee.telephone && (
                <TouchableOpacity
                  style={[styles.btnSheet, { backgroundColor: Couleurs.sarcelle }]}
                  onPress={() => {
                    const tel = activiteSelectionnee.telephone;
                    if (tel) require('../../utils/liens').appeler(tel);
                  }}
                >
                  <Text style={[Typo.corpsMoyen, { color: '#FFF' }]}>📞 Appeler</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.btnSheet, { borderWidth: 1, borderColor: Couleurs.sarcelle }]}
                onPress={() => router.push(`/activite/${activiteSelectionnee.id}`)}
              >
                <Text style={[Typo.corpsMoyen, { color: Couleurs.sarcelle }]}>
                  Détails complets →
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ecran: {
    flex: 1,
  },
  overlayFiltres: {
    position: 'absolute',
    left: Espace.lg,
    right: Espace.lg,
    gap: Espace.sm,
  },
  blurFiltres: {
    borderRadius: Rayon.lg,
    overflow: 'hidden',
  },
  filtresContenu: {
    paddingHorizontal: Espace.md,
    paddingVertical: Espace.sm,
    gap: Espace.sm,
  },
  piluleFiltre: {
    paddingHorizontal: Espace.md,
    paddingVertical: Espace.xs,
    borderRadius: Rayon.pilule,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  piluleFiltreActive: {
    backgroundColor: Couleurs.marine,
  },
  boutonCentrer: {
    alignSelf: 'flex-end',
    borderRadius: Rayon.pilule,
    overflow: 'hidden',
    ...Ombre.sm,
  },
  blurBouton: {
    paddingHorizontal: Espace.md,
    paddingVertical: Espace.sm,
  },
  marqueur: {
    alignItems: 'center',
    justifyContent: 'center',
    ...Ombre.sm,
  },
  marqueurSelectionne: {
    ...Ombre.lg,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Couleurs.surface,
    borderTopLeftRadius: Rayon.xl,
    borderTopRightRadius: Rayon.xl,
    ...Ombre.lg,
  },
  indicateur: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Couleurs.marine,
    alignSelf: 'center',
    marginTop: Espace.md,
    marginBottom: Espace.sm,
  },
  contenuSheet: {
    paddingHorizontal: Espace.lg,
    paddingBottom: Espace.lg,
    gap: Espace.sm,
  },
  headerSheet: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Espace.md,
  },
  emojiSheet: {
    fontSize: 32,
  },
  actionsSheet: {
    flexDirection: 'row',
    gap: Espace.sm,
    marginTop: Espace.sm,
  },
  btnSheet: {
    flex: 1,
    height: 44,
    borderRadius: Rayon.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerWeb: {
    paddingHorizontal: Espace.lg,
    paddingVertical: Espace.lg,
    gap: 2,
    backgroundColor: Couleurs.surface,
    borderBottomWidth: 1,
    borderBottomColor: Couleurs.bordureClaire,
  },
  // Fallback
  fallback: {
    flex: 1,
    backgroundColor: Couleurs.fond,
    alignItems: 'center',
    padding: Espace.lg,
    gap: Espace.lg,
  },
  fallbackEmoji: {
    fontSize: 64,
    marginTop: Espace.xxl,
  },
  listeActivitesCarte: {
    width: '100%',
    gap: Espace.sm,
  },
  ligneActiviteCarte: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Couleurs.surface,
    borderRadius: Rayon.md,
    borderLeftWidth: 4,
    padding: Espace.lg,
    gap: Espace.md,
    ...Ombre.sm,
  },
  emojiCarte: {
    fontSize: 24,
  },
  infosActiviteCarte: {
    flex: 1,
  },
});
