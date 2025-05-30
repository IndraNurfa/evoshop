import { Category } from "@/types";
import axios from "axios";

const API_URL = "https://api.escuelajs.co/api/v1/categories";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchCategories = async (): Promise<Category[] | void> => {
  try {
    const response = await api.get("");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};
