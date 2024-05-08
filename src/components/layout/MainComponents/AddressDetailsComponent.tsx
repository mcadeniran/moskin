'use client';

import React, {useEffect, useState} from 'react';
import * as z from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Country, ICountry, IState, State} from 'country-state-city';
import {PencilSimpleLine, Plus, Trash, X} from '@phosphor-icons/react/dist/ssr';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {toast} from 'sonner';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Address} from '@prisma/client';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


const formSchema = z.object({
  title: z.string().min(2, {message: 'Title should be atleast 2 charachers long'}),
  house: z.string().min(1, {message: 'House address is required'}),
  street: z.string().min(1, {message: 'Street address is required'}),
  city: z.string().min(1, {message: 'City is required'}),
  state: z.string().min(1, {message: 'State is required'}),
  postal: z.string().min(1, {message: 'Postal code is required'}),
  country: z.string().min(1, {message: 'Country is required'}),
});

const fetchUserAddress = (): Promise<Address[]> => fetch('/api/user/address').then(res => res.json());


export default function AddressDetailsComponent() {
  const [addNew, setAddNew] = useState(false);

  let countriesList = Country.getAllCountries();
  const [statesList, setStatesList] = useState(State.getStatesOfCountry(countriesList[0].isoCode));

  const [deleteId, setDeleteId] = useState<string>('');

  const [country, setCountry] = useState<ICountry>(countriesList[0]);
  const [state, setState] = useState<IState>(statesList[0]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      house: '',
      street: '',
      city: '',
      state: state.name,
      postal: '',
      country: country.name,
    }
  });

  const watchCountry = form.watch('country');

  useEffect(() => {
    const newCountry = getSelectedCountryCode(watchCountry);
    newCountry && setCountry(newCountry);
  }, [watchCountry]);

  useEffect(() => {
    const newState = State.getStatesOfCountry(country.isoCode);
    setStatesList(newState);
  }, [country]);

  useEffect(() => {
    setState(statesList[0]);
  }, [statesList]);


  const getSelectedCountryCode = (c: string) => {
    const counts = Country.getAllCountries();
    const countryCode = counts.find(ct => ct.name === c);
    // console.log(countryCode);
    return countryCode;
  };

  const {isLoading, data, error} = useQuery({queryKey: ['addresses'], queryFn: fetchUserAddress});
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return fetch('/api/user/address', {
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(data),
        method: 'POST'
      });
    },
    onSuccess: (data) => {
      if (data.ok) {
        queryClient.invalidateQueries({queryKey: ['addresses']});
        toast.success("Address saved successfully.");
        form.reset();
        setAddNew(prev => !prev);
      } else {
        if (data.status === 409) {
          toast.error(`Address title already used. ${data.statusText}`);
        } else {
          toast.error(`Unknown error occured! ${data.statusText}`);
        }
      }
    },
    onError: () => {
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (data: any) => {
      return fetch('/api/user/address', {
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(data),
        method: 'DELETE'
      });
    },
    onSuccess: (data) => {
      if (data.ok) {
        queryClient.invalidateQueries({queryKey: ['addresses']});
        toast.success("Address deleted successfully.");
      } else {
        if (data.status === 409) {
          toast.error(`Could not delete address! ${data.statusText}`);
        } else {
          toast.error(`Unknown error occured! ${data.statusText}`);
        }
      }
    },
    onError: () => {
    }
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const data = {...values};
    mutation.mutate(data);
  };

  if (isLoading) return <p className="">Loading User address</p>;
  if (error) return <p className="">Unknown error occured</p>;

  const handleAddressDelete = (id: string) => {
    const data = id;
    deleteMutation.mutate(data);
  };

  return (
    <div className="flex flex-col grow p-4 gap-4 rounded-lg  bg-accent shadow-sm" >
      <div className="flex flex-col gap-0">
        <div className="flex">
          <div className="flex grow">
            Address
          </div>
          <div className='flex items-center text-xs border px-2 py-1 rounded-xl cursor-pointer' onClick={() => setAddNew(prev => !prev)}>
            <span className="text-xs font-light">
              {addNew ? 'Cancel' : 'New'}
            </span>
            {
              addNew ?
                <X size={12} weight="thin" className='ml-1' />
                :
                <Plus size={12} weight="thin" className='ml-1' />
            }
          </div>
        </div>
        <span className="text-xs text-gray-500 italic font-light">This are for delivery purposes only.</span>
      </div>

      {
        addNew &&
        <div className="flex grow justify-between items-start">
          <Form  {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className=' w-full flex flex-col gap-4'>
              <FormField control={form.control} name='title' render={({field}) => {
                return <FormItem className='w-full lg:max-w-96 '>
                  <FormLabel className='mb-0 p-0  font-light text-gray-500 text-xs'>Address Title</FormLabel>
                  <FormControl>
                    <Input
                      className='bg-input placeholder:italic'
                      {...field}
                      placeholder='Home'
                      type='text'

                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>;
              }} />
              {/* Country with Select */}
              <div className="flex flex-row gap-2 lg:flex-row lg:gap-4">
                <FormField control={form.control} name='country' render={({field}) => {
                  return <FormItem className='w-1/2'>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='bg-input'>
                          <SelectValue className='bg-input' placeholder='Select Country' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='bg-input'>
                        {Country.getAllCountries().map(c => (
                          <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>;
                }} />
                <FormField control={form.control} name='state' render={({field}) => {
                  return <FormItem className='w-1/2'>
                    <FormLabel>State</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={state.name}
                    >
                      <FormControl>
                        <SelectTrigger className='bg-input'>
                          <SelectValue className='bg-input' placeholder='Select State' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='bg-input'>
                        {statesList.map(s => (
                          <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>;
                }} />
              </div>
              {/* House & Street */}
              <div className="flex flex-col lg:flex-row lg:gap-4">
                <FormField control={form.control} name='house' render={({field}) => {
                  return <FormItem className='w-full '>
                    <FormLabel className='mb-0 p-0  font-light text-gray-500 text-xs'>House Address</FormLabel>
                    <FormControl>
                      <Textarea className='bg-input placeholder:italic' rows={2} placeholder='House 1, Floor 1 ...' {...field} />

                    </FormControl>
                    <FormMessage />
                  </FormItem>;
                }} />
                <FormField control={form.control} name='street' render={({field}) => {
                  return <FormItem className='w-full '>
                    <FormLabel className='mb-0 p-0  font-light text-gray-500 text-xs'>Street Address</FormLabel>
                    <FormControl>
                      <Textarea className='bg-input placeholder:italic' rows={2} placeholder='ABC Lane DEF Avenue' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>;
                }} />
              </div>
              {/* City & State */}
              <div className="flex flex-col lg:flex-row lg:gap-4">
                <FormField control={form.control} name='city' render={({field}) => {
                  return <FormItem className='w-full '>
                    <FormLabel className='mb-0 p-0  font-light text-gray-500 text-xs'>City</FormLabel>
                    <FormControl>
                      <Input
                        className='bg-input placeholder:italic'
                        {...field}
                        placeholder='Ikeja'
                        type='text'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>;
                }} />
                {/* <FormField control={form.control} name='state' render={({field}) => {
                  return <FormItem className='w-full '>
                    <FormLabel className='mb-0 p-0  font-light text-gray-500 text-xs'>State</FormLabel>
                    <FormControl>
                      <Input
                        className='bg-input placeholder:italic'
                        {...field}
                        placeholder='Lagos'
                        type='text'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>;
                }} /> */}
              </div>
              {/* Postal & Country */}
              <div className="flex flex-col lg:flex-row lg:gap-4">
                <FormField control={form.control} name='postal' render={({field}) => {
                  return <FormItem className='w-full '>
                    <FormLabel className='mb-0 p-0  font-light text-gray-500 text-xs'>Postal Code</FormLabel>
                    <FormControl>
                      <Input
                        className='bg-input placeholder:italic'
                        {...field}
                        placeholder='12654'
                        type='text'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>;
                }} />
                {/* <FormField control={form.control} name='country' render={({field}) => {
                  return <FormItem className='w-full '>
                    <FormLabel className='mb-0 p-0  font-light text-gray-500 text-xs'>Country</FormLabel>
                    <FormControl>
                      <Input
                        className='bg-input placeholder:italic'
                        {...field}
                        placeholder='Nigeria'
                        type='text'

                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>;
                }} /> */}
              </div>
              <div className="flex justify-start">
                <Button className=' w-min'>Add New Address</Button>
              </div>
            </form>
          </Form>
        </div>
      }
      {data?.length === 0 ? <p className='text-sm text-gray-500 italic'>No saved address</p> :
        <Accordion type='single' collapsible className='w-full' >
          {
            data?.map(address =>
              <AccordionItem value={address.id} key={address.id}>
                <AccordionTrigger>{address.title}</AccordionTrigger>
                <AccordionContent>
                  {/* Single Address Container */}
                  <div className="flex flex-col gap-4">
                    <div className="flex grow justify-between items-start">
                      <div className="basis-2/3">
                        <div className=""></div>
                        <p className="text-xs font-light text-gray-500">
                          House Address
                        </p>
                        <span className="text-sm">{address.house}</span>
                      </div>
                      {/* <div className=""></div> */}
                      <div className="flex justify-end gap-2 basis-1/3">
                        <div className='flex items-center text-xs border px-2 py-1 rounded-xl cursor-pointer'>
                          <span className="text-xs font-light">
                            Edit
                          </span>
                          <PencilSimpleLine size={12} weight="thin" className='ml-2' />
                        </div>
                      </div>
                      <AlertDialog >
                        <AlertDialogTrigger>
                          <div className='flex items-center text-xs border px-2 py-1 rounded-xl cursor-pointer'>
                            <span className="text-xs font-light">
                              Delete
                            </span>
                            <Trash size={12} weight="thin" className='ml-2' />
                          </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() =>
                              handleAddressDelete(address.id)
                            }>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    <div className="flex grow justify-between items-start">
                      <div className="basis-1/3">
                        <p className="text-xs font-light text-gray-500">
                          Street
                        </p>
                        <span className="text-sm">{address.street}</span>
                      </div>

                    </div>
                    <div className="flex grow justify-between items-start">
                      <div className="basis-1/3">
                        <p className="text-xs font-light text-gray-500">
                          City
                        </p>
                        <span className="text-sm">{address.city}</span>
                      </div>
                      <div className="basis-1/3">
                        <p className="text-xs font-light text-gray-500">
                          State
                        </p>
                        <span className="text-sm">{address.state}</span>
                      </div>
                      <div className=""></div>
                    </div>
                    <div className="flex grow justify-between items-start">
                      <div className="basis-1/3">
                        <p className="text-xs font-light text-gray-500">
                          Country
                        </p>
                        <span className="text-sm">{address.country}</span>
                      </div>
                      <div className="basis-1/3">
                        <p className="text-xs font-light text-gray-500">
                          Postal Code
                        </p>
                        <span className="text-sm">{address.postal}</span>
                      </div>
                      <div className=""></div>
                    </div>
                  </div>
                  {/* End of single address Container */}
                </AccordionContent>
              </AccordionItem>
            )
          }
        </Accordion>
      }
    </div>
  );
}
