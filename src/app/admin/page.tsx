import AdminDashboard from "@/components/admin/AdminDashboard";

// This is the number of seconds between revalidations
export const revalidate = 60; // Revalidate every 60 seconds

async function fetchProducts(page = 1) {
  const res = await fetch(`http://localhost:3000/api/products?page=${page}`, {
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const { data, pagination } = await res.json();
  return { products: data || [], pagination };
}

async function fetchCategories() {
  const res = await fetch("http://localhost:3000/api/categories", {
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const { data } = await res.json();
  return data || [];
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
