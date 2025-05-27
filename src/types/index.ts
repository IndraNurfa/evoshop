export interface Products {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: Date;
  updatedAt: Date;
}

export type ProductCard = Omit<Products, "creationAt" | "updatedAt">;

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: Date;
  updatedAt: Date;
}

export interface Users {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}
