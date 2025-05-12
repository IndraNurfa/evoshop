import { Products } from "@/types";
import axios from "axios";

const API_URL = "https://api.escuelajs.co/api/v1/products";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProducts = async (): Promise<Products[]> => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

export const fetchProductBySlug = async (slug: string): Promise<Products> => {
  try {
    const response = await api.get(`/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

export const fetchProductRelatedBySlug = async (slug: string): Promise<Products[]> => {
  try {
    const response = await api.get(`/slug/${slug}/related`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};
