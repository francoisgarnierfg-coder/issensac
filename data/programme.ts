export type Humeur = 'aventure' | 'culture' | 'detente' | 'convivial';

export interface CreneauData {
  activiteId?: string;
  titre: string;
  sousTitre: string;
  estOptionnel: boolean;
  note?: string;
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
    date: 'Samedi 25 juillet',
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
      sousTitre: 'Pétanque, premiers échanges, balade en tracteur avec Louis dans le vignoble',
      estOptionnel: false,
      note: "Demander le Tractotour dès l'arrivée — gratuit et mémorable pour les enfants !",
    },
    reservationsRequises: [],
  },
  {
    numero: 2,
    date: 'Dimanche 26 juillet',
    theme: 'Gorges & liberté',
    emoji: '🛶',
    humeur: 'aventure',
    matin: {
      activiteId: 'canoe-gorges',
      titre: "Canoë Gorges de l'Hérault",
      sousTitre: 'Descente 4 km en eaux calmes, pique-nique sur les galets, petits rapides ludiques',
      estOptionnel: false,
      note: "Départ 9h30. Chaussures d'eau + crème SPF50+ indispensables. Bidon fourni.",
    },
    apresmidi: {
      activiteId: 'pont-du-diable',
      titre: 'Baignade Pont du Diable',
      sousTitre: "Retour à l'Hérault sous le pont roman du XIe siècle, 22–26°C",
      estOptionnel: false,
    },
    reservationsRequises: ['canoe-gorges'],
  },
  {
    numero: 3,
    date: 'Lundi 27 juillet',
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
      activiteId: 'pont-du-diable',
      titre: 'Baignade Pont du Diable',
      sousTitre: "Pique-nique sur les berges de l'Hérault, baignade, ricochets",
      estOptionnel: false,
    },
    reservationsRequises: ['grotte-demoiselles'],
  },
  {
    numero: 4,
    date: 'Mardi 28 juillet',
    theme: 'Détente & aventures',
    emoji: '☀️',
    humeur: 'detente',
    matin: {
      activiteId: 'domaine',
      titre: 'Plages privées & grasse matinée',
      sousTitre: 'Rivière Buèges, construction de barrages, épuisettes, ricochets',
      estOptionnel: false,
      note: 'Journée volontairement légère — chacun choisit son rythme.',
    },
    apresmidi: {
      activiteId: 'accrodiable',
      titre: 'Accrobranche Accrodiable',
      sousTitre: 'Dès 2 ans — pendant ce temps, tout-petits + piscine domaine',
      estOptionnel: true,
      note: 'Session 15h30–20h30 recommandée (moins chaud). Appeler le matin pour réserver.',
    },
    reservationsRequises: [],
  },
  {
    numero: 5,
    date: 'Mercredi 29 juillet',
    theme: 'Médiéval & dolce vita',
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
      activiteId: 'domaine',
      titre: 'Retour piscine & farniente',
      sousTitre: 'Pétanque inter-familles, ping-pong, terrasse ombragée',
      estOptionnel: false,
    },
    reservationsRequises: ['saint-guilhem'],
  },
  {
    numero: 6,
    date: 'Jeudi 30 juillet',
    theme: 'Panorama & vignes',
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
      titre: 'Retour & sieste',
      sousTitre: 'Piscine, récupération, préparation soirée adultes',
      estOptionnel: false,
    },
    soiree: {
      activiteId: 'daumas-gassac',
      titre: 'Soirée adultes — Dégustation viticole',
      sousTitre: 'Mas Daumas Gassac ou Cal Demoura — baby-sitters organisés via Louis',
      estOptionnel: false,
      note: 'Choisir entre Daumas Gassac (dégustation gratuite) ou Cal Demoura (confidentiel, 10 pers. max).',
    },
    reservationsRequises: ['daumas-gassac', 'cal-demoura'],
  },
  {
    numero: 7,
    date: 'Vendredi 31 juillet',
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
    date: 'Samedi 1er août',
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
