import React, { FC, ReactNode } from "react";
import { Dialog } from "radix-ui";
import { DialogProps } from "@radix-ui/react-dialog";

type ConfirmDialogProps = DialogProps & {
  handleCloseConfirmDialog: () => void;
};

export const ConfirmDialog: FC<ConfirmDialogProps> = ({
  open,
  handleCloseConfirmDialog,
  children,
}) => (
  <Dialog.Root open={open} onOpenChange={(open) => !open}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed blur-xs inset-0 bg-black bg-opacity-30 animate-overlayShow" />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-lg max-h-5/6 p-6 bg-gray-50 rounded-lg shadow-lg animate-contentShow focus:outline-none">
        {children}
        <Dialog.Close asChild>
          <button
            className="absolute top-2 right-2 inline-flex items-center justify-center rounded-full h-6 w-6 text-violet-700 bg-gray-200 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-700"
            aria-label="Close"
            onClick={handleCloseConfirmDialog}
          >
            X
          </button>
        </Dialog.Close>
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
