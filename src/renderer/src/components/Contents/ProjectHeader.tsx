import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@renderer/libs'
import { useFeatureFlagStore } from '@renderer/store'
import { capitalize } from 'lodash'
import { Fragment, useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'

export const ProjectHeader = () => {
  const [projectName, activeSideTab] = useFeatureFlagStore(
    useShallow((state) => [state.projectName, state.activeSideTab])
  )

  const contents = useMemo(() => {
    const result: string[] = []

    if (projectName) result.push(projectName)

    if (typeof activeSideTab !== 'undefined') result.push(capitalize(activeSideTab as string))

    return result
  }, [projectName, activeSideTab])

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
      {projectName ? (
        <ContentBreadcrumb contents={contents} />
      ) : (
        <span className="text-xs italic text-muted-foreground">Create or Open Project</span>
      )}
    </header>
  )
}

const ContentBreadcrumb = ({ contents }: { contents: string[] }) => {
  const length = contents.length
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {contents.map((content, index) => (
          <Fragment key={content}>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold leading-none tracking-tight">
                {content}
              </BreadcrumbPage>
            </BreadcrumbItem>

            {index !== length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
