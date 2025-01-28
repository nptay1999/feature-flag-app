import { DialogProps } from '@radix-ui/react-dialog'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@renderer/libs'
import { cn } from '@renderer/utils'
import { ReactNode } from 'react'

export type TModalProps = DialogProps & {
  title: ReactNode
  description?: ReactNode
  onOk: VoidFunction
  onCancel: VoidFunction
  okTitle?: string
  cancelTitle?: string
}

export function Modal({
  title,
  description,
  onOk,
  onCancel,
  okTitle,
  cancelTitle,
  children,
  ...props
}: TModalProps) {
  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-[425px]" hiddenClose={true}>
        <DialogHeader
          className={cn('border-b border-accent', { 'pb-2': !!description, 'pb-4': !description })}
        >
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}

        <DialogFooter>
          <Button variant="secondary" type="submit" onClick={onCancel}>
            {cancelTitle ?? 'Cancel'}
          </Button>
          <Button type="submit" onClick={onOk}>
            {okTitle ?? 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
