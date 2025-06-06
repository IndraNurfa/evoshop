import { Products } from "@/types";
import axios from "axios";

const API_URL = "https://api.escuelajs.co/api/v1/products";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProducts = async (): Promise<Products[] | void> => {
  try {
    const response = await api.get("");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const fetchProductBySlug = async (
  slug: string,
): Promise<Products | null> => {
  try {
    const response = await api.get(`/slug/${slug}`);
    if (!response.data) return null;
    return response.data;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
};

export const fetchProductRelatedBySlug = async (
  slug: string,
): Promise<Products[] | null> => {
  try {
    const response = await api.get(`/slug/${slug}/related`);
    if (!response.data) return null;
    return response.data;
  } catch (error) {
    console.error("Error fetching related products:", error);
    return null;
  }
};
