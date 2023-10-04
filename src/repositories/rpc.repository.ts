import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import rpc, { JSONRPCFilter, NftMetadata, Transaction } from '../services/rpc'
import { useIpfs } from 'hooks/use-ipfs'
import { RQ_KEY } from 'repositories'

const useGetCompleteTransactions = () => {
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

const useGetTransactions = (data: JSONRPCFilter<Transaction> & { address: `0x${string}` | undefined }) => {
  const { address, ...filter } = data

  return useQuery({
    queryKey: [RQ_KEY.GET_TXS],
    queryFn: async () => {
      console.log('inside get_txs')
      const txs = await rpc.getTransactions(filter)
      const collab: Record<string, { total: number; me: number }> = {}

      let promises = txs.map(async el => {
        if (!collab[el.meta_contract_id]) collab[el.meta_contract_id] = { total: 0, me: 0 }

        collab[el.meta_contract_id].total += 1

        if (el.public_key === address) {
          collab[el.meta_contract_id].me += 1

          const parsed = await parseString(el.data)
          return { ...el, data: parsed }
        }
      })

      let fulfilled = await Promise.all(promises)

      return fulfilled
        .filter(el => el !== undefined)
        .map(el => {
          return {
            ...el,
            total_collab: collab[el?.meta_contract_id as string].total,
            my_collab: collab[el?.meta_contract_id as string].me,
          }
        })
    },
    //enabled: Boolean(data.address),
  })
}

const usePublishTransaction = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Transaction) => {
      return await rpc.publish(data)
    },
    onSuccess: async () => {
      let timeout: NodeJS.Timeout
      timeout = setTimeout(async () => {
        await queryClient.invalidateQueries([RQ_KEY.GET_TXS])
        if (timeout) clearTimeout(timeout)
      }, 5000)
    },
  })
}

const useStoreBlob = () => {
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
