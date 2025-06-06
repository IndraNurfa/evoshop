import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://api.escuelajs.co/api/v1/products";
const ITEMS_PER_PAGE = 10;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") ?? "1");
    const offset = (page - 1) * ITEMS_PER_PAGE;

    const [productsResponse, totalResponse] = await Promise.all([
      api.get(`?offset=${offset}&limit=${ITEMS_PER_PAGE}`),
      api.get(""),
    ]);

    const totalItems = totalResponse.data.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    return NextResponse.json(
      {
        data: productsResponse.data,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems,
          itemsPerPage: ITEMS_PER_PAGE,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const response = await api.post("", res);
    return NextResponse.json({ data: response.data }, { status: 201 });
  } catch (error) {
    console.error("Error update product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}
