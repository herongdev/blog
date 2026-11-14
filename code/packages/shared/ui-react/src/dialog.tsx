import type { ComponentProps } from 'react';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { withClass } from './classes.js';

export const DialogRoot = BaseDialog.Root;
export const DialogTrigger = BaseDialog.Trigger;
export const DialogPortal = BaseDialog.Portal;
export const DialogClose = BaseDialog.Close;
export const DialogTitle = BaseDialog.Title;
export const DialogDescription = BaseDialog.Description;
export function DialogBackdrop({ className, ...props }: ComponentProps<typeof BaseDialog.Backdrop>) {
  return <BaseDialog.Backdrop {...props} className={withClass('hrui-dialog-backdrop', className)} />;
}
export function DialogViewport({ className, ...props }: ComponentProps<typeof BaseDialog.Viewport>) {
  return <BaseDialog.Viewport {...props} className={withClass('hrui-dialog-viewport', className)} />;
}
export function DialogPopup({ className, ...props }: ComponentProps<typeof BaseDialog.Popup>) {
  return <BaseDialog.Popup {...props} className={withClass('hrui-dialog-popup', className)} />;
}
export const Dialog = {
  Root: DialogRoot, Trigger: DialogTrigger, Portal: DialogPortal, Close: DialogClose,
  Title: DialogTitle, Description: DialogDescription, Backdrop: DialogBackdrop,
  Viewport: DialogViewport, Popup: DialogPopup,
};
