import { Badge, Switch, TTableColumns } from '@renderer/libs'
import { TFeature } from '@shared/types'
import dayjs from 'dayjs'
import { capitalize } from 'lodash'
import { RiCircleLine } from 'react-icons/ri'

// {
//   "key": "DASHBOARD",
//   "name": "Dashboard",
//   "tags": "module,page",
//   "createdAt": "2025-02-04T18:24:36.960Z",
//   "updatedAt": "2025-02-04T18:24:36.962Z",
//   "updater": "taynguyen@fullertonhealth.com",
//   "active": false,
//   "roles": ["admin"]
// }

type TGetFeatureColumns = {
  toggleActive: (key: string) => void
}

export const getFeatureColumns = ({
  toggleActive
}: TGetFeatureColumns): TTableColumns<TFeature>[] => {
  return [
    {
      key: 'key',
      dataIndex: 'key',
      title: 'Feature Key',
      render: (key, record) => {
        return (
          <div className="flex flex-col gap-1">
            <span className="font-bold">{key}</span>
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold text-muted-foreground">{record.name}</span>
              <RiCircleLine className="h-2 w-2 text-muted-foreground" />
              <span className="flex items-center gap-1 text-[0.625rem] text-muted-foreground">
                Tags:
                <span>
                  {record.tags.split(',').map((v) => (
                    <Badge variant="outline" key={v} className="mr-1">
                      {v}
                    </Badge>
                  ))}
                </span>
              </span>
            </div>
          </div>
        )
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
      key: 'roles',
      dataIndex: 'roles',
      title: 'Roles',
      render: (value) =>
        value.map((v) => (
          <Badge variant="secondary" key={v} className="mr-1">
            {capitalize(v)}
          </Badge>
        ))
    },
    {
      key: 'action',
      dataIndex: 'active',
      title: '',
      render: (value, record) => (
        <Switch checked={value as boolean} onClick={() => toggleActive(record.key)} />
      )
    }
  ]
}
