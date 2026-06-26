export type Categorie = 'eau' | 'culture' | 'nature' | 'domaine' | 'vin';
export type Difficulte = 'facile' | 'modere' | 'difficile';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PhotoSource = any;

export interface ActiviteData {
  id: string;
  nom: string;
  emoji: string;
  photo?: PhotoSource;
  categorie: Categorie;
  accroche: string;
  description: string;
  lieu: {
    nom: string;
    adresse: string;
    lat: number;
    lng: number;
    distanceDomaine: string;
  };
  duree: { min: number; max: number; unite: 'min' | 'h' };
  ageMin: number;
  labelAge: string;
  difficulte: Difficulte;
  meilleureHeure: string;
  tarif: {
    adulte?: number;
    enfant?: number;
    ageEnfant?: string;
    groupe?: string;
    gratuit: boolean;
    note?: string;
  };
  reservation: {
    requise: boolean;
    urgente: boolean;
    url?: string;
    telephone?: string;
    email?: string;
  };
  conseils: string[];
  avertissements: string[];
  etiquettes: string[];
  joursProgram: number[];
  misEnAvant: boolean;
}

export const ACTIVITES: ActiviteData[] = [
  {
    id: 'canoe-gorges',
    nom: 'Canoë dans les Gorges',
    emoji: '🛶',
    photo: require('../assets/photos/canoe.jpg'),
    categorie: 'eau',
    accroche: 'Quatre kilomètres de bleu entre les falaises',
    description:
      "La descente en canoë des Gorges de l'Hérault est le moment fort de la semaine. Le parcours familial de 4 km s'effectue sur des eaux calmes entrecoupées de petits rapides ludiques. Des plages de galets blancs jalonnent le parcours — autant d'occasions de baignade et de pique-nique improvisé.",
    lieu: {
      nom: "Gorges de l'Hérault",
      adresse: 'Saint-Guilhem-le-Désert ou Aniane, 34150',
      lat: 43.729,
      lng: 3.553,
      distanceDomaine: '25 min',
    },
    duree: { min: 90, max: 120, unite: 'min' },
    ageMin: 3,
    labelAge: 'Dès 3 ans',
    difficulte: 'facile',
    meilleureHeure: 'Départ 9h–9h30 pour la fraîcheur',
    tarif: {
      adulte: 20,
      enfant: 12,
      ageEnfant: '4–12 ans',
      groupe: '-20% dès 20 pers.',
      gratuit: false,
      note: 'Moins de 3 ans gratuit. Groupe 10+ : tarif préférentiel.',
    },
    reservation: {
      requise: true,
      urgente: true,
      url: 'https://canoe-borg.fr',
      telephone: '04 67 57 44 05',
      email: 'contact@canoe-borg.fr',
    },
    conseils: [
      'Réserver pour 20 pers. minimum 2–3 semaines avant en août',
      'Chaussures d\'eau + crème SPF50+ waterproof indispensables',
      'Combo idéal : canoë matin + baignade Pont du Diable l\'après-midi',
    ],
    avertissements: [
      'Préciser le nombre exact de tout-petits pour adapter les embarcations',
      'Budget estimé 300–390 € total — négocier le tarif groupe par téléphone',
    ],
    etiquettes: ['Réservation urgente', 'Groupe', 'Demi-journée'],
    joursProgram: [2],
    misEnAvant: true,
  },
  {
    id: 'grotte-demoiselles',
    nom: 'Grotte des Demoiselles',
    emoji: '🕳️',
    photo: require('../assets/photos/grottes.jpg'),
    categorie: 'culture',
    accroche: '14°C de fraîcheur dans les entrailles du Causse',
    description:
      "Une cathédrale souterraine aux proportions vertigineuses — l'une des plus grandes salles souterraines de France. Stalactites géantes, formes fantastiques et funiculaire historique font de cette visite un souvenir inoubliable. À 14°C constants, c'est aussi le refuge parfait lors des journées de canicule.",
    lieu: {
      nom: 'Grotte des Demoiselles',
      adresse: 'Saint-Bauzille-de-Putois, 34190',
      lat: 43.777,
      lng: 3.708,
      distanceDomaine: '30 min',
    },
    duree: { min: 50, max: 90, unite: 'min' },
    ageMin: 4,
    labelAge: 'Dès 4 ans',
    difficulte: 'facile',
    meilleureHeure: 'Le matin — fraîcheur garantie quelle que soit la météo',
    tarif: {
      adulte: 16,
      enfant: 12,
      ageEnfant: '4–12 ans',
      gratuit: false,
      note: 'Moins de 4 ans gratuit. Famille 2A+2E : 52 €.',
    },
    reservation: {
      requise: true,
      urgente: true,
      url: 'https://demoiselles.com',
      telephone: '04 67 73 70 02',
    },
    conseils: [
      'Préférer la "Balade des Légendes" (1h30) : guide + mise en scène pour les enfants',
      'Pull ou gilet OBLIGATOIRE pour tous — 14°C contre 35°C dehors',
      'Combo J3 : grotte le matin + Pont du Diable l\'après-midi, 15 min de route',
    ],
    avertissements: [
      'Choc thermique garanti à la sortie — prévenir les jeunes enfants',
      'Annulation gratuite 24h avant sur demoiselles.com',
    ],
    etiquettes: ['Pull obligatoire', '14°C', 'Funiculaire'],
    joursProgram: [3],
    misEnAvant: true,
  },
  {
    id: 'saint-guilhem',
    nom: 'Saint-Guilhem-le-Désert',
    emoji: '🏛️',
    photo: require('../assets/photos/saint-guilhem.jpg'),
    categorie: 'culture',
    accroche: 'Le village médiéval que les enfants croient sorti d\'un livre',
    description:
      "Niché au creux des Gorges de l'Hérault, Saint-Guilhem-le-Désert est un village médiéval d'exception. Son abbaye de Gellone, fondée au VIIIe siècle par Guillaume d'Orange, compagnon de Charlemagne, figure sur la liste du patrimoine mondial de l'UNESCO. Ses ruelles en pierre et ses fontaines constituent un décor de conte que les enfants adorent.",
    lieu: {
      nom: 'Saint-Guilhem-le-Désert',
      adresse: 'Saint-Guilhem-le-Désert, 34150',
      lat: 43.730,
      lng: 3.554,
      distanceDomaine: '20 min',
    },
    duree: { min: 90, max: 180, unite: 'min' },
    ageMin: 4,
    labelAge: 'Dès 4 ans',
    difficulte: 'facile',
    meilleureHeure: 'Arriver AVANT 9h30 — bondé dès 10h30 en août',
    tarif: {
      adulte: 9,
      gratuit: false,
      note: 'Village et abbaye gratuits. Visite guidée 9 €/adulte. Gratuit -10 ans.',
    },
    reservation: {
      requise: true,
      urgente: false,
      telephone: '04 67 57 58 83',
      email: 'oti@saintguilhem-valleeherault.fr',
    },
    conseils: [
      'Arriver avant 9h30 — la magie disparaît avec la foule',
      'App Randoland (gratuite, iOS & Android) : jeux de piste pour 6–10 ans',
      'Glace artisanale sur la Grand-Rue = récompense méritée en fin de visite',
    ],
    avertissements: [
      'Parking CRITIQUE en août : navettes depuis Gignac/Aniane conseillées',
      'Télécharger Randoland avant le départ — pas de réseau dans le village',
    ],
    etiquettes: ['UNESCO', 'Parking difficile', 'Randoland'],
    joursProgram: [5],
    misEnAvant: true,
  },
  {
    id: 'pont-du-diable',
    nom: 'Pont du Diable — Baignade',
    emoji: '🏊',
    photo: require('../assets/photos/pont-du-diable.jpg'),
    categorie: 'eau',
    accroche: "L'Hérault cristallin sous un pont vieux de mille ans",
    description:
      "Construit en 1028, le Pont du Diable est le premier pont roman classé Monument Historique du Languedoc. Sous ses arches millénaires, les eaux cristallines de l'Hérault offrent un spot de baignade naturelle parmi les plus appréciés de la région. Accès libre, gratuit, pas de réservation — juste la nature et l'eau fraîche.",
    lieu: {
      nom: 'Pont du Diable',
      adresse: 'Aniane, 34150',
      lat: 43.736,
      lng: 3.556,
      distanceDomaine: '20 min',
    },
    duree: { min: 60, max: 180, unite: 'min' },
    ageMin: 0,
    labelAge: 'Tous âges',
    difficulte: 'facile',
    meilleureHeure: "L'après-midi — après une activité matinale",
    tarif: {
      gratuit: true,
      note: 'Accès totalement gratuit. Petit parking payant en été.',
    },
    reservation: {
      requise: false,
      urgente: false,
    },
    conseils: [
      'Pelouses ombragées sur les berges — parfait pour pique-niquer',
      'Chaussures d\'eau recommandées — galets glissants',
      'Combo J2 : canoë matin + baignade ici l\'après-midi',
    ],
    avertissements: [
      'Courant pouvant être fort après orages — ne jamais laisser un enfant seul',
      'Galets mouillés très glissants — chaussures d\'eau indispensables',
    ],
    etiquettes: ['Gratuit', 'Monument historique', 'Pique-nique'],
    joursProgram: [2, 3],
    misEnAvant: false,
  },
  {
    id: 'cirque-navacelles',
    nom: 'Cirque de Navacelles',
    emoji: '🏔️',
    photo: require('../assets/photos/cirque.jpg'),
    categorie: 'nature',
    accroche: '300 mètres de vertige classé UNESCO',
    description:
      "Le Cirque de Navacelles est l'un des panoramas les plus spectaculaires du Massif Central. Formé par un méandre recoupé de la rivière Vis, ce cirque naturel plonge 300 mètres sous les belvédères — une vue à couper le souffle, classée Grand Site de France et intégrée dans le périmètre UNESCO Causses et Cévennes.",
    lieu: {
      nom: 'Cirque de Navacelles',
      adresse: 'Navacelles, 34520',
      lat: 43.857,
      lng: 3.521,
      distanceDomaine: '45–50 min',
    },
    duree: { min: 180, max: 240, unite: 'min' },
    ageMin: 0,
    labelAge: 'Tous âges',
    difficulte: 'facile',
    meilleureHeure: 'Départ domaine à 8h30 — belvédère bondé dès 10h30',
    tarif: {
      gratuit: true,
      note: 'Accès libre. Navette gratuite mi-juillet à mi-août.',
    },
    reservation: {
      requise: false,
      urgente: false,
      url: 'https://cirquenavacelles.com',
    },
    conseils: [
      'Navette gratuite depuis belvédère Baume Auriol — départs toutes les 30 min',
      'Prévoir 3h sur place : belvédère + navette + village + baignade Vis',
      'Combo J6 : Navacelles matin + soirée adultes dégustation viticole',
    ],
    avertissements: [
      'Route sinueuse — prévoir du temps et des estomacs solides',
      'Enfants épuisés après la journée — parfait avant la soirée adultes !',
    ],
    etiquettes: ['UNESCO', 'Grand Site de France', 'Navette gratuite'],
    joursProgram: [6],
    misEnAvant: true,
  },
  {
    id: 'pic-saint-loup',
    nom: 'Pic Saint-Loup',
    emoji: '⛰️',
    photo: require('../assets/photos/pic-saint-loup.jpg'),
    categorie: 'nature',
    accroche: 'Le sommet qu\'on voit de partout — et depuis lequel on voit tout',
    description:
      "La sentinelle de la région montpelliéraine — 658 mètres de calcaire blanc qui dominent les garrigues. La randonnée jusqu'au sommet offre un panorama à 360° sur les Cévennes, les Causses, la Camargue et la Méditerranée. Expérience inoubliable, à réserver aux lève-tôt ou aux grands enfants.",
    lieu: {
      nom: 'Pic Saint-Loup',
      adresse: 'Saint-Mathieu-de-Tréviers, 34270',
      lat: 43.789,
      lng: 3.774,
      distanceDomaine: '35 min',
    },
    duree: { min: 150, max: 180, unite: 'min' },
    ageMin: 8,
    labelAge: 'Dès 8 ans (été)',
    difficulte: 'modere',
    meilleureHeure: 'DÉPART AVANT 7h30 — 38°C au sommet dès 11h',
    tarif: {
      gratuit: true,
      note: 'Accès libre. Sentier GR600 balisé.',
    },
    reservation: {
      requise: false,
      urgente: false,
    },
    conseils: [
      'Alternative facile : belvédère de Cazevieille, 10 min de marche, tous âges',
      '1,5 L d\'eau par personne minimum — aucun point d\'eau sur le parcours',
      'Départ avant 7h30 impératif — chaleur extrême dès 10h',
    ],
    avertissements: [
      'Déconseillé aux moins de 7–8 ans en plein août — chaleur dangereuse',
      'À éviter totalement entre 10h et 17h en été',
    ],
    etiquettes: ['Départ 7h30', 'Panorama 360°', 'Optionnel J7'],
    joursProgram: [7],
    misEnAvant: false,
  },
  {
    id: 'accrodiable',
    nom: 'Accrobranche Accrodiable',
    emoji: '🌳',
    photo: require('../assets/photos/accrobranche.jpg'),
    categorie: 'nature',
    accroche: 'Des arbres aux étoiles, dès 2 ans',
    description:
      "À seulement 15 minutes du domaine, Accrodiable Aventure propose des parcours adaptés à tous les âges avec une offre spécifique dès 2 ans. Pendant que les grands s'aventurent en hauteur, les tout-petits restent en sécurité à la piscine — une organisation parfaite pour une après-midi en demi-groupe.",
    lieu: {
      nom: 'Accrodiable Aventure',
      adresse: 'Aniane, 34150',
      lat: 43.681,
      lng: 3.585,
      distanceDomaine: '15 min',
    },
    duree: { min: 90, max: 120, unite: 'min' },
    ageMin: 2,
    labelAge: 'Dès 2 ans',
    difficulte: 'facile',
    meilleureHeure: 'Session 15h30–20h30 — moins chaud qu\'en matinée',
    tarif: {
      adulte: 18,
      enfant: 12,
      ageEnfant: '4–12 ans',
      gratuit: false,
      note: 'Enfants 2–3 ans : 8 €. Harnais spéciaux pour les tout-petits.',
    },
    reservation: {
      requise: false,
      urgente: false,
      url: 'https://accrodiable-aventure.com',
      telephone: '07 69 67 68 97',
      email: 'accrodiableaventure@gmail.com',
    },
    conseils: [
      'Préférer la session du soir 15h30–20h30 — beaucoup moins chaud',
      'Appeler le matin pour réserver le soir — rarement complet en semaine',
      'Pendant l\'accrobranche : autres adultes et tout-petits restent à la piscine',
    ],
    avertissements: [
      'Personnel formé à l\'accueil des très jeunes enfants — harnais adaptés',
    ],
    etiquettes: ['Dès 2 ans', 'Optionnel', '15 min'],
    joursProgram: [4],
    misEnAvant: false,
  },
  {
    id: 'daumas-gassac',
    nom: 'Mas Daumas Gassac',
    emoji: '🍷',
    photo: 'https://picsum.photos/seed/vineyard-harvest-rows/800/400',
    categorie: 'vin',
    accroche: 'Le Lafite languedocien — et la dégustation est gratuite',
    description:
      "Surnommé le 'Château Lafite languedocien' par Gault & Millau, le Mas de Daumas Gassac est la référence absolue du Languedoc. Fondé en 1972 par Aimé et Véronique Guibert, 50 hectares cultivés en agriculture organique, vendanges entièrement manuelles, exporté dans 61 pays — une visite ici, c'est toucher à l'histoire du vin.",
    lieu: {
      nom: 'Mas Daumas Gassac',
      adresse: 'Haute Vallée du Gassac, 34150 Aniane',
      lat: 43.676,
      lng: 3.588,
      distanceDomaine: '25 min',
    },
    duree: { min: 60, max: 120, unite: 'min' },
    ageMin: 18,
    labelAge: 'Adultes',
    difficulte: 'facile',
    meilleureHeure: 'Lun–Sam 9h30–18h30 — fermé le dimanche',
    tarif: {
      gratuit: true,
      note: 'Dégustation GRATUITE au caveau. Visite chais guidée sur réservation.',
    },
    reservation: {
      requise: false,
      urgente: false,
      url: 'https://daumas-gassac.com',
      telephone: '04 67 57 71 28',
      email: 'contact@daumas-gassac.com',
    },
    conseils: [
      'Commander le Grand Rouge (Cabernet Sauvignon, garde 5–15 ans)',
      'Le blanc Viognier/Chardonnay est une rareté — quelques milliers de bouteilles/an',
      'Réserver une visite guidée des chais pour 10 adultes — appeler à l\'avance',
    ],
    avertissements: [
      'Très fréquenté en août — dégustation libre reste accessible sans réservation',
    ],
    etiquettes: ['Dégustation gratuite', 'Grand cru', 'Baby-sitter requis'],
    joursProgram: [6],
    misEnAvant: false,
  },
  {
    id: 'cal-demoura',
    nom: 'Mas Cal Demoura',
    emoji: '🍷',
    photo: 'https://picsum.photos/seed/wine-cellar-barrels/800/400',
    categorie: 'vin',
    accroche: 'Dix personnes maximum. Isabelle et Vincent, en personne.',
    description:
      "Cal Demoura — 'il faut rester' en occitan — est l'un de ces domaines confidentiels qui font la gloire silencieuse du Languedoc. Isabelle et Vincent Goumard y produisent des vins d'une précision rarissime, régulièrement notés 96–97/100. Ils reçoivent en petit groupe, directement chez eux — une expérience humaine hors du commun.",
    lieu: {
      nom: 'Mas Cal Demoura',
      adresse: '125 Route de Saint-André, 34725 Jonquières',
      lat: 43.675,
      lng: 3.479,
      distanceDomaine: '20 min',
    },
    duree: { min: 90, max: 120, unite: 'min' },
    ageMin: 18,
    labelAge: 'Adultes',
    difficulte: 'facile',
    meilleureHeure: 'Lun–Sam 10h–12h et 14h–17h — RDV obligatoire',
    tarif: {
      gratuit: false,
      note: 'Dégustation payante. 97/100 Bettane & Desseauve.',
    },
    reservation: {
      requise: true,
      urgente: true,
      telephone: '04 67 44 70 82',
    },
    conseils: [
      'Appeler Vincent directement : 06 85 09 38 74 — il vous recevra en personne',
      '10 personnes maximum — parfait pour nos 10 adultes',
      'Choisir entre Cal Demoura (intime) et Daumas Gassac (prestige) selon l\'envie',
    ],
    avertissements: [
      'Vendanges des blancs peuvent débuter mi-août — appeler tôt !',
      'Disponibilité très réduite en août — réserver au plus tôt',
    ],
    etiquettes: ['Confidentiel', '10 pers. max', 'Baby-sitter requis'],
    joursProgram: [6],
    misEnAvant: false,
  },
  {
    id: 'domaine',
    nom: 'Les Hauts d\'Issensac',
    emoji: '🏡',
    photo: 'https://picsum.photos/seed/provence-pool-valley/800/400',
    categorie: 'domaine',
    accroche: 'La piscine qui surplombe la vallée. Le reste peut attendre.',
    description:
      "Le domaine des Hauts d'Issensac est en lui-même une destination complète. Piscine panoramique sécurisée, accès privé aux rivières Buèges et Hérault à 5 minutes à pied, vignoble en agriculture biologique, terrasses, pétanque, ping-pong — prévoyez au minimum une journée entière sur place, sans culpabilité.",
    lieu: {
      nom: "Les Hauts d'Issensac",
      adresse: 'Causse-de-la-Selle, Hérault',
      lat: 43.721,
      lng: 3.622,
      distanceDomaine: 'Sur place',
    },
    duree: { min: 60, max: 480, unite: 'min' },
    ageMin: 0,
    labelAge: 'Tous âges',
    difficulte: 'facile',
    meilleureHeure: 'Toute la journée — piscine 26–30°C',
    tarif: {
      gratuit: true,
      note: 'Inclus dans la location. Piscine + plages privées + activités domaine.',
    },
    reservation: {
      requise: false,
      urgente: false,
      telephone: '04 67 73 10 57',
    },
    conseils: [
      'Tractotour avec Louis — gratuit, mémorable, demander dès l\'arrivée 🚜',
      'Buèges 18–22°C : idéale pour les tout-petits — calme et peu profonde',
      'Ciel étoilé exceptionnel depuis la terrasse — pollution lumineuse quasi-nulle',
    ],
    avertissements: [
      'Piscine profondeur 1m20–1m50 — surveillance adulte obligatoire',
      'Surveiller le courant de l\'Hérault après orages',
    ],
    etiquettes: ['Inclus', 'Piscine panoramique', 'Plages privées'],
    joursProgram: [1, 2, 3, 4, 5, 6, 7],
    misEnAvant: true,
  },
];
