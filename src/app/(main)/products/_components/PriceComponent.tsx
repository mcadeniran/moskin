import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import useCartStore from '@/lib/store';
import {Product} from '@prisma/client';
import {Plus} from '@phosphor-icons/react/dist/ssr/Plus';
import {Minus} from '@phosphor-icons/react/dist/ssr/Minus';
import React, {useEffect, useState} from 'react';
import {toast} from 'sonner';

interface ProductProp {
  data: Product;
}

const PriceComponent = ({data}: ProductProp) => {
  const {items, increase, decrease} = useCartStore();

  const [existItem, setExistItem] = useState<CartItem | undefined>();

  useEffect(() => {
    setExistItem(items.find((x) => x.id === data.id));
  }, [data, items]);

  const handleCartAdd = () => {
    increase({
      id: data.id, name: data.name,
      quantity: 0,
      image: data.images[0],
      price: data.onSale ? (data.price * (1 - (data.off! / 100))) : data.price,
    });
    toast.success('Product added to cart.');
  };

  return (
    <div className="flex flex-col items-start justify-start mt-4 gap-2 w-full">
      {data.onSale === false &&
        <p className=' font-medium text-gray-800 text-lg'>
          ₦{data.price.toLocaleString()}
        </p>
      }
      {
        data.onSale === true &&
        <div className="flex gap-2 items-center ">
          <p className='text-xs xl:text-sm 2xl:text-base font-light text-gray-500  line-through'>
            ₦{data.price.toLocaleString()}
          </p>
          <p className=' font-medium text-gray-800 text-lg'>
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
      <div className="flex flex-col w-full mt-2">
        <p className="text-xs text-gray-400 italic">Quantity</p>
        <div className="flex justify-start items-start">
          <div className="flex flex-row justify-center items-center gap-2 mt-2">
            <div className='text-center text-xs font-light  w-24 border rounded-2xl py-2 '>{existItem ? existItem.quantity : '0'}</div>
            <div
              onClick={!existItem ? () => {} : () => decrease(existItem)}
              className="text-center text-xs font-light cursor-pointer h-8 w-8  flex border rounded-full items-center justify-center">
              <Minus size={18} weight="light" />
            </div>
            <div
              onClick={!existItem ? handleCartAdd : () => increase(existItem)}
              className="text-center text-xs font-light cursor-pointer h-8 w-8  flex border rounded-full items-center justify-center">
              <Plus size={18} weight="light" />
            </div>
          </div>
        </div>
        <div className="flex mt-4">
          <Button className='py-2 w-full  bg-slate-800'
            onClick={existItem ? () => increase(existItem) : handleCartAdd}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PriceComponent;