import { Button, TTableColumns } from '@renderer/libs'
import { TRole } from '@shared/types'
import dayjs from 'dayjs'
import { RiDeleteBin6Line } from 'react-icons/ri'

type TGetRoleColumns = {
  onDelete: (role: string) => void
}

export const getRoleColumns = ({ onDelete }: TGetRoleColumns): TTableColumns<TRole>[] => {
  return [
    {
      key: 'key',
      dataIndex: 'role',
      title: 'Role',
      render: (key) => {
        return <span className="font-bold uppercase">{key}</span>
      }
    },
    {
      key: 'updatedDate',
      dataIndex: 'updatedAt',
      title: 'Info',
      render: (updatedDate, { updater }) => {
        return (
          <div className="flex flex-col gap-0">
            <span className="text-[0.625rem] text-muted-foreground">
              Updated:{' '}
              <span className="text-sm text-foreground">
                {dayjs(updatedDate as string).format('DD/MM/YYYY')}
              </span>
            </span>

            <span className="text-[0.625rem]">{updater}</span>
          </div>
        )
      }
    },
    {
      key: 'action',
      dataIndex: 'role',
      title: '',
      render: (role) => (
        <Button
          variant={'destructive'}
          size={'icon'}
          className="h-5 w-5 rounded-full [&_svg]:size-3"
          onClick={() => onDelete(role)}
        >
          <RiDeleteBin6Line />
        </Button>
      )
    }
  ]
}
