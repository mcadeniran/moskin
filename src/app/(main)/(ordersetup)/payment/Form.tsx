'use client';

import React, {useEffect, useState} from 'react';
import CheckoutSteps from '@/components/layout/CheckoutSteps';
import {Button} from '@/components/ui/button';
import useCartStore from '@/lib/store';
import {useRouter} from 'next/navigation';
import {Bank} from '@phosphor-icons/react/dist/ssr/Bank';
import {CreditCard} from '@phosphor-icons/react/dist/ssr/CreditCard';
import {cn} from '@/lib/utils';
import {FormError} from '@/components/FormError';

const paymentTypes = [
  {
    value: 'BankTransfer',
    text: 'Bank Transfer',
    icon: Bank,
  },
  {
    value: 'OnlinePayment',
    text: 'Online Payment',
    icon: CreditCard,
  },
];


const Form = () => {
  const router = useRouter();
  const {savePaymentMethod, paymentMethod, deliveryAddress} = useCartStore();

  const [selectedPaymentType, setSelectedPaymentType] = useState('');
  const [LocalError, setLocalError] = useState('');

  useEffect(() => {
    if (!deliveryAddress) {
      return router.push('/shipping');
    }
    setSelectedPaymentType(paymentMethod);
    // set
  }, [paymentMethod, router, deliveryAddress]);

  const handlePaymentType = (pType: string) => {
    if (pType === selectedPaymentType) {
      setSelectedPaymentType('');
    } else {
      setSelectedPaymentType(pType);
    }
  };

  const handlePayment = () => {
    setLocalError('');
    if (selectedPaymentType === '') {
      setLocalError('Please select a payment type');
      return;
    }
    savePaymentMethod(selectedPaymentType);
    router.push('/place-order');
  };

  const selectedColor = 'bg-slate-800 text-white';


  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 sm:p-6 md:p-8 lg:p-10">
      <CheckoutSteps current={2} />
      <div className="bg-accent rounded-xl p-4 w-full items-center flex flex-col grow">
        <h2 className='text-base  font-medium text-gray-900 mb-4'>
          Payment Method
        </h2>
        <div className=" border-t pt-4 justify-center items-center flex mb-4 gap-2">
          {
            paymentTypes.map((pt) => (
              <Button
                variant='outline'
                key={pt.value}
                className={cn(
                  'group flex-1 bg-slate-300 items-center  flex justify-center hover:bg-slate-400 hover:text-white',
                  selectedPaymentType === pt.value && selectedColor)}
                onClick={() => handlePaymentType(pt.value)}
              >
                <pt.icon className='h-5 w-5 ' />
                <span className="ml-2">
                  {pt.text}
                </span>
              </Button>
            ))
          }
        </div>
        {
          LocalError !== '' && <div className="mb-2">
            <FormError message={LocalError} />
          </div>
        }
        <div className="max-w-lg w-full flex flex-col sm:flex-row gap-2">
          <Button size='lg' variant='destructive' className='flex grow cursor-pointer ' onClick={() => router.back()} >Back</Button>
          <Button size='lg' className='max-w-lg w-full bg-slate-800 cursor-pointer' onClick={handlePayment} >Next</Button>
        </div>
      </div>
    </div>
  );
};

export default Form;