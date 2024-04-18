type CategoryType = {
  id: string;
  name: string;
  creationAt: string;
  updatedAt: string;
};

type ProductType = {
  id: string;
  name: string;
  price: number;
  images: string[];
  onSale: boolean;
  off: number;
  features: string;
  ingredients: string;
  display: boolean;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  description: string;
  isFeatured: boolean;
};

type CartItemType = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type CartType = {
  products: CartItemType[];
  totalItems: number;
  totalPrice: number;
};

type ActionTypes = {
  addToCart: (item: CartItemType) => void;
  removeFromCart: (item: CartItemType) => void;
};
