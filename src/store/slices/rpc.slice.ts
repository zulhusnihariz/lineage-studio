import { StateCreator } from 'zustand'
import { resetters } from '..'
import { Transaction } from 'services/rpc'

export type RPCStore = {
  publish: Partial<Transaction>
  stepperIndex: number
}

export interface RPCSlice {
  rpc: RPCStore
  setRPCState: (store: Partial<RPCStore>) => void
  resetRPCState: () => void
}

const initialRPCData = {
  rpc: {
    publish: {
      alias: '',
      chain_id: '',
      data: '',
      mcdata: JSON.stringify({ loose: 0 }),
      meta_contract_id: '',
      method: 'metadata',
      public_key: '',
      signature: '',
      token_address: '',
      token_id: '',
      version: '1',
    },
    stepperIndex: 0,
  },
}

export const createRPCSlice: StateCreator<RPCSlice, [], [], RPCSlice> = set => {
  resetters.push(() => set(initialRPCData))

  return {
    ...initialRPCData,
    setRPCState: (store: Partial<RPCStore>) => {
      const keys = Object.keys(store)

      for (let i = 0; i < keys.length; i++) {
        let key = keys[i] as keyof RPCStore

        set(state => ({
          rpc: {
            ...state.rpc,
            [key]: typeof store[key] === 'object' ? Object.assign(state.rpc[key], store[key]) : store[key],
          },
        }))
      }
    },
    resetRPCState: () => {
      set({ ...initialRPCData })
    },
  }
}
