export type ListeType = 'reservations' | 'bagages';
export type NiveauUrgence = 'haute' | 'moyenne' | 'basse';

export interface ElementChecklist {
  id: string;
  liste: ListeType;
  label: string;
  tagJour?: string;
  urgence: NiveauUrgence;
  lien?: string;
  telephone?: string;
  emoji: string;
}

export const CHECKLIST: ElementChecklist[] = [
  // Réservations urgentes
  {
    id: 'resa-canoe',
    liste: 'reservations',
    label: 'Canoë Gorges de l\'Hérault',
    tagJour: 'J2',
    urgence: 'haute',
    lien: 'https://canoe-borg.fr',
    telephone: '04 67 57 44 05',
    emoji: '🛶',
  },
  {
    id: 'resa-grotte',
    liste: 'reservations',
    label: 'Grotte des Demoiselles',
    tagJour: 'J3',
    urgence: 'haute',
    lien: 'https://demoiselles.com',
    telephone: '04 67 73 70 02',
    emoji: '🕳️',
  },
  {
    id: 'resa-saint-guilhem',
    liste: 'reservations',
    label: 'Visite guidée Saint-Guilhem',
    tagJour: 'J5',
    urgence: 'moyenne',
    telephone: '04 67 57 58 83',
    emoji: '🏛️',
  },
  {
    id: 'resa-daumas',
    liste: 'reservations',
    label: 'Mas Daumas Gassac',
    tagJour: 'J6',
    urgence: 'moyenne',
    lien: 'https://daumas-gassac.com',
    telephone: '04 67 57 71 28',
    emoji: '🍷',
  },
  {
    id: 'resa-cal-demoura',
    liste: 'reservations',
    label: 'Mas Cal Demoura',
    tagJour: 'J6',
    urgence: 'moyenne',
    telephone: '04 67 44 70 82',
    emoji: '🍷',
  },
  {
    id: 'resa-babysitters',
    liste: 'reservations',
    label: 'Baby-sitters soirée adultes',
    tagJour: 'J6',
    urgence: 'moyenne',
    telephone: '04 67 73 10 57',
    emoji: '👶',
  },

  // Bagages
  {
    id: 'bag-chaussures-eau',
    liste: 'bagages',
    label: "Chaussures d'eau (tous)",
    urgence: 'haute',
    emoji: '👟',
  },
  {
    id: 'bag-creme',
    liste: 'bagages',
    label: 'Crème solaire SPF50+',
    urgence: 'haute',
    emoji: '🧴',
  },
  {
    id: 'bag-pull-grotte',
    liste: 'bagages',
    label: 'Pull pour la grotte (14°C !)',
    urgence: 'haute',
    emoji: '🧥',
  },
  {
    id: 'bag-gourdes',
    liste: 'bagages',
    label: 'Gourdes (1 par personne)',
    urgence: 'haute',
    emoji: '🧃',
  },
  {
    id: 'bag-chapeaux',
    liste: 'bagages',
    label: 'Chapeaux pour les enfants',
    urgence: 'haute',
    emoji: '👒',
  },
  {
    id: 'bag-sac-etanche',
    liste: 'bagages',
    label: 'Sac étanche (valeurs)',
    urgence: 'moyenne',
    emoji: '🎒',
  },
  {
    id: 'bag-brassards',
    liste: 'bagages',
    label: 'Brassards & bouées bébés',
    urgence: 'haute',
    emoji: '🤿',
  },
  {
    id: 'bag-epuisettes',
    liste: 'bagages',
    label: 'Épuisettes',
    urgence: 'basse',
    emoji: '🪣',
  },
  {
    id: 'bag-gilets-bain',
    liste: 'bagages',
    label: 'Gilets de bain enfants',
    urgence: 'haute',
    emoji: '🦺',
  },
  {
    id: 'bag-medicaments',
    liste: 'bagages',
    label: 'Médicaments habituels',
    urgence: 'haute',
    emoji: '💊',
  },
  {
    id: 'bag-serviettes',
    liste: 'bagages',
    label: 'Serviettes microfibre',
    urgence: 'moyenne',
    emoji: '🏊',
  },
  {
    id: 'bag-maillots',
    liste: 'bagages',
    label: 'Maillots de bain x2/personne',
    urgence: 'haute',
    emoji: '👙',
  },
  {
    id: 'bag-anti-moustiques',
    liste: 'bagages',
    label: 'Anti-moustiques naturel',
    urgence: 'basse',
    emoji: '🌿',
  },
  {
    id: 'bag-lampe-frontale',
    liste: 'bagages',
    label: 'Lampe frontale',
    urgence: 'basse',
    emoji: '🔦',
  },
];
