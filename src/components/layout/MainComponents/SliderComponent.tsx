'use client';
import {Button} from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';

const sliders = [
  {
    id: 1,
    title: 'Unveiling Your Natural Beauty With Our Products',
    image: '/f1.jpeg'
  },
  {
    id: 2,
    title: 'Elevating your Radiance: Empower your Glow with Our Formulas',
    image: '/f2.png'
  },
  {
    id: 3,
    title: "Unlocking Inner Brilliance: Enhance Your Aura with Our Collection",
    image: '/f3.jpeg'
  },
];

export default function SliderComponent() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentSlide(prev => (prev === sliders.length - 1 ? 0 : prev + 1)),
      5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex flex-col h-[calc(100vh-4.5rem)] md:h-[calc(100vh-5.2rem)] lg:flex-row'>
      {/* Text Container */}
      <div className=" items-center flex justify-center flex-col gap-8 font-bold flex-1">
        <h1 className="text-3xl text-center uppercase p-4 md:p-10 md:text-4xl lg:text-5xl">{sliders[currentSlide].title}</h1>
        <Link href={'/shop'} className='px-8 py-4 bg-slate-800 rounded-lg text-white'>Shop Now</Link>
      </div>
      {/* Image Container */}
      <div className=" w-full relative flex-1">
        <Image src={sliders[currentSlide].image} alt='' fill className=' object-cover' sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
      </div>
    </div>
  );
}
