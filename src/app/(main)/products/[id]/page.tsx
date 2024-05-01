'use client';

import {Button} from '@/components/ui/button';
import {Product} from '@prisma/client';
import {useQuery} from '@tanstack/react-query';
import Image from 'next/image';
import {useState} from 'react';
import ProductLoading from './ProductLoading';
import {ArrowLeft} from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import {useRouter} from 'next/navigation';
import {CaretLeft} from '@phosphor-icons/react/dist/ssr/CaretLeft';
import {CaretRight} from '@phosphor-icons/react/dist/ssr/CaretRight';
import {GoDot, GoDotFill} from "react-icons/go";
import PriceComponent from '../_components/PriceComponent';
import DetailsCompenent from '../_components/DetailsCompenent';

export default function ProdutPage({params}: any) {
  const pid = params.id;
  const [activeImage, setActiveImage] = useState<number>(0);

  const router = useRouter();

  const {isLoading, error, data} = useQuery({
    queryKey: ['product'],
    queryFn: () =>
      fetch('/api/product/' + pid).then(res => res.json())
  });


  const prevSlide = () => {
    const isFirstSlide = activeImage === 0;
    const newIndex = isFirstSlide ? data.images.length - 1 : activeImage - 1;
    setActiveImage(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = activeImage === data.images.length - 1;
    const newIndex = isLastSlide ? 0 : activeImage + 1;
    setActiveImage(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setActiveImage(slideIndex);
  };


  if (isLoading) return <ProductLoading />;

  if (error) return 'No product found!';

  if (!data) return <div className='mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8'>No Product found!</div>;

  return (
    <div className='min-h-[calc(100vh-200px)] mx-auto max-w-2xl px-4 mb-8 sm:px-6  lg:max-w-7xl lg:px-8'>
      <div className="flex flex-col justify-between gap-4 lg:items-start">
        <Button variant='link' className='flex justify-start items-center p-0' onClick={() => router.back()}>
          <ArrowLeft size={18} weight="light" className='mr-2' /> <span className="text-gray-500">Back</span>
        </Button>
        <div className="">
          <p className="text-xs text-gray-500">{data.Category.name}</p>
          <h3 className="text-2xl font-medium text-gray-800">{data.name}</h3>
        </div>
        {/* MOBILE IMAGE DISPLAY */}
        <div className="block lg:hidden  flex-col justify-center items-center">
          <div className="relative flex aspect-square items-center justify-center duration-500 group">
            <div className="relative w-full h-auto rounded-2xl bg-center bg-cover duration-500">
              <Image
                src={data.images[activeImage]}
                alt=''
                width={600}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                height={400}
                className="h-full w-full object-cover rounded-xl "
              // fill
              />
            </div>
            {
              data.images.length > 1 && <>
                <div onClick={prevSlide} className="hidden group-hover:block absolute p-1 top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full  bg-black/20 hover:bg-black/50 text-white cursor-pointer">
                  <CaretLeft size={22} weight="light" />
                </div>
                <div onClick={nextSlide} className="hidden group-hover:block absolute p-1 top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full  bg-black/20 hover:bg-black/50 text-white cursor-pointer">
                  <CaretRight size={22} weight="light" />
                </div>
              </>
            }
          </div>
          {
            data.images.length > 1 &&
            <div className="flex top-4 justify-center py-2">
              {
                data.images.map((img: string, index: number) => (
                  <div className="text-xl cursor-pointer" key={index} onClick={() => goToSlide(index)}>
                    {
                      index === activeImage ?
                        <GoDotFill /> :
                        <GoDot />
                    }
                  </div>
                ))
              }
            </div>
          }
        </div>
        <div className="flex flex-row">

        </div>
        {/* DESKTOP IMAGE DISPLAY */}
        <div className="hidden lg:block w-full">
          <div className="flex flex-col">
            <div className="flex flex-row gap-6">
              <div className="flex flex-row gap-2 items-start justify-start basis-4/6">
                <div className="flex flex-row">
                  <div className="flex flex-col gap-4 w-[120px] h-[120px]">
                    {
                      data.images.map((p: Product, index: number) =>
                        <div className="relative w-[120px] h-[120px]" key={index}>
                          <Image src={data.images[index]}
                            // fill
                            width={120}
                            height={120}
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                            alt=''
                            style={{
                              objectFit: 'cover',
                              // width: '100%',
                              // height: 'auto',
                            }}
                            className='rounded-md cursor-pointer'
                            key={index} onClick={() => setActiveImage(index)}
                          />

                        </div>
                      )
                    }
                  </div>
                </div>
                <div className="relative w-full h-auto  aspect-h-1 aspect-w-1">
                  <Image
                    src={data.images[activeImage]}
                    alt=''
                    width={600}
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    height={400}
                    // fill
                    className="h-full w-full object-cover rounded-xl"
                  />
                </div>
              </div>

              <div className=" basis-2/6">
                <PriceComponent data={data} />
              </div>
            </div>
            <div className="flex w-2/3 mt-10">
              <DetailsCompenent data={data} />
            </div>
          </div>
        </div>
        <div className="block lg:hidden">
          <PriceComponent data={data} />
          <DetailsCompenent data={data} />
        </div>

      </div>
    </div>
  );
}
