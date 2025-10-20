
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


type ButtonVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';


interface ConfirmationState {
  isOpen: boolean;
  message: string;
  title: string;
  onResolve: (value: boolean) => void; 
 
  confirmText: string;
  confirmVariant: ButtonVariant;
}

const initialConfirmationState: ConfirmationState = {
  isOpen: false,
  message: '',
  title: '',
  onResolve: () => {}, 
  
  confirmText: 'Confirm', 
  confirmVariant: 'default', 
};


const ConfirmationContext = createContext<
  (
    title: string, 
    message: string, 
    confirmText?: string, 
    confirmVariant?: ButtonVariant 
  ) => Promise<boolean>
>(() => Promise.resolve(false));


export const ConfirmationProvider = ({ children }: { children: React.ReactNode }) => {
  const [confirmationState, setConfirmationState] = useState(initialConfirmationState);

  const confirm = useCallback((
    title: string, 
    message: string, 

    confirmText: string = 'Confirm', 
    confirmVariant: ButtonVariant = 'default' 
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmationState({
        isOpen: true,
        message,
        title,
        onResolve: resolve, 
      
        confirmText,
        confirmVariant,
      });
    });
  }, []);


  const handleConfirm = () => {
    confirmationState.onResolve(true); 
    setConfirmationState(initialConfirmationState); 
  };


  const handleCancel = () => {
    confirmationState.onResolve(false); 
    setConfirmationState(initialConfirmationState); 
  };

  return (
    <ConfirmationContext.Provider value={confirm}>
      {children}
      
      
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