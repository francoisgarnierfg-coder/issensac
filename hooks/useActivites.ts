import { useMemo } from 'react';
import { ACTIVITES, ActiviteData, Categorie } from '../data/activites';
import { useAppStore } from '../store/useAppStore';

export function useActivites(filtre: string | null) {
  const favoris = useAppStore((s) => s.favoris);

  const activitesFiltrees = useMemo(() => {
    if (filtre === null || filtre === 'toutes') return ACTIVITES;
    if (filtre === 'favoris') return ACTIVITES.filter((a) => favoris.has(a.id));
    return ACTIVITES.filter((a) => a.categorie === filtre);
  }, [filtre, favoris]);

  const parCategorie = useMemo(() => {
    if (filtre !== null && filtre !== 'toutes') return null;
    const groupes: Record<string, ActiviteData[]> = {};
    ACTIVITES.forEach((a) => {
      if (!groupes[a.categorie]) groupes[a.categorie] = [];
      groupes[a.categorie].push(a);
    });
    return groupes;
  }, [filtre]);

  return { activitesFiltrees, parCategorie };
}

export function useActiviteParId(id: string): ActiviteData | undefined {
  return useMemo(() => ACTIVITES.find((a) => a.id === id), [id]);
}
