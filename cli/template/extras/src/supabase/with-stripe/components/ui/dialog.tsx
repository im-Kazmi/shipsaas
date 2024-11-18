'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { createPortal } from 'react-dom';

interface DialogContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextType | undefined>(
  undefined
);

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Dialog: React.FC<DialogProps> = ({
  children,
  open,
  onOpenChange,
  ...props
}) => {
  const value = React.useMemo(
    () => ({ open, onOpenChange }),
    [open, onOpenChange]
  );

  return (
    <DialogContext.Provider value={value}>
      <div {...props}>{children}</div>
    </DialogContext.Provider>
  );
};

interface DialogTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const DialogTrigger: React.FC<DialogTriggerProps> = ({
  children,
  ...props
}) => {
  const { onOpenChange } = React.useContext(DialogContext)!;

  return (
    <button
      onClick={() => {
        console.log('Opening Dialog');
        onOpenChange(true);
      }}
      {...props}
    >
      {children}
    </button>
  );
};

interface DialogPortalProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogPortal: React.FC<DialogPortalProps> = ({ children, ...props }) => {
  const { open } = React.useContext(DialogContext)!;

  if (!open) return null;

  return createPortal(
    <div
      {...props}
      className="fixed inset-0 z-50 flex items-start justify-center p-4 mt-5"
    >
      {children}
    </div>,
    document.body
  );
};

interface DialogOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'fixed inset-0 z-40 bg-black/80 transition-opacity',
        className
      )}
      {...props}
    />
  )
);
DialogOverlay.displayName = 'DialogOverlay';

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, className, ...props }, ref) => {
    const { onOpenChange } = React.useContext(DialogContext)!;

    return (
      <DialogPortal>
        <DialogOverlay onClick={() => onOpenChange(false)} />
        <div
          ref={ref}
          className={cn(
            'relative z-50 w-full max-w-lg bg-white rounded-lg shadow-lg p-6',
            'transform transition-all duration-200',
            'opacity-100 scale-100 m-auto ',
            className
          )}
          {...props}
        >
          {children}
          <DialogClose onClick={() => onOpenChange(false)} />
        </div>
      </DialogPortal>
    );
  }
);
DialogContent.displayName = 'DialogContent';

interface DialogCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const DialogClose: React.FC<DialogCloseProps> = (props) => (
  <button
    {...props}
    className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
  >
    <X className="h-4 w-4" />
    <span className="sr-only">Close</span>
  </button>
);

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogHeader: React.FC<DialogHeaderProps> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogFooter: React.FC<DialogFooterProps> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ children, className, ...props }, ref) => (
    <h2 ref={ref} className={cn('text-lg font-semibold', className)} {...props}>
      {children}
    </h2>
  )
);
DialogTitle.displayName = 'DialogTitle';

interface DialogDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ children, className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-gray-500', className)} {...props}>
    {children}
  </p>
));
DialogDescription.displayName = 'DialogDescription';

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
};
