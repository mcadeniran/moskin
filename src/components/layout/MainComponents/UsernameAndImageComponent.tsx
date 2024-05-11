'use client';

import femaleAvatar from '/public/female_avatar.png';
import Image from 'next/image';
import {useSession} from 'next-auth/react';
import {useState, useTransition} from 'react';

import * as z from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {PencilSimpleLine} from '@phosphor-icons/react/dist/ssr/PencilSimpleLine';
import {X} from '@phosphor-icons/react/dist/ssr/X';
import {Camera, Check, CircleNotch, Upload} from '@phosphor-icons/react/dist/ssr';
import {username} from '@/actions/username';
import {Loader} from '../AdminComponents/loader';
import {FormError} from '@/components/FormError';
import {FormSuccess} from '@/components/FormSuccess';

import {Form, FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {UsernameSchema} from '@/schemas';
import {updateProfileImage} from '@/actions/update-profile-image';
import {toast} from 'sonner';

const UsernameAndImageComponent = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [isImagePending, startImageTransition] = useTransition();
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const {data, update} = useSession();

  const form = useForm<z.infer<typeof UsernameSchema>>({
    resolver: zodResolver(UsernameSchema),
    defaultValues: {
      username: data?.user.username || undefined
    }
  });

  const handleOnFileChange = (ev: any) => {
    const files = ev.target.files;

    if (files?.length > 0) {
      setIsFileSelected(true);
      setSelectedFile(files);
    }
  };


  const handleImageUpload = () => {
    console.log(selectedFile);
    if (!selectedFile) return;
    const fileData = new FormData;
    fileData.set('file', selectedFile[0]);
    setError('');
    setSuccess('');
    startImageTransition(() => {
      updateProfileImage(fileData).then((d) => {
        if (d.error) {
          setError(d.error);
        }
        if (d.success) {
          update();
          setSelectedFile(null);
          setIsFileSelected(false);
          toast('Upload Successful', {description: d.success});
        }
      }).catch(() => setError('Something went wrong!'));
    });
  };

  const onUsernameSubmit = (values: z.infer<typeof UsernameSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      username(values).then((d) => {
        if (d.error) {
          setError(d.error);
        }
        if (d.success) {
          update();
          setSuccess(d.success);
        }
      }).catch(() => setError('Something went wrong!'));
    });
  };


  return (
    <div className="flex flex-row grow gap-4 justify-start items-start p-4  rounded-lg bg-accent shadow-sm">
      {/* Image Container */}
      <div className="relative">
        <Image
          src={data?.user.image === undefined ?
            femaleAvatar :
            data.user.image === '' ?
              femaleAvatar : data.user.image
          }
          alt='avatar'
          height={84}
          width={84}
          className='rounded-full h-[84px] w-[84px] md:h-[84px] md:w-[84px] object-cover'
        />
        {
          isImagePending ?
            <div
              onClick={handleImageUpload}
              className="absolute group inline-flex items-center justify-center  bg-slate-100  text-xs font-medium text-black  rounded-full bottom-1 -end-2 cursor-pointer">
              <CircleNotch size={22} className='animate-spin' />
            </div> :
            isFileSelected ?
              <div
                onClick={handleImageUpload}
                className="absolute group inline-flex items-center justify-center  bg-slate-100  text-xs font-medium text-black  rounded-full bottom-1 -end-2 cursor-pointer">
                <Check size={22} />
              </div>
              :
              <label className="absolute group inline-flex items-center justify-center  bg-slate-100  text-xs font-medium text-black  rounded-full bottom-1 -end-2 cursor-pointer">
                <input type='file' className='hidden' onChange={handleOnFileChange} />
                <Camera size={22} />
              </label>
        }
      </div>

      {/* User name and email Container */}
      <div className="">
        <Form  {...form}>
          <form onSubmit={form.handleSubmit(onUsernameSubmit)} className='  flex  flex-col '>
            <FormField control={form.control} name='username' render={({field}) => {
              return <FormItem className=' space-y-0'>
                <FormControl>
                  <Input
                    className='mt-0 h-6 text-base font-medium  bg-transparent border-0 border-accent p-0 focus-visible:ring-offset-0 focus-visible:ring-0 disabled:opacity-70'
                    {...field}
                    placeholder='Username'
                    type='text'
                    disabled={isDisabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>;
            }} />
            <div className="flex text-base mt-2 font-medium text-gray-700">
              {
                !isDisabled &&
                <button className='flex  items-center mr-2 text-xs border px-2 py-1 rounded-xl cursor-pointer' type='submit'>
                  <div
                    className='flex items-center justify-center'
                  >
                    {!isPending && <span className="text-xs font-light">
                      Save
                    </span>
                    }
                    {isPending ? <Loader /> :
                      <Check size={12} weight="thin" className='ml-1' />
                    }
                  </div>
                </button>
              }
              <div
                className='flex items-center text-xs border px-2 py-1 gap-2 rounded-xl cursor-pointer'
                onClick={() => {
                  setIsDisabled(prev => !prev);
                  setError(''); setSuccess('');
                  form.setValue('username', data?.user.username || ''
                  );
                  form.clearErrors();
                }}>
                {isDisabled ? <>
                  <span className="text-xs font-light">
                    Edit Username
                  </span>
                  <PencilSimpleLine size={12} weight="thin" className='ml-1' />
                </> : <>
                  <span className="text-xs  font-light">
                    Cancel
                  </span>
                  <X size={12} weight="thin" className='ml-1' />
                </>}
              </div>
            </div>
          </form>
        </Form>
        <span className="text-sm font-light text-gray-700">{data?.user.email}</span>
        <div className="mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
      </div>
    </div >
  );
};

export default UsernameAndImageComponent;