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

type CartItem = {
  id: string;
  name: string;
  quantity: number;
  image: string;
  price: number;
};

type ShippingAddress = {
  fullName: string;
  house: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};
