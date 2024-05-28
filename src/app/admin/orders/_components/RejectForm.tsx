'use client';
import {FormError} from '@/components/FormError';
import {Button} from '@/components/ui/button';
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Textarea} from '@/components/ui/textarea';
import {CircleNotch} from '@phosphor-icons/react/dist/ssr';
import React, {useState} from 'react';

const RejectForm = ({id, type, onRejected}: {id: string, type: string; onRejected: () => void;}) => {
  const [open, setOpen] = useState(false);
  const [localError, setLocalError] = useState('');
  const [pending, setPending] = useState(false);
  const [reason, setReason] = useState('');

  const rejectOrder = async (e: any) => {
    e.preventDefault();
    const data = {reason, id, type};
    setLocalError('');
    setPending(true);

    const res = await fetch('/api/admin/orders', {
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(data),
      method: 'PATCH'
    });

    if (res.ok) {
      await onRejected();
      setReason('');
      setPending(false);
      setOpen(false);
    } else {
      const log = await res.json();
      setLocalError(log.message);
      setPending(false);
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className='flex items-center justify-center text-xs border-transparent bg-red-500/15 text-red-500 hover:bg-red-500/30 px-2 py-2 rounded-sm'>
          Reject
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Reject order</DialogTitle>
        </DialogHeader>
        <form onSubmit={rejectOrder} className=' w-full flex flex-col gap-4'>
          <Textarea
            className='bg-input'
            required
            placeholder='Reason for rejection'
            disabled={pending}
            value={reason}
            onChange={(e) => setReason(e.target.value)} /
          >
          <FormError message={localError} />
          <div className="flex justify-end gap-4">
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary" disabled={pending}>
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
            <Button className='bg-slate-700 hover:bg-slate-900' disabled={pending}>
              {pending ? <CircleNotch size={22} className='animate-spin' /> : 'Reject'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RejectForm;