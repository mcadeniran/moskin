type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: Category;
};

type Category = {
  id: string;
  name: string;
  creationAt: string;
  updatedAt: string;
};
