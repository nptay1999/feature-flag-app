import { CreateFeatureFlagModal, OpenFeatureFlagModal } from '@renderer/components'
import { Button } from '@renderer/libs'
import { useState } from 'react'
import { RiApps2AddLine, RiFolderOpenLine } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

export const SideControl = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showOpenModal, setShowOpenModal] = useState(false)
  return (
    <div className={twMerge('h-12 p-2 flex justify-end items-center gap-1')}>
      <Button variant="ghost" size="icon" onClick={() => setShowCreateModal(true)}>
        <RiApps2AddLine />
      </Button>

      <Button variant="ghost" size="icon" onClick={() => setShowOpenModal(true)}>
        <RiFolderOpenLine />
      </Button>

      <CreateFeatureFlagModal open={showCreateModal} onClose={() => setShowCreateModal(false)} />
      <OpenFeatureFlagModal open={showOpenModal} onClose={() => setShowOpenModal(false)} />
    </div>
  )
}
