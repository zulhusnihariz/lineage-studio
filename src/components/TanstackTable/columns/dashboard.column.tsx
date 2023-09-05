import { ColumnDef } from '@tanstack/react-table'
import { DataTypeMedia, DataTypeMetadata, DataTypeNone } from 'repositories/rpc.repository'
import { Transaction } from 'services/rpc'

const EXPLORER_URL = import.meta.env.VITE_LINEAGE_EXPLORER_URL

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'data',
    header: () => <p>Data</p>,
    cell: ({ row }) => {
      const parsed: DataTypeMetadata | DataTypeMedia | DataTypeNone = row.getValue('data')

      if (!parsed) return ''

      switch (parsed.type) {
        case 'metadata':
          if (parsed.data?.image?.startsWith('ipfs://')) {
            parsed.data.image = parsed.data.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
          }

          return (
            <section className="flex flex-col items-center justify-center">
              <img className="w-[80px] h-[80px] object-contain" alt={parsed.data.description} src={parsed.data.image} />
              <p>{parsed.data.name}</p>
            </section>
          )
        case 'image':
          return (
            <section className="flex flex-col items-center justify-center">
              <img className="w-[80px] h-[80px] object-contain" alt={''} src={parsed.data} />
            </section>
          )
        case 'audio':
          return (
            <span
              className="text-left cursor-pointer"
              onClick={() => {
                window.open(`${parsed?.data}`)
              }}
            >
              {parsed?.data}
            </span>
          )

        default:
          return <p>-</p>
      }
    },
    maxSize: 50,
    size: 50,
    minSize: 50,
  },
  {
    accessorKey: 'token_id',
    header: () => 'Token ID',
    cell: ({ row }) => {
      return <span>{row.getValue('token_id')}</span>
    },
    // maxSize: 1,
    // size: 1,
    // minSize: 1,
  },
  {
    accessorKey: 'method',
    header: () => 'No. of Collabs',
    cell: ({ row }) => {
      return <span>10</span>
    },
    // maxSize: 1,
    // size: 1,
    // minSize: 1,
  },
  {
    accessorKey: 'timestamp',
    header: () => 'My Collab',
    cell: ({ row }) => <span>{'my_collab'} </span>,
    // maxSize: 1,
    // size: 1,
    // minSize: 1,
  },
  {
    accessorKey: 'hash',
    header: () => 'Explorer',
    cell: ({ row }) => {
      return (
        <span
          className="cursor-pointer"
          onClick={() => {
            window.open(`${EXPLORER_URL}/tx/${row.getValue<keyof Transaction>('hash')}`)
          }}
        >
          {row.getValue('hash')}
        </span>
      )
    },
    maxSize: 700,
    size: 700,
    minSize: 700,
  },
  {
    accessorKey: 'version',
    header: () => <p>Version</p>,
    cell: ({ row }) => {
      return <span>{row.getValue('version')}</span>
    },
    // size: 15,
    // minSize: 15,
    // maxSize: 15,
  },
  /*   {
    accessorKey: 'display',
    header: () => <p className="mr-20">Action</p>,
    cell: () => {
      return (
        <Menu as="div" className="mr-20 relative inline-block text-left">
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
      )
    },

    size: 15,
    minSize: 15,
    maxSize: 15,
  }, */
]
