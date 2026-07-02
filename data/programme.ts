export type Humeur = 'aventure' | 'culture' | 'detente' | 'convivial';

export interface CreneauData {
  activiteId?: string;
  titre: string;
  sousTitre: string;
  estOptionnel: boolean;
  note?: string;
  boutonItineraire?: { lat: number; lng: number; nom: string };
}

export interface JourData {
  numero: number;
  date: string;
  theme: string;
  emoji: string;
  matin: CreneauData;
  apresmidi: CreneauData;
  soiree?: CreneauData;
  humeur: Humeur;
  reservationsRequises: string[];
}

export const PROGRAMME: JourData[] = [
  {
    numero: 1,
    date: 'Samedi 25 juillet 2026',
    theme: 'Arrivée & premières heures',
    emoji: '🏠',
    humeur: 'convivial',
    matin: {
      activiteId: 'domaine',
      titre: 'Piscine & plage Buèges',
      sousTitre: 'Installation, premiers plongeons, rivière Buèges à 5 min à pied',
      estOptionnel: false,
      note: 'Piscine 26–30°C. Zone 30 cm pour les tout-petits.',
    },
    apresmidi: {
      activiteId: 'domaine',
      titre: "Barbecue d'accueil + Tractotour",
      sousTitre: 'Pétanque, premiers échanges, balade en tracteur avec Louis Coulet dans le vignoble',
      estOptionnel: false,
      note: "Demander le Tractotour dès l'arrivée — gratuit et mémorable pour les enfants !",
    },
    reservationsRequises: [],
  },
  {
    numero: 2,
    date: 'Dimanche 26 juillet 2026',
    theme: 'Messe & gorges',
    emoji: '⛪',
    humeur: 'aventure',
    matin: {
      titre: 'Messe dominicale 10h30',
      sousTitre: 'Saints Pierre et Paul — Ganges (6 km)',
      estOptionnel: false,
      note: 'Retour vers 11h30. Matinée libre avant la messe : piscine ou rivière Buèges.',
      boutonItineraire: { lat: 43.934, lng: 3.703, nom: 'Église Saints Pierre et Paul — Ganges' },
    },
    apresmidi: {
      activiteId: 'canoe-gorges',
      titre: "Canoë Gorges de l'Hérault",
      sousTitre: 'Descente 4 km en eaux calmes, pique-nique sur les galets, petits rapides ludiques',
      estOptionnel: false,
      note: "Départ après-midi — appeler pour réserver un créneau 14h ou 15h. Chaussures d'eau + crème SPF50+ indispensables.",
    },
    reservationsRequises: ['canoe-gorges'],
  },
  {
    numero: 3,
    date: 'Lundi 27 juillet 2026',
    theme: 'Vertige & UNESCO',
    emoji: '🏔️',
    humeur: 'aventure',
    matin: {
      activiteId: 'cirque-navacelles',
      titre: 'Cirque de Navacelles',
      sousTitre: 'Belvédère UNESCO, navette gratuite dans le cirque, baignade rivière Vis',
      estOptionnel: false,
      note: 'Départ domaine à 8h30 — belvédère bondé dès 10h30.',
    },
    apresmidi: {
      activiteId: 'domaine',
      titre: 'Retour & piscine',
      sousTitre: 'Baignades libres, pétanque, récupération après la grande sortie',
      estOptionnel: false,
    },
    reservationsRequises: [],
  },
  {
    numero: 4,
    date: 'Mardi 28 juillet 2026',
    theme: 'Fraîcheur souterraine',
    emoji: '🕳️',
    humeur: 'culture',
    matin: {
      activiteId: 'grotte-demoiselles',
      titre: 'Grotte des Demoiselles',
      sousTitre: "Visite Balade des Légendes — 14°C constants, stalactites géantes, funiculaire",
      estOptionnel: false,
      note: 'PULL OBLIGATOIRE pour tous. 14°C dans la grotte = choc thermique garanti !',
    },
    apresmidi: {
      activiteId: 'domaine',
      titre: 'Piscine & détente',
      sousTitre: 'Baignades libres après la grande sortie souterraine — piscine ou rivière Buèges',
      estOptionnel: false,
    },
    reservationsRequises: ['grotte-demoiselles'],
  },
  {
    numero: 5,
    date: 'Mercredi 29 juillet 2026',
    theme: 'Écrevisses & détente',
    emoji: '🦞',
    humeur: 'detente',
    matin: {
      activiteId: 'peche-ecrevisses',
      titre: 'Pêche aux écrevisses avec Loulou',
      sousTitre: "Rivière Hérault — épuisettes, seaux, surprises garanties pour les enfants",
      estOptionnel: false,
      note: "Organisé par Loulou. Confirmer le point de RDV avec lui la veille. Chaussures d'eau obligatoires.",
    },
    apresmidi: {
      activiteId: 'domaine',
      titre: 'Piscine & rivière Buèges',
      sousTitre: 'Baignades libres, construction de barrages, ricochets, détente',
      estOptionnel: false,
      note: 'Journée volontairement légère — chacun choisit son rythme.',
    },
    reservationsRequises: [],
  },
  {
    numero: 6,
    date: 'Jeudi 30 juillet 2026',
    theme: 'Médiéval, forêt & vignes',
    emoji: '🏰',
    humeur: 'culture',
    matin: {
      activiteId: 'saint-guilhem',
      titre: 'Saint-Guilhem-le-Désert',
      sousTitre: 'Abbaye de Gellone, ruelles médiévales, Randoland enfants, glace Grand-Rue',
      estOptionnel: false,
      note: 'Arriver AVANT 9h30 — foule dès 10h30 en juillet !',
    },
    apresmidi: {
      activiteId: 'pont-du-diable',
      titre: 'Pont du Diable — Pique-nique & baignade',
      sousTitre: "À 2 km de Saint-Guilhem — pique-nique sur les berges de l'Hérault, baignade, ricochets",
      estOptionnel: false,
      note: 'Enchaîner directement depuis Saint-Guilhem — parking ombragé sur place.',
    },
    soiree: {
      activiteId: 'daumas-gassac',
      titre: 'Soirée adultes — Dégustation viticole',
      sousTitre: 'Mas Daumas Gassac ou Cal Demoura — voir si on prend un baby-sitter',
      estOptionnel: false,
      note: 'Choisir entre Daumas Gassac (dégustation gratuite) ou Cal Demoura (confidentiel, 10 pers. max).',
    },
    reservationsRequises: ['saint-guilhem', 'daumas-gassac', 'cal-demoura'],
  },
  {
    numero: 7,
    date: 'Vendredi 31 juillet 2026',
    theme: 'Dernier souffle & baignades',
    emoji: '🌊',
    humeur: 'detente',
    matin: {
      activiteId: 'pic-saint-loup',
      titre: 'Pic Saint-Loup — pour les courageux',
      sousTitre: 'Départ domaine avant 7h30 — panorama 360° sur les Cévennes et la Méditerranée',
      estOptionnel: true,
      note: 'Déconseillé avec tout-petits. Départ IMPÉRATIF avant 7h30 — 38°C au sommet dès 11h.',
    },
    apresmidi: {
      activiteId: 'domaine',
      titre: 'Dernières baignades & soirée conviviale',
      sousTitre: 'Buèges, piscine, apéro coucher de soleil sur la terrasse',
      estOptionnel: false,
    },
    reservationsRequises: [],
  },
  {
    numero: 8,
    date: 'Samedi 1er août 2026',
    theme: 'Brunch & au revoir',
    emoji: '👋',
    humeur: 'convivial',
    matin: {
      activiteId: 'domaine',
      titre: 'Dernier brunch & baignade',
      sousTitre: 'Brunch terrasse voûtée, derniers plongeons, construction de barrages de souvenir',
      estOptionnel: false,
    },
    apresmidi: {
      activiteId: 'domaine',
      titre: 'Départs progressifs',
      sousTitre: 'Au revoir jusqu\'à la prochaine — valises, derniers au revoir, route',
      estOptionnel: true,
    },
    reservationsRequises: [],
  },
];
