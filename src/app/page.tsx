'use client';
import Image from 'next/image';
import ad from '/public/ad.jpg';
import smooth from '/public/smooth.jpg';
import natural from '/public/natural.png';
import organic from '/public/organic.png';
import cruelty from '/public/cruelty.png';
import userAvatar from '/public/avatar2.jpg';
import avatar2 from '/public/avatar2 copy.jpg';
import avatar from '/public/avatar.jpg';

import {Icon} from '@iconify/react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import FooterSection from '@/components/layout/Footer';

const reasons = [
  {
    icon: 'ic:outline-color-lens',
    title: 'Unique Design',
    description:
      'We understand that navigating the beauty world can be over whelming at times.',
  },
  {
    icon: 'game-icons:thumb-up',
    title: 'Quality Products',
    description:
      'Our dedicated customer support team is always available to assist you with any queries, concerns.',
  },
  {
    icon: 'ion:pricetags-outline',
    title: 'Affordable Prices',
    description:
      'We understand that navigating the beauty world can be over whelming at times.',
  },
  {
    icon: 'carbon:delivery-parcel',
    title: 'Fast Delivery',
    description:
      'Our dedicated customer support team is always available to assist you with any queries, concerns.',
  },
];

const benefits = [
  {
    image: natural,
    title: 'Natural Ingredients',
    alt: 'Natural Ingredients',
    details:
      'Our products are made from one hundred percent natural ingredients which make them safe for all your skin types',
  },
  {
    image: organic,
    title: 'Organic Product',
    alt: 'Organic Product',
    details:
      'Our organic products are able to ensure all the quanlities, without chemicals making them also more environmental friendly',
  },
  {
    image: cruelty,
    title: 'Cruelty Free',
    alt: 'Cruelty Free',
    details:
      'We always carry out cruelty free procedures to eliminate violence during the process of making our products',
  },
];

const testimonials = [
  {
    author: 'Viona Diamanta',
    image: avatar,
    alt: 'Viona Diamanta',
    handle: '@vionadiaman',
    details:
      'MOS is a product that I highly recommend. High quality raw materials make MOS produts produce results quickly. Really satisfying beauty product',
  },
  {
    author: 'Dalinda Matilda',
    image: avatar2,
    alt: 'Dalinda Matilda',
    handle: '@itsdalinda',
    details:
      "I've never come across a beauty product as good as MOS!! I have tried various beauty products for years, but nothing is as good as MOS. Thank you MOS!!",
  },
  {
    author: 'Sasha Dravenska',
    image: userAvatar,
    alt: 'Sasha Dravenska',
    handle: '@Dravshaaa_',
    details:
      'I am very satisfied with products from MOS, the ingredients used are very good and they suit my skin very well. I recommend thier products to my friends!!',
  },
];

export default function Home() {
  return (
    <main>
      <Header />
      <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
        <div className='flex items-center flex-col gap-4 md:grid md:grid-cols-2 md:gap-10'>
          <div className='mt-8 sm:mt-24 md:mt-32'>
            <h3 className='text-2xl sm:text-4xl md:text-6xl font-bold  text-center md:text-left'>
              Unveiling Your Natural Beauty With Our Products
            </h3>
            <p className='text-center px-4 sm:px-0 md:text-left text-sm sm:text-xl mt-12 text-gray-700 font-light '>
              Our products embodies the essence of beauty, elegance, and
              transformation. It is a symbol that encapsulates our {"brand's"}{' '}
              commitment to enhancing natural beauty and empowering individuals
              to express themselves confidently.
            </p>
            <div className='flex justify-center md:justify-start mt-8'>
              <Link
                href={'/shop'}
                className='border bg-primary border-primary rounded-full py-2 px-4'
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className='-mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden'>
            <Image
              src={ad}
              alt='User Avatar'
              sizes='100vw'
              style={{
                width: '100%',
                height: 'auto',
              }}
              className='rounded-xl'
            />
          </div>
        </div>
        <div className='mt-8'>
          <p className='text-primary text-xl md:text-4xl text-center'>
            Benefits
          </p>
          <div className='flex justify-center mt-6'>
            <p className='text-center w-96 text-gray-500'>
              Our plant-based ingredients are great options for acheiving health
              and glowing skin.
            </p>
          </div>
          <div className='grid md:grid-cols-3 mt-8 gap-4'>
            {benefits.map((b) => (
              <div
                className='bg-gray-100  rounded-xl  p-4'
                key={b.title}
              >
                <Image
                  src={b.image}
                  alt={b.alt}
                  height={40}
                  width={40}
                  className='bg-transparent'
                />
                <p className='mt-4 text-base md:text-lg text-gray-700'>
                  {b.title}
                </p>
                <p className='mt-4 text-xs md:text-sm text-gray-400 font-light'>
                  {b.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-16'>
          <p className='text-xl sm:text-2xl md:text-4xl font-semibold  text-center mb-12'>
            Embrace the Magic of MOS
          </p>
          <div className='flex flex-col md:grid md:grid-cols-2 md:gap-4'>
            <div className=' -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden'>
              <Image
                src={smooth}
                alt='User Avatar'
                sizes='100vw'
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                className='rounded-xl '
              />
            </div>

            <div className=''>
              {reasons.map((r) => (
                <div
                  className='flex flex-row gap-4 pb-8 sm:pb-12 px-4'
                  key={r.title}
                >
                  <div className='flex items-center border rounded-xl  h-16 w-16 bg-gray-300 p-4'>
                    <Icon
                      icon={r.icon}
                      style={{fontSize: '20px', color: '##d3d3d3'}}
                    />
                  </div>
                  <div className='flex flex-col grow'>
                    <h3 className='font-semibold text-sm sm:text-xl md:text-2xl text-gray-700'>
                      {r.title}
                    </h3>
                    <p className='text-sm md:text-base sm:text-xl mt-1 text-gray-400  font-light'>
                      {r.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='mt-16 bg-gray-200 p-8'>
          <p className='text-primary text-xl md:text-4xl text-center'>
            Testimonials
          </p>
          <div className='mt-4 grid md:grid-cols-2'>
            <div className='flex grow'>
              <p className='text-lg font-light text-black w-auto'>
                See what others are saying about the transaformative benefits of
                our natural ingredients
              </p>
            </div>
            <div className='flex justify-end'>
              <a href='#'>
                <span className=' hover:underline hover:text-primary cursor-pointer'>
                  View all
                </span>
              </a>{' '}
            </div>
          </div>
          <div className='mt-6 grid md:grid-cols-3 gap-4'>
            {testimonials.map((t) => (
              <div
                key={t.alt}
                className='bg-gray-100 p-6 rounded-md flex flex-col items-center'
              >
                <p className='text-center font-extralight text-xs text-gray-700'>
                  {t.details}
                </p>
                <Image
                  src={t.image}
                  alt={t.alt}
                  className='rounded-full mt-4 h-12 w-12 md:h-16 md:w-16 object-cover'
                />
                <p className='mt-4 font-light text-sm'>{t.author}</p>
                <p className='mt-2 text-xs font-extralight text-gray-400'>
                  {t.handle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FooterSection />
    </main>
  );
}
