import { useSaveFeatures } from '@renderer/hooks'
import { Button, Input, Table, useToast } from '@renderer/libs'
import { useFeatureFlagStore } from '@renderer/store'
import Form, { Field } from 'rc-field-form'
import { useMemo } from 'react'
import { RiAddLine, RiLoader4Line, RiSave3Fill } from 'react-icons/ri'
import { useShallow } from 'zustand/react/shallow'
import { getFeatureColumns } from './Features.config'

const Features = () => {
  const { toast } = useToast()

  const [featureFlag, toggleFeature] = useFeatureFlagStore(
    useShallow((state) => [state.featureFlag, state.toggleFeature])
  )

  const { mutate: saveFeature, isPending: isSaveFeaturesLoading } = useSaveFeatures()

  const features = useMemo(() => featureFlag?.features ?? [], [featureFlag])

  const handleSaveFeature = () => {
    saveFeature(undefined, {
      onSuccess: () =>
        toast({
          description: 'Save Feature Flag Successfully!',
          variant: 'success'
        })
    })
  }

  return (
    <div className="h-full p-6">
      <div className="flex justify-between gap-4">
        <div className="mb-6 flex flex-col space-y-1.5">
          <div className="text-xl font-semibold tracking-tight">Your Feature Flags</div>
          <div className="text-sm text-muted-foreground">Manage your Feature Flags.</div>
        </div>

        <Button>
          <RiAddLine /> Create New Feature
        </Button>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <Form className="w-full">
          <Field name="search">
            <Input placeholder="Search feature name..." />
          </Field>
        </Form>
        <Button variant="outline" onClick={handleSaveFeature}>
          {isSaveFeaturesLoading ? <RiLoader4Line className="animate-spin" /> : <RiSave3Fill />}{' '}
          Save
        </Button>
      </div>

      <Table data={features} columns={getFeatureColumns({ toggleActive: toggleFeature })} />
    </div>
  )
}

export default Features
