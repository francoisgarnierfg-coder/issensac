import { Platform } from 'react-native';

export const Couleurs = {
  // Noyau
  marine: '#1C3557',
  sarcelle: '#0B8B82',
  sarcelleClaire: '#E3F5F4',
  or: '#C97A1A',
  orClair: '#FDF3E3',

  // Surfaces
  fond: '#F7F3EE',
  surface: '#FFFFFF',
  surfaceAlt: '#F0EDE8',

  // Texte
  encre: '#18181B',
  encreDouce: '#3F3F46',
  attenué: '#71717A',
  subtil: '#A1A1AA',

  // Séparateurs
  bordure: '#E4E0D8',
  bordureClaire: '#F0EDE8',

  // Système de catégories
  eau: { base: '#0A5C96', clair: '#EBF5FC', milieu: '#4A9CC8' },
  culture: { base: '#5B3FA0', clair: '#F2EEFF', milieu: '#9B7FD4' },
  nature: { base: '#2A6B42', clair: '#EAFAF1', milieu: '#5DAB7E' },
  domaine: { base: '#8B4A00', clair: '#FEF6EC', milieu: '#D4831A' },
  vin: { base: '#8B1A3C', clair: '#FDEEF3', milieu: '#C0607A' },

  // Statuts
  succes: '#16A34A',
  attention: '#D97706',
  danger: '#DC2626',
  info: '#2563EB',

  // Gradients heure du jour
  aube: ['#F5C89A', '#E8A87A'] as [string, string],
  midi: ['#1C3557', '#0B8B82'] as [string, string],
  apresmidi: ['#8B4A00', '#C97A1A'] as [string, string],
  heureDoree: ['#C97A1A', '#8B1A3C'] as [string, string],
  nuit: ['#0F1F35', '#1C3557'] as [string, string],

  // Mode sombre
  sombre: {
    fond: '#18181B',
    surface: '#27272A',
    bordure: '#3F3F46',
    encre: '#FAFAFA',
    attenué: '#A1A1AA',
  },
} as const;

export const Typo = {
  displaySerif: { fontFamily: 'DMSerifDisplay_400Regular' },
  titre: { fontFamily: 'DMSans_700Bold', fontSize: 20, lineHeight: 26 },
  soustitre: { fontFamily: 'DMSans_600SemiBold', fontSize: 16, lineHeight: 22 },
  corps: { fontFamily: 'DMSans_400Regular', fontSize: 14, lineHeight: 21 },
  corpsMoyen: { fontFamily: 'DMSans_500Medium', fontSize: 14, lineHeight: 21 },
  legende: { fontFamily: 'DMSans_400Regular', fontSize: 12, lineHeight: 17, color: '#71717A' },
  etiquette: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.6,
    textTransform: 'uppercase' as const,
  },
  micro: { fontFamily: 'DMSans_400Regular', fontSize: 10, lineHeight: 14, color: '#A1A1AA' },
} as const;

export const Espace = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
  max: 64,
} as const;

export const Rayon = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  pilule: 999,
} as const;

const _web = Platform.OS === 'web';
export const Ombre = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
    ...(_web ? { boxShadow: '0 1px 3px rgba(0,0,0,0.06)' } as object : {}),
  },
  md: {
    shadowColor: '#1C3557',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 4,
    ...(_web ? { boxShadow: '0 2px 8px rgba(28,53,87,0.10)' } as object : {}),
  },
  lg: {
    shadowColor: '#1C3557',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 8,
    ...(_web ? { boxShadow: '0 4px 16px rgba(28,53,87,0.14)' } as object : {}),
  },
};

export type Categorie = 'eau' | 'culture' | 'nature' | 'domaine' | 'vin';
export type MomentJournee = 'aube' | 'midi' | 'apresmidi' | 'heureDoree' | 'nuit';

export function couleursCategorie(cat: Categorie) {
  return Couleurs[cat];
}
