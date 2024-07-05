'use client';
import {FormError} from '@/components/FormError';
import {FormSuccess} from '@/components/FormSuccess';
import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import React, {useEffect, useState} from 'react';

const RoleForm = ({role, uid}: {role: string; uid: string;}) => {
  console.log("Initial Role", role);
  const [currentRole, setCurrentRole] = useState(role);
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  useEffect(() => {
    setCurrentRole(role);
  }, [role, uid]);

  const changeRole = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setPending(true);

    const data = {isAdmin: currentRole, id: uid};

    console.log(data);
    const res = await fetch('/api/admin/users/' + uid, {
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(data),
      method: 'PATCH'
    });
    if (res.ok) {
      setSuccessMessage('Role updated');
    } else {
      setErrorMessage('Unknown error');
    }
    setPending(false);
  };

  return (
    <div className="mt-2 flex flex-col gap-2">
      <Select onValueChange={(e) => setCurrentRole(e)} value={currentRole}>
        <SelectTrigger className="w-full bg-input">
          <SelectValue className='bg-input' placeholder='Select Role' />
        </SelectTrigger>
        <SelectContent className='bg-input'>
          <SelectItem value="true">Admin</SelectItem>
          <SelectItem value="false">Client</SelectItem>
        </SelectContent>
      </Select>
      <FormError message={errorMessage} />
      <FormSuccess message={successMessage} />
      <Button className='w-full px-8 py-3' onClick={changeRole} disabled={pending}>Update Role</Button>
    </div>
  );
};

export default RoleForm;