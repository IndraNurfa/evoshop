import { fetchProducts } from "@/app/services/products";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await fetchProducts();
    return NextResponse.json({ data: products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
