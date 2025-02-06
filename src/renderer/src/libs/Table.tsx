import { ReactNode } from 'react'
import {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableWrapper
} from './TableLib'

type TTableRenderWithIndex<T> = (value: T[keyof T], record: T) => ReactNode
type TTableRenderWithoutIndex<T> = (record: T) => ReactNode

export type TTableColumns<T> = {
  key?: string
  dataIndex?: keyof T // Ensure it's a valid key of T
  title: string
  render?: TTableRenderWithIndex<T> | TTableRenderWithoutIndex<T> // Fixed render signature
}

export type TTableProps<T> = {
  data: T[]
  columns: TTableColumns<T>[]
  caption?: string
  hasFooter?: boolean
}

export const Table = <T,>({ data, columns, caption, hasFooter = false }: TTableProps<T>) => {
  return (
    <TableWrapper>
      {caption && <TableCaption>{caption}</TableCaption>}

      {/* Table Header */}
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.key}>{col.title}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      {/* Table Body */}
      <TableBody>
        {data.map((record, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((col) => {
              const key = col.key || (col.dataIndex as string)
              let cellContent: ReactNode = ''

              if (col.render) {
                if (col.dataIndex) {
                  // If dataIndex exists, use TTableRenderWithIndex<T>
                  cellContent = (col.render as TTableRenderWithIndex<T>)(
                    record[col.dataIndex],
                    record
                  )
                } else {
                  // If no dataIndex, use TTableRenderWithoutIndex<T>
                  cellContent = (col.render as TTableRenderWithoutIndex<T>)(record)
                }
              } else if (col.dataIndex) {
                // Default: Display raw value if dataIndex exists
                cellContent = record[col.dataIndex] as unknown as ReactNode
              }

              return <TableCell key={key}>{cellContent}</TableCell>
            })}
          </TableRow>
        ))}
      </TableBody>

      {/* Table Footer (Optional) */}
      {data.length > 0 && hasFooter && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns.length}>Total Rows: {data.length}</TableCell>
          </TableRow>
        </TableFooter>
      )}
    </TableWrapper>
  )
}
