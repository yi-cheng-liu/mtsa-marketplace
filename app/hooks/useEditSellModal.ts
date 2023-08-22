import { create } from 'zustand'

interface EditSellModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useEditSellModal = create<EditSellModalStore>((set) => ({
  isOpen: false, // the Modal of Reserve is closed
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default useEditSellModal
