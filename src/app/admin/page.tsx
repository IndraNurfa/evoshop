import AdminDashboard from "@/components/admin/AdminDashboard";

// This is the number of seconds between revalidations
export const revalidate = 60; // Revalidate every 60 seconds

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
        pagination: { currentPage: 1, totalPages: 1, totalItems: 0 },
      };
    }

    const { data, pagination } = await res.json();
    return { products: data || [], pagination };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      products: [],
      pagination: { currentPage: 1, totalPages: 1, totalItems: 0 },
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

    const { data } = await res.json();
    return data || [];
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
