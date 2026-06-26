import { create } from 'zustand';
import { MomentJournee } from '../constants/tokens';
import { calculerMoment, CONFIG_MOMENTS, ConfigMoment } from '../constants/heureJournee';
import { charger, sauvegarder } from '../utils/stockage';

interface AppState {
  jourSelectionne: number;
  favoris: Set<string>;
  categorieActive: string | null;
  momentJournee: MomentJournee;
  configMoment: ConfigMoment;
  etatChecklist: Record<string, boolean>;
  initialise: boolean;
}

interface AppActions {
  setJour: (jour: number) => void;
  toggleFavori: (id: string) => void;
  setCategorie: (cat: string | null) => void;
  toggleChecklist: (id: string) => void;
  initMomentJournee: () => void;
  initialiserDepuisStorage: () => Promise<void>;
}

type AppStore = AppState & AppActions;

export const useAppStore = create<AppStore>((set, get) => ({
  jourSelectionne: 1,
  favoris: new Set<string>(),
  categorieActive: null,
  momentJournee: 'midi',
  configMoment: CONFIG_MOMENTS['midi'],
  etatChecklist: {},
  initialise: false,

  setJour: (jour) => set({ jourSelectionne: jour }),

  toggleFavori: (id) => {
    const { favoris } = get();
    const nouveau = new Set(favoris);
    if (nouveau.has(id)) {
      nouveau.delete(id);
    } else {
      nouveau.add(id);
    }
    set({ favoris: nouveau });
    sauvegarder('favoris', Array.from(nouveau));
  },

  setCategorie: (cat) => set({ categorieActive: cat }),

  toggleChecklist: (id) => {
    const { etatChecklist } = get();
    const nouvelEtat = { ...etatChecklist, [id]: !etatChecklist[id] };
    set({ etatChecklist: nouvelEtat });
    sauvegarder('checklist', nouvelEtat);
  },

  initMomentJournee: () => {
    const heure = new Date().getHours();
    const moment = calculerMoment(heure);
    set({ momentJournee: moment, configMoment: CONFIG_MOMENTS[moment] });
  },

  initialiserDepuisStorage: async () => {
    const [favorisStockes, checklistStockee] = await Promise.all([
      charger<string[]>('favoris'),
      charger<Record<string, boolean>>('checklist'),
    ]);
    set({
      favoris: new Set(favorisStockes ?? []),
      etatChecklist: checklistStockee ?? {},
      initialise: true,
    });
  },
}));
