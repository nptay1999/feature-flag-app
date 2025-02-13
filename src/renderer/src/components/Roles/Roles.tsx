import { useSaveRoles } from '@renderer/hooks'
import { Button, Input, Table, useToast } from '@renderer/libs'
import { useFeatureFlagStore } from '@renderer/store'
import Form, { Field } from 'rc-field-form'
import { useMemo } from 'react'
import { RiAddLine, RiLoader4Line, RiSave3Fill } from 'react-icons/ri'
import { useShallow } from 'zustand/react/shallow'
import { getRoleColumns } from './Roles.config'

const Roles = () => {
  const { toast } = useToast()

  const [featureFlag, deleteRole] = useFeatureFlagStore(
    useShallow((state) => [state.featureFlag, state.deleteRole])
  )

  const { mutate: saveRoles, isPending: isSaveFeaturesLoading } = useSaveRoles()

  const handleSaveRoles = () => {
    saveRoles(undefined, {
      onSuccess: () =>
        toast({
          description: 'Save Feature Flag Successfully!',
          variant: 'success'
        })
    })
  }

  const roles = useMemo(() => featureFlag?.roles ?? [], [featureFlag])

  return (
    <div className="h-full p-6">
      <div className="flex justify-between gap-4">
        <div className="mb-6 flex flex-col space-y-1.5">
          <div className="text-xl font-semibold tracking-tight">Your Roles</div>
          <div className="text-sm text-muted-foreground">Manage your Roles.</div>
        </div>

        <Button>
          <RiAddLine /> Create New Role
        </Button>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <Form className="w-full">
          <Field name="search">
            <Input placeholder="Search role name..." />
          </Field>
        </Form>
        <Button variant="outline" onClick={handleSaveRoles}>
          {isSaveFeaturesLoading ? <RiLoader4Line className="animate-spin" /> : <RiSave3Fill />}{' '}
          Save
        </Button>
      </div>

      <Table data={roles} columns={getRoleColumns({ onDelete: deleteRole })} />
    </div>
  )
}

export default Roles
