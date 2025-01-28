import {
  Content,
  DraggableTopBar,
  MainLayout,
  Sidebar,
  SidebarList,
  SideControl
} from '@/components'
import { RiFlagLine, RiUserSettingsLine } from 'react-icons/ri'

function App(): JSX.Element {
  const items = [
    {
      title: 'Feature Flags',
      icon: <RiFlagLine />,
      key: 'Feature Flags'
    },
    {
      title: 'Roles',
      icon: <RiUserSettingsLine />,
      key: 'Roles'
    }
  ]
  return (
    <>
      <DraggableTopBar />
      <MainLayout>
        <div>
          <SideControl />
          <Sidebar className="p-2">
            <SidebarList items={items} />
          </Sidebar>
        </div>
        <Content className="border-l border-l-white/20">
          <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4"></header>
        </Content>
      </MainLayout>
    </>
  )
}

export default App
