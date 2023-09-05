import { create } from 'zustand'
import { ModalSlice, createModalSlice } from './slices/modal.slice'
import { WalletSlice, createWalletSlice } from './slices/wallet.slice'
import { RPCSlice, createRPCSlice } from './slices/rpc.slice'

type ResetAllSlices = { resetAllSlices: () => void }
type BoundStoreType = ModalSlice & ResetAllSlices & WalletSlice & RPCSlice

export const resetters: (() => void)[] = []

export const useBoundStore = create<BoundStoreType>()((...a) => ({
  ...createModalSlice(...a),
  ...createWalletSlice(...a),
  ...createRPCSlice(...a),
  resetAllSlices: () => resetters.forEach(resetter => resetter()),
}))
