export type Products = {
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

// Use this for dummy products
// export type Products = {
//   id: string;
//   title: string;
//   slug: string;
//   price: number;
//   description: string;
//   category_id: string;
//   images: string;
// };

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: Date;
  updatedAt: Date;
}

export type CartItem = {
  product: Products;
  quantity: number;
};

export interface Users {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}
