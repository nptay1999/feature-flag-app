import { Modal, TModalProps } from '@renderer/components'
import { Button, Input, Label } from '@renderer/libs'
import { useFeatureFlagStore } from '@renderer/store'
import { ESideTab } from '@renderer/utils'
import Form, { Field, FormProps, useForm } from 'rc-field-form'
import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

type TOpenFeatureFlagModalProps = Pick<TModalProps, 'open'> & {
  onClose: VoidFunction
}

export const OpenFeatureFlagModal = ({ open, onClose }: TOpenFeatureFlagModalProps) => {
  const [form] = useForm()
  const [error, setError] = useState<string>()

  const [setFeatureFlag, setActiveSideTab, setFeatureFlagFilePath] = useFeatureFlagStore(
    useShallow((state) => [
      state.setFeatureFlag,
      state.setActiveSideTab,
      state.setFeatureFlagFilePath
    ])
  )

  const handleBrowseFile = async () => {
    const filePath = await window.context.getFeatureFlagFilePath()

    if (!filePath) return
    form.setFieldValue('filePath', filePath)
  }

  const handleFinished: FormProps['onFinish'] = async (values) => {
    const { filePath } = values
    const featureFlag = await window.context.loadFeatureFlagFile(filePath)
    setFeatureFlag(featureFlag)
    setActiveSideTab(ESideTab.FEATURE)
    setFeatureFlagFilePath(filePath)
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
      onCancel={handleClose}
      title="Open Feature Flag"
      okTitle="Open"
      description={error ? <span className="text-red-600">{error}</span> : undefined}
    >
      <Form
        form={form}
        className="w-full [&_div]:mb-4"
        onFinish={handleFinished}
        onFinishFailed={handleError}
      >
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
