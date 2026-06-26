import { Couleurs, MomentJournee } from './tokens';

export interface ConfigMoment {
  moment: MomentJournee;
  gradient: [string, string];
  couleurAccent: string;
  couleurTexteHeader: string;
  libelle: string;
}

export function calculerMoment(heure: number): MomentJournee {
  if (heure >= 6 && heure < 10) return 'aube';
  if (heure >= 10 && heure < 14) return 'midi';
  if (heure >= 14 && heure < 17) return 'apresmidi';
  if (heure >= 17 && heure < 21) return 'heureDoree';
  return 'nuit';
}

export const CONFIG_MOMENTS: Record<MomentJournee, ConfigMoment> = {
  aube: {
    moment: 'aube',
    gradient: Couleurs.aube,
    couleurAccent: Couleurs.or,
    couleurTexteHeader: Couleurs.encre,
    libelle: 'Aube',
  },
  midi: {
    moment: 'midi',
    gradient: Couleurs.midi,
    couleurAccent: Couleurs.sarcelle,
    couleurTexteHeader: '#FFFFFF',
    libelle: 'Midi',
  },
  apresmidi: {
    moment: 'apresmidi',
    gradient: Couleurs.apresmidi,
    couleurAccent: Couleurs.or,
    couleurTexteHeader: '#FFFFFF',
    libelle: 'Après-midi',
  },
  heureDoree: {
    moment: 'heureDoree',
    gradient: Couleurs.heureDoree,
    couleurAccent: '#C97A1A',
    couleurTexteHeader: '#FFFFFF',
    libelle: 'Heure dorée',
  },
  nuit: {
    moment: 'nuit',
    gradient: Couleurs.nuit,
    couleurAccent: Couleurs.sarcelle,
    couleurTexteHeader: '#FFFFFF',
    libelle: 'Nuit',
  },
};
