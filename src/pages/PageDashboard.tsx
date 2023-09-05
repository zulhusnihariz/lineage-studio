import { useNavigate } from 'react-router-dom'
import AddButton from 'components/Buttons/AddButton'
import { useGetTransactions } from 'repositories/rpc.repository'
import { ColumnDef, getPaginationRowModel } from '@tanstack/react-table'
import { columns } from 'components/TanstackTable/columns/dashboard.column'
import { TanstackTable } from 'components/TanstackTable'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'

const PageDashboard = () => {
  const navigate = useNavigate()

  const goToNewDataset = () => {
    navigate('/dashboard/new/data')
  }
  // let pk = '0x36F723043761F5D6E97319EC5FC0B9BF0FFA45973B7124FFC503C9527F3508EF' as `0x${string}`
  // let pk2 = '0x6B7E30392cA820C865dc5ea6EA0D2fD7f3343696' as `0x${string}`

  let { address } = useAccount()

  const { data: txs } = useGetTransactions({
    address,
    query: [
      { column: 'public_key', op: '=', query: address as string },
      { column: 'status', op: '=', query: '1' },
      { column: 'method', op: '=', query: 'metadata' },
    ],
    ordering: [
      {
        column: 'timestamp',
        sort: 'desc',
      },
    ],
    from: 0,
    to: 0,
  })

  const tableColumns = useMemo<ColumnDef<any>[]>(() => columns, [])

  return (
    <div className="container mx-auto">
      <div className="py-8">
        <AddButton
          onClick={() => {
            goToNewDataset()
          }}
          name="Dataset"
          classNames={''}
        />
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <TanstackTable
          data={txs ?? []}
          columns={tableColumns}
          options={{ getPaginationRowModel: getPaginationRowModel() }}
        />
      </div>
    </div>
  )
}

export default PageDashboard
