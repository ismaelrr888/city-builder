import React, { FC, ReactNode } from "react";
import { Dialog } from "radix-ui";
import { DialogProps } from "@radix-ui/react-dialog";

type ConfirmDialogProps = DialogProps;

export const ConfirmDialog: FC<ConfirmDialogProps> = ({ open, children }) => (
  <Dialog.Root open={open} onOpenChange={(open) => !open}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed blur-xs inset-0 bg-black bg-opacity-30 animate-overlayShow" />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-lg max-h-5/6 p-6 bg-gray-50 rounded-lg shadow-lg animate-contentShow focus:outline-none">
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export const DialogTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <Dialog.Title className={className}>{children}</Dialog.Title>;

export const DialogClose = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <Dialog.Close asChild className={className}>
    {children}
  </Dialog.Close>
);
