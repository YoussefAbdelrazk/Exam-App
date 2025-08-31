'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface DeleteAccountDialogProps {
  onDeleteAccount: () => Promise<void>;
}

export default function DeleteAccountDialog({ onDeleteAccount }: DeleteAccountDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDeleteAccount();
      setIsOpen(false);
      toast.success('Account deleted successfully');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Failed to delete account. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type='button'
          variant='destructive'
          className='px-6 bg-red-50 text-red-600 hover:bg-red-100 w-[331px]'
        >
          Delete My Account
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[558px] sm:mx-auto'>
        <DialogHeader className='text-center'>
          <div className='mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-red-50 mb-4'>
            <div className='bg-red-100 text-red-600 rounded-full p-3'>
              <AlertTriangle className='h-12 w-12 ' />
            </div>
          </div>
          <DialogTitle className='text-md font-semibold text-red-600 text-center'>
            Are you sure you want to delete your account?
          </DialogTitle>
          <DialogDescription className='text-sm text-gray-500 mt-2 text-center'>
            This action is permanent and cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex-col sm:flex-row gap-3 mt-6 sm:justify-center'>
          <Button
            type='button'
            variant='outline'
            onClick={() => setIsOpen(false)}
            className='w-full '
          >
            Cancel
          </Button>
          <Button
            type='button'
            variant='destructive'
            onClick={handleDelete}
            disabled={isDeleting}
            className='w-full  bg-red-600 hover:bg-red-700'
          >
            {isDeleting ? 'Deleting...' : 'Yes, delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
