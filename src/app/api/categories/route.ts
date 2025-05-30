import axios from "axios";
import { NextResponse } from "next/server";

const API_URL = "https://api.escuelajs.co/api/v1/categories";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function GET() {
  try {
    const products = await api.get("");
    return NextResponse.json({ data: products.data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
