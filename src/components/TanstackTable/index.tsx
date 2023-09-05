import { ColumnDef, TableOptions, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { PaginationPanel } from './PaginationPanel'

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  options?: Partial<TableOptions<TData>>
}

export const TanstackTable = <TData, TValue>({ data, columns, options }: Props<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
    ...options,
  })

  return (
    <table className="w-[100%]  text-center text-sm text-white whitespace-nowrap">
      <thead className="bg-blue-900 ">
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                className="p-2"
                // style={{
                //   width: header.getSize() !== 0 ? header.getSize() : 0,
                // }}
              >
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="divide-y divide-gray-200 text-left ">
        {table.getRowModel().rows.map((row, index) => {
          const classes = index % 2 === 0 ? ' py-2 pl-2 bg-slate-800 text-center' : 'py-2 pl-2 text-center'
          return (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className={classes}
                  // style={{
                  //   width: cell.column.getSize() !== 0 ? cell.column.getSize() : 0,
                  // }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>

      {Boolean(options?.getPaginationRowModel) && <PaginationPanel table={table} />}
    </table>
  )
}
