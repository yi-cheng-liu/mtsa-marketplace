import { create } from "zustand";

interface SellModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSellModal = create<SellModalStore>((set) => ({
  isOpen: false, // the Modal of Register is closed
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSellModal;
