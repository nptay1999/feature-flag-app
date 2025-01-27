import { Content, DraggableTopBar, MainLayout, Sidebar } from '@/components'

function App(): JSX.Element {
  return (
    <>
      <DraggableTopBar />
      <MainLayout>
        <Sidebar className="p-2">Sidebar</Sidebar>
        <Content className="border-l bg-slate-200/50 border-l-white/20">Content</Content>
      </MainLayout>
    </>
  )
}

export default App
