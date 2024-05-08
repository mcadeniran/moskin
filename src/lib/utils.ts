import { Address } from '@prisma/client';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SW = ['Oyo', 'Osun', 'Ekiti', 'Ogun', 'Ondo', 'Lagos'];
const SE = ['Anambra', 'Abia', 'Enugu', 'Ebonyi', 'Imo'];
const NW = [
  'Sokoto',
  'Katsina',
  'Jigawa',
  'Kano',
  'Zamfara',
  'Kaduna',
  'Kebbi',
];
const NE = ['Yobe', 'Borno', 'Bauchi', 'Gombe', 'Adamawa', 'Taraba'];
const NC = [
  'Niger',
  'Nasarawa',
  'Kwara',
  'Kogi',
  'Benue',
  'Plateau',
  'Abuja Federal Capital Territory',
];
const SS = ['Edo', 'Delta', 'Cross River', 'Akwa Ibom', 'Rivers', 'Bayelsa'];

export function getAddressDeliveryPrice(address: Address) {
  const country = address.country;

  if (country !== 'Nigeria') return 15000;

  const state = address.state;

  if (state === 'Lagos') return 1000;

  if (SW.includes(state)) return 2500;
  if (SE.includes(state)) return 3000;
  if (NW.includes(state)) return 4000;
  if (NE.includes(state)) return 4000;
  if (NC.includes(state)) return 3000;
  if (SS.includes(state)) return 2800;

  return 1;
}
