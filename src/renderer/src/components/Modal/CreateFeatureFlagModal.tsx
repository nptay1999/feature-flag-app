import { Modal, TModalProps } from '@renderer/components'
import { Button, Input, Label } from '@renderer/libs'
import Form, { Field, FormProps, useForm } from 'rc-field-form'
import { useState } from 'react'

type TCreateFeatureFlagModalProps = Pick<TModalProps, 'open'> & {
  onClose: VoidFunction
}

export const CreateFeatureFlagModal = ({ open, onClose }: TCreateFeatureFlagModalProps) => {
  const [form] = useForm()
  const [error, setError] = useState<string>()

  const handleCancel = async () => {
    const filePath = form.getFieldValue('filePath')
    if (filePath) await window.context.deleteFile(filePath)
    handleClose()
  }

  const handleBrowseFile = async () => {
    const projectName = form.getFieldValue('projectName')
    if (!projectName) return setError('Project Name is required')

    setError(undefined)
    const filePath = await window.context.createFeatureFlag(projectName)

    if (!filePath) return
    form.setFieldValue('filePath', filePath)
  }

  const handleFinished: FormProps['onFinish'] = async (values) => {
    const { filePath } = values
    const featureFlag = await window.context.loadFeatureFlagFile(filePath)
    console.log({ featureFlag })
    handleClose()
  }

  const handleClose = () => {
    form.resetFields()
    setError(undefined)
    onClose()
  }

  const handleError: FormProps['onFinishFailed'] = (error) => {
    console.log(error)
    setError(error.errorFields[0].errors[0])
  }

  return (
    <Modal
      open={open}
      onOk={form.submit}
      onCancel={handleCancel}
      title="Create Feature Flag"
      description={
        error ? (
          <span className="text-red-600">{error}</span>
        ) : (
          'Fill all require field to create a feature flag file'
        )
      }
      okTitle="Create"
    >
      <Form
        form={form}
        className="w-full [&_div]:mb-4"
        onFinish={handleFinished}
        onFinishFailed={handleError}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="projectName" className="text-xs font-semibold" required>
            Project Name
          </Label>
          <Field
            name="projectName"
            rules={[{ required: true, message: 'Project Name is required' }]}
          >
            <Input id="projectName" placeholder="Enter project name..." />
          </Field>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="filePath" className="font-semibold" required>
            File Path
          </Label>
          <div className="flex items-center gap-2">
            <Field name="filePath" rules={[{ required: true, message: 'File Path is required' }]}>
              <Input id="filePath" placeholder="Enter file path..." className="flex-1" disabled />
            </Field>

            <Button variant="secondary" type="button" onClick={handleBrowseFile}>
              Browse
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  )
}
