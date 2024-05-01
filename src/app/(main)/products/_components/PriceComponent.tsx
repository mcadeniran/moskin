import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {useCartStore} from '@/lib/store';
import {Product} from '@prisma/client';
import {Plus} from '@phosphor-icons/react/dist/ssr/Plus';
import {Minus} from '@phosphor-icons/react/dist/ssr/Minus';
import React, {useEffect, useState} from 'react';
import {toast} from 'sonner';

interface ProductProp {
  data: Product;
}

const PriceComponent = ({data}: ProductProp) => {
  const [quantity, setQuantity] = useState(1);
  const {addToCart} = useCartStore();
  useEffect(() => {

    useCartStore.persist.rehydrate();

  }, []);
  const handleCartAdd = () => {
    addToCart({
      id: data.id,
      name: data.name,
      image: data.images[0],
      price: data.price,
      quantity: quantity,
    });
    toast.success('Product added to cart.');
  };

  return (
    <div className="flex flex-col items-start justify-start gap-4">
      {data.onSale === false &&
        <p className=' font-medium text-gray-800 text-2xl'>
          ₦{data.price.toLocaleString()}
        </p>
      }
      {
        data.onSale === true &&
        <div className="flex gap-2 items-center ">
          <p className='text-xs xl:text-sm 2xl:text-base font-light text-gray-500  line-through'>
            ₦{data.price.toLocaleString()}
          </p>
          <p className=' font-medium text-gray-800 text-2xl'>
            ₦{(data.price - (data.price * (data.off! / 100))).toLocaleString()}
          </p>
        </div>
      }
      <div className="flex flex-col mt-2">
        <p className="text-xs text-gray-400 italic">Size</p>
        <div className="flex flex-row gap-2 mt-2">
          <Badge className='text-xs font-light cursor-pointer' variant='outline'>50 ml</Badge>
          <Badge className='text-xs font-light cursor-pointer' >100 ml</Badge>
          <Badge className='text-xs font-light cursor-pointer' variant='outline'>200 ml</Badge>
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <p className="text-xs text-gray-400 italic">Quantity</p>
        <div className="flex flex-row justify-center items-center gap-2 mt-2">
          <div className='text-center text-xs font-light  w-24 border rounded-2xl py-2 '>{quantity}</div>
          <div
            onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            className="text-center text-xs font-light cursor-pointer h-8 w-8  flex border rounded-full items-center justify-center">
            <Minus size={18} weight="light" />
          </div>
          <div
            onClick={() => setQuantity((prev) => prev + 1)}
            className="text-center text-xs font-light cursor-pointer h-8 w-8  flex border rounded-full items-center justify-center">
            <Plus size={18} weight="light" />
          </div>
        </div>
      </div>
      <div className="flex w-full mt-4">
        <Button className='py-2 w-full  bg-slate-800'
          onClick={handleCartAdd}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default PriceComponent;