// components/use-confirm.tsx
'use client'

import React, { useState, useCallback, createContext, useContext } from 'react';
import { Button } from '@/components/ui/button'; // Assuming shadcn path
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Define the valid variants for the shadcn Button component (essential for type safety)
type ButtonVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';

// -------------------------------------------------------------
// 1. Types and Context Setup (MODIFIED) 🛠️
// -------------------------------------------------------------

interface ConfirmationState {
  isOpen: boolean;
  message: string;
  title: string;
  onResolve: (value: boolean) => void; 
  // NEW PROPERTIES:
  confirmText: string;
  confirmVariant: ButtonVariant;
}

const initialConfirmationState: ConfirmationState = {
  isOpen: false,
  message: '',
  title: '',
  onResolve: () => {}, 
  // NEW DEFAULTS:
  confirmText: 'Confirm', 
  confirmVariant: 'default', 
};

// Define the context to hold the `confirm` function (MODIFIED SIGNATURE)
const ConfirmationContext = createContext<
  (
    title: string, 
    message: string, 
    confirmText?: string, // New optional argument
    confirmVariant?: ButtonVariant // New optional argument
  ) => Promise<boolean>
>(() => Promise.resolve(false));


export const ConfirmationProvider = ({ children }: { children: React.ReactNode }) => {
  const [confirmationState, setConfirmationState] = useState(initialConfirmationState);

  // Function exposed through the context. It opens the dialog and returns a Promise. (MODIFIED LOGIC)
  const confirm = useCallback((
    title: string, 
    message: string, 
    // Set defaults if arguments are not provided
    confirmText: string = 'Confirm', 
    confirmVariant: ButtonVariant = 'default' 
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmationState({
        isOpen: true,
        message,
        title,
        onResolve: resolve, 
        // Pass the new custom values to the state
        confirmText,
        confirmVariant,
      });
    });
  }, []);

  // Handler for when the user clicks the "Confirm" button
  const handleConfirm = () => {
    confirmationState.onResolve(true); 
    setConfirmationState(initialConfirmationState); 
  };

  // Handler for when the user clicks "Cancel"
  const handleCancel = () => {
    confirmationState.onResolve(false); 
    setConfirmationState(initialConfirmationState); 
  };

  return (
    <ConfirmationContext.Provider value={confirm}>
      {children}
      
      {/* The actual shadcn/ui Dialog component, controlled by state */}
      <Dialog open={confirmationState.isOpen} onOpenChange={handleCancel}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{confirmationState.title}</DialogTitle>
            <DialogDescription>
              {confirmationState.message}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-4">
            <Button 
              variant="outline" 
              onClick={handleCancel}
            >
              Cancel
            </Button>
            {/* MODIFICATION: Dynamic Button Text and Variant */}
            <Button 
              variant={confirmationState.confirmVariant} 
              onClick={handleConfirm}
            >
              {confirmationState.confirmText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ConfirmationContext.Provider>
  );
};


export const useConfirm = () => {
    return useContext(ConfirmationContext);
};