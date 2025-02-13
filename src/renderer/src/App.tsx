import {
  CacheLoader,
  Content,
  DraggableTopBar,
  MainContents,
  MainLayout,
  ProjectHeader,
  Sidebar,
  SidebarList,
  SideControl
} from '@/components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from './libs'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    },
    mutations: {}
  }
})

function App(): JSX.Element {
  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <DraggableTopBar />
        <CacheLoader>
          <MainLayout>
            <div>
              <SideControl />
              <Sidebar className="p-2">
                <SidebarList />
              </Sidebar>
            </div>
            <Content className="border-l border-l-white/20">
              <ProjectHeader />
              <MainContents />
            </Content>
          </MainLayout>
        </CacheLoader>
      </QueryClientProvider>
    </>
  )
}

export default App
