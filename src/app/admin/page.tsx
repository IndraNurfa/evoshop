import AdminDashboard from "@/components/admin/AdminDashboard";
import type { PaginationInfo } from "@/types";

// This is the number of seconds between revalidations
export const revalidate = 60; // Revalidate every 60 seconds

const defaultPagination: PaginationInfo = {
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
};

async function fetchProducts(page = 1) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.NEXTAUTH_URL ||
      "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/products?page=${page}`, {
      next: { revalidate },
    });

    if (!res.ok) {
      console.error("Failed to fetch products:", res.status, res.statusText);
      return {
        products: [],
        pagination: defaultPagination,
      };
    }

    const json = await res.json();
    return {
      products: json.data || [],
      pagination: json.pagination || defaultPagination,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      products: [],
      pagination: defaultPagination,
    };
  }
}

async function fetchCategories() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.NEXTAUTH_URL ||
      "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/categories`, {
      next: { revalidate },
    });

    if (!res.ok) {
      console.error("Failed to fetch categories:", res.status, res.statusText);
      return [];
    }

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function AdminPage() {
  const [{ products, pagination }, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  return (
    <AdminDashboard
      initialProducts={products}
      categories={categories}
      initialPagination={pagination}
    />
  );
}
