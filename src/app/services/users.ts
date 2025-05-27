import { Users } from "@/types";
import axios, { AxiosError } from "axios";

const API_URL = "https://api.escuelajs.co/api/v1/users";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchUsers = async (): Promise<Users[] | void> => {
  try {
    const response = await api.get("");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  avatar: string = "https://i.pravatar.cc/300",
): Promise<{ user?: Users; error?: string }> => {
  try {
    const response = await api.post("", {
      name,
      email,
      password,
      avatar,
    });
    return { user: response.data };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during registration";
      return { error: errorMessage };
    }

    return { error: "An unexpected error occurred" };
  }
};
