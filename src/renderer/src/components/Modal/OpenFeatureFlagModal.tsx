import { Modal, TModalProps } from '@renderer/components'
import { Button, Input, Label } from '@renderer/libs'
import Form, { Field, useForm } from 'rc-field-form'

type TOpenFeatureFlagModalProps = Pick<TModalProps, 'open'> & {
  onClose: VoidFunction
}

export const OpenFeatureFlagModal = ({ open, onClose }: TOpenFeatureFlagModalProps) => {
  const [form] = useForm()

  const handleClose = () => {
    form.resetFields()
    onClose()
  }

  return (
    <Modal
      open={open}
      onOk={form.submit}
      onCancel={handleClose}
      title="Open Feature Flag"
      okTitle="Open"
    >
      <Form form={form} className="w-full [&_div]:mb-4" onFinish={console.log}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="filePath" className="font-semibold">
            File Path
          </Label>
          <div className="flex items-center gap-2">
            <Field name="filePath">
              <Input id="filePath" placeholder="Enter file path..." className="flex-1" disabled />
            </Field>

            <Button variant="secondary" type="button">
              Browse
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  )
}
