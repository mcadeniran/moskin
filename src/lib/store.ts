import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Cart = {
  items: CartItem[];
  totalPrice: number;
  paymentMethod: string;
  deliveryAddress: ShippingAddress;
};

const initialState: Cart = {
  items: [],
  totalPrice: 0,
  paymentMethod: 'Online',
  deliveryAddress: {
    fullName: '',
    house: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  },
};

export const cartStore = create<Cart>()(
  persist(() => initialState, {
    name: 'cartStore',
  })
);

export default function useCartStore() {
  const { items, totalPrice, paymentMethod, deliveryAddress } = cartStore();
  return {
    items,
    totalPrice,
    paymentMethod,
    deliveryAddress,
    increase: (item: CartItem) => {
      const exist = items.find((x) => x.id === item.id);
      const updatedCartItems = exist
        ? items.map((x) =>
            x.id === item.id ? { ...exist, quantity: exist.quantity + 1 } : x
          )
        : [...items, { ...item, quantity: 1 }];
      const totalPrice = calcPrice(updatedCartItems);
      cartStore.setState({
        items: updatedCartItems,
        totalPrice,
      });
    },
    decrease: (item: CartItem) => {
      const exist = items.find((x) => x.id === item.id);
      if (!exist) return;

      const updatedCartItem =
        exist.quantity === 1
          ? items.filter((x: CartItem) => x.id !== item.id)
          : items.map((x) =>
              item.id === x.id ? { ...exist, quantity: exist.quantity - 1 } : x
            );
      const totalPrice = calcPrice(updatedCartItem);
      cartStore.setState({
        items: updatedCartItem,
        totalPrice,
      });
    },
    saveDeliveryAddress: (deliveryAddress: ShippingAddress) => {
      cartStore.setState({
        deliveryAddress,
      });
    },
    savePaymentMethod: (paymentMethod: string) => {
      cartStore.setState({
        paymentMethod,
      });
    },
    clear: () => {
      cartStore.setState({
        items: [],
        totalPrice: 0,
        paymentMethod: '',
        deliveryAddress: undefined,
      });
    },
  };
}

const calcPrice = (items: CartItem[]) => {
  const itemsPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return itemsPrice;
};
