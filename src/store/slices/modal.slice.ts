import { StateCreator } from 'zustand'
import { resetters } from '..'

export type ModalState = {
  isOpen?: boolean
  isSkipped?: boolean
  message?: string
  isLoading?: boolean
}

export type Modal = {
  signUpMain: ModalState
  signUpRainbow: ModalState
  publishTxModal: ModalState
}

export interface ModalSlice {
  modal: Modal
  setModalState: (modal: Partial<Modal>) => void
  resetModal: () => void
}

const initialModal = {
  modal: {
    signUpMain: { isOpen: false },
    signUpRainbow: { isOpen: false, isLoading: false, message: '' },
    publishTxModal: { isOpen: false, isLoading: false, message: '' },
  },
}

export const createModalSlice: StateCreator<ModalSlice, [], [], ModalSlice> = set => {
  resetters.push(() => set(initialModal))

  return {
    ...initialModal,
    setModalState: (modal: Partial<Modal>) => {
      set(state => ({
        modal: Object.assign(state.modal, modal),
      }))
    },
    resetModal: () => {
      set({ ...initialModal })
    },
  }
}
