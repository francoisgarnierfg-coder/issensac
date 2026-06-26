import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export function useHeureJournee() {
  const { momentJournee, configMoment, initMomentJournee } = useAppStore();

  useEffect(() => {
    initMomentJournee();
  }, []);

  return { momentJournee, configMoment };
}
