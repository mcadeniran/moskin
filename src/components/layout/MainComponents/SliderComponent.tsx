'use client';
import Image from 'next/image';
import Link from 'next/link';

const banner =
{
  title: "Crafting organic skincare for a radiant, healthy glow.",
  // title: "Unlocking Inner Brilliance: Enhance Your Aura with Our Collection",
  image: '/bg_edited.png'
};



// const sliders = [
//   // {
//   //   id: 1,
//   //   title: 'Unveiling Your Natural Beauty With Our Products',
//   //   image: '/f1.jpeg'
//   // },
//   {
//     id: 2,
//     title: "Crafting organic skincare for a radiant, healthy glow.",
//     // title: "Unlocking Inner Brilliance: Enhance Your Aura with Our Collection",
//     image: '/bg_edited.png'
//   },
//   // {
//   //   id: 3,
//   //   title: 'Elevating your Radiance: Empower your Glow with Our Formulas',
//   //   image: '/f3.jpeg'
//   // },
// ];

export default function SliderComponent() {
  return (
    <div className='flex flex-col h-[calc(100vh-4.0rem)] md:h-[calc(100vh-4rem)] lg:flex-row'>
      {/* Text Container */}
      <div className=" items-center flex justify-center flex-col gap-8 font-bold flex-1">
        <h1 className="text-3xl text-center uppercase p-4 md:p-10 md:text-4xl lg:text-5xl">{banner.title}</h1>
        <Link href={'/shop'} className='px-8 py-4 bg-slate-800 rounded-lg text-white'>Shop Now</Link>
      </div>
      {/* Image Container */}
      <div className=" w-full relative flex-1">
        <Image src={banner.image} alt='' fill className=' object-cover' sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
      </div>
    </div>
  );
}
