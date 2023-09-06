import { Link, useNavigate } from 'react-router-dom'
import AddButton from 'components/Buttons/AddButton'
import { useGetTransactions } from 'repositories/rpc.repository'
import { ColumnDef, getPaginationRowModel } from '@tanstack/react-table'
import { columns } from 'components/TanstackTable/columns/dashboard.column'
import { TanstackTable } from 'components/TanstackTable'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { ChevronDoubleDownIcon } from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const PageDashboard = () => {
  const navigate = useNavigate()

  const goToNewDataset = () => {
    navigate('/dashboard/new/data')
  }
  // let pk = '0x36F723043761F5D6E97319EC5FC0B9BF0FFA45973B7124FFC503C9527F3508EF' as `0x${string}`
  // let pk2 = '0x6B7E30392cA820C865dc5ea6EA0D2fD7f3343696' as `0x${string}`

  const { address } = useAccount()

  const { data: txs } = useGetTransactions({
    address,
    query: [
      { column: 'status', op: '=', query: '1' },
      { column: 'method', op: '=', query: 'metadata' },
      { column: 'public_key', op: '=', query: `${address}` },
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
      {/* <div className="overflow-x-auto rounded-lg border border-gray-200">
        <TanstackTable
          data={txs ?? []}
          columns={tableColumns}
          options={{ getPaginationRowModel: getPaginationRowModel() }}
        />
      </div>
       */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="table-fixed min-w-full divide-y-2 divide-gray-200 bg-blue-700 text-sm">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-semibold text-lg text-center">ID</th>
              <th className="whitespace-nowrap px-4 py-2 font-semibold text-lg text-center">Nos. of Collabs</th>
              <th className="whitespace-nowrap px-4 py-2 font-semibold text-lg text-center">My Collab</th>
              <th className="whitespace-nowrap px-4 py-2 font-semibold text-lg text-center">Explorer</th>
              <th className="whitespace-nowrap px-4 py-2 font-semibold text-lg"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {txs?.map((tx, index) => {
              return (
                <tr key={index}>
                  <td className="whitespace-nowrap px-4 py-2 text-white text-lg text-left">
                    <div>
                      <div className="font-semibold">{tx.token_id}</div>
                      <div className="text-sm flex items-center">
                        <span role="img" aria-label="Ethereum Logo" className="icon-32">
                          <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16">
                            <path
                              fill="#ffffff"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M11.3688 8.81011L7.68341 14L4 8.81011L7.68341 10.985L11.3688 8.81011ZM7.68341 2L11.3668 8.11174L7.68341 10.2887L4 8.11174L7.68341 2Z"
                            ></path>
                          </svg>
                        </span>
                        {tx.token_address}
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-white text-lg text-center">10</td>
                  <td className="whitespace-nowrap px-4 py-2 text-white text-lg text-center">1</td>
                  <td className="whitespace-nowrap px-4 py-2 text-white text-center">
                    <Link className="flex items-center justify-center w-full" to="/">
                      <span role="img" aria-label="Ethereum Logo" className="icon-32">
                        <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16">
                          <path
                            fill="#ffffff"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.3688 8.81011L7.68341 14L4 8.81011L7.68341 10.985L11.3688 8.81011ZM7.68341 2L11.3668 8.11174L7.68341 10.2887L4 8.11174L7.68341 2Z"
                          ></path>
                        </svg>
                      </span>
                      <span className="">{tx.data_key}</span>
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                          Options
                          <ChevronDoubleDownIcon
                            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="px-1 py-1 ">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                  } z-50 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                  Update
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PageDashboard
