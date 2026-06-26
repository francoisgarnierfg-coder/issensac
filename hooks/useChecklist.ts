import { useMemo } from 'react';
import { CHECKLIST, ListeType } from '../data/checklist';
import { useAppStore } from '../store/useAppStore';

export function useChecklist(liste: ListeType) {
  const etatChecklist = useAppStore((s) => s.etatChecklist);
  const toggleChecklist = useAppStore((s) => s.toggleChecklist);

  const elements = useMemo(
    () => CHECKLIST.filter((e) => e.liste === liste),
    [liste]
  );

  const nombreCoches = useMemo(
    () => elements.filter((e) => etatChecklist[e.id]).length,
    [elements, etatChecklist]
  );

  const toutCoche = nombreCoches === elements.length;

  return { elements, nombreCoches, total: elements.length, toutCoche, toggle: toggleChecklist };
}
