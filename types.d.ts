type Category = {
  id: string;
  name: string;
  creationAt: string;
  updatedAt: string;
};

type Product = {
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
