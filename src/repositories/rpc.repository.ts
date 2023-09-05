import { useQuery, useMutation } from '@tanstack/react-query'
import rpc, { JSONRPCFilter, NftMetadata, Transaction } from '../services/rpc'
import { useIpfs } from 'hooks/use-ipfs'

enum RQ_KEY {
  GET_COMPLETED_TXS = 'get_complete_transactions',
  GET_TXS = 'get_transactions',
  PUBLISH_TX = 'publish_transaction',
}

function useGetCompleteTransactions() {
  return useQuery({
    queryKey: [RQ_KEY.GET_COMPLETED_TXS],
    queryFn: async () => {
      return await rpc.getCompleteTransactions()
    },
    retry: false,
  })
}

export type DataTypeMetadata = {
  type: 'metadata'
  data: NftMetadata
}

export type DataTypeMedia = {
  type: 'image' | 'audio'
  data: string
}

export type DataTypeNone = {
  type: 'none'
  data: string
}

export async function parseString(input: string): Promise<DataTypeMetadata | DataTypeNone | DataTypeMedia> {
  try {
    const parsed = JSON.parse(input)
    if (typeof parsed === 'object') return { type: 'metadata', data: parsed }
  } catch (e) {}

  try {
    let response = await fetch(input)
    let contentType = response.headers.get('content-type')
    if (contentType?.startsWith('image/')) return { type: 'image', data: input }
    if (contentType?.startsWith('audio/')) return { type: 'audio', data: input }
  } catch (e) {}

  return { type: 'none', data: input }
}

function useGetTransactions(data: JSONRPCFilter<Transaction> & { address: `0x${string}` | undefined }) {
  const { address, ...filter } = data

  return useQuery({
    queryKey: [RQ_KEY.GET_TXS],
    queryFn: async () => {
      const txs = await rpc.getTransactions(filter)

      let promises = txs.map(async el => {
        const parsed = await parseString(el.data)
        return { ...el, data: parsed }
      })

      return await Promise.all(promises)
    },
    retry: false,
    enabled: Boolean(data.address),
  })
}

function usePublishTransaction() {
  return useMutation({
    mutationFn: async (data: Transaction) => {
      return await rpc.publish(data)
    },
  })
}

function useStoreBlob() {
  const { ipfs } = useIpfs()

  return useMutation({
    mutationFn: async (blob: Blob) => {
      const resp = await ipfs?.storeBlob(blob)
      const url = `${import.meta.env.VITE_IPFS_BEAT_STORAGE_URL}/${resp}`
      return url
    },
  })
}

export { useGetCompleteTransactions, useGetTransactions, usePublishTransaction, useStoreBlob }
