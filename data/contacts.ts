export type GroupeContact =
  | 'urgences'
  | 'domaine'
  | 'activites'
  | 'vins'
  | 'sante';

export interface ContactData {
  id: string;
  nom: string;
  groupe: GroupeContact;
  telephone?: string;
  email?: string;
  siteWeb?: string;
  icone: string;
  estUrgent: boolean;
  note?: string;
}

export const CONTACTS: ContactData[] = [
  // Urgences
  {
    id: 'samu',
    nom: 'SAMU',
    groupe: 'urgences',
    telephone: '15',
    icone: '🚑',
    estUrgent: true,
    note: 'Urgences médicales',
  },
  {
    id: 'pompiers',
    nom: 'Pompiers',
    groupe: 'urgences',
    telephone: '18',
    icone: '🚒',
    estUrgent: true,
    note: 'Incendie & secours',
  },
  {
    id: 'gendarmerie',
    nom: 'Gendarmerie',
    groupe: 'urgences',
    telephone: '17',
    icone: '👮',
    estUrgent: true,
    note: 'Causse-de-la-Selle',
  },
  {
    id: 'urgences-eu',
    nom: 'Urgences européennes',
    groupe: 'urgences',
    telephone: '112',
    icone: '🆘',
    estUrgent: true,
    note: 'Depuis mobile, fonctionne partout',
  },

  // Domaine
  {
    id: 'louis',
    nom: "Louis — Les Hauts d'Issensac",
    groupe: 'domaine',
    telephone: '04 67 73 10 57',
    email: 'o.issensac@gmail.com',
    siteWeb: 'https://hauts-issensac.com',
    icone: '🏡',
    estUrgent: false,
    note: 'Contact principal. Tractotour à demander dès l\'arrivée !',
  },

  // Activités
  {
    id: 'ot-saint-guilhem',
    nom: 'Office de Tourisme Saint-Guilhem',
    groupe: 'activites',
    telephone: '04 67 57 58 83',
    email: 'oti@saintguilhem-valleeherault.fr',
    icone: '🏛️',
    estUrgent: false,
    note: 'Visite guidée 9€ adulte, gratuit -10 ans',
  },
  {
    id: 'grotte-dem',
    nom: 'Grotte des Demoiselles',
    groupe: 'activites',
    telephone: '04 67 73 70 02',
    siteWeb: 'https://demoiselles.com',
    icone: '🕳️',
    estUrgent: false,
    note: 'Ouv. 9h–18h. Visite Légendes : 1h30, dès 4 ans.',
  },
  {
    id: 'canoe-borg',
    nom: 'Canoë Borg',
    groupe: 'activites',
    telephone: '04 67 57 44 05',
    siteWeb: 'https://canoe-borg.fr',
    icone: '🛶',
    estUrgent: false,
    note: 'Départ 9h30. Groupe 20+ : -20%.',
  },
  {
    id: 'accrodiable',
    nom: 'Accrodiable Aventure',
    groupe: 'activites',
    telephone: '07 69 67 68 97',
    siteWeb: 'https://accrodiable-aventure.com',
    icone: '🌳',
    estUrgent: false,
    note: 'Dès 2 ans. Août : 9h30–13h30 et 15h30–20h30.',
  },

  // Vins
  {
    id: 'daumas-gassac',
    nom: 'Mas Daumas Gassac',
    groupe: 'vins',
    telephone: '04 67 57 71 28',
    email: 'contact@daumas-gassac.com',
    siteWeb: 'https://daumas-gassac.com',
    icone: '🍷',
    estUrgent: false,
    note: 'Dégustation GRATUITE. Lun–Sam 9h30–18h30. Visite chais sur RDV.',
  },
  {
    id: 'cal-demoura',
    nom: 'Mas Cal Demoura — Vincent',
    groupe: 'vins',
    telephone: '04 67 44 70 82',
    siteWeb: 'https://caldemoura.com',
    icone: '🍷',
    estUrgent: false,
    note: 'Confidentiel, 10 pers. max. Vincent : 06 85 09 38 74. Réserver tôt !',
  },

  // Santé
  {
    id: 'chu-montpellier',
    nom: 'CHU Montpellier',
    groupe: 'sante',
    telephone: '04 67 33 67 33',
    siteWeb: 'https://chu-montpellier.fr',
    icone: '🏥',
    estUrgent: false,
    note: '~40 min du gîte',
  },
  {
    id: 'pharmacie-gignac',
    nom: 'Pharmacie Gignac',
    groupe: 'sante',
    telephone: '04 67 57 50 24',
    icone: '💊',
    estUrgent: false,
    note: 'Gignac ~20 min. Ouv. lun–sam.',
  },
];

export const LABELS_GROUPES: Record<GroupeContact, string> = {
  urgences: 'Urgences',
  domaine: 'Le Domaine',
  activites: 'Activités',
  vins: 'Domaines viticoles',
  sante: 'Santé',
};
