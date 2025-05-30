import AdminDashboard from "@/components/admin/AdminDashboard";

// This is the number of seconds between revalidations
export const revalidate = 60; // Revalidate every 60 seconds

async function fetchProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    next: { revalidate },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const { data } = await res.json();
  console.log("🚀 ~ fetchProducts ~ data:", data);
  return data || [];
}

async function fetchCategories() {
  const res = await fetch("http://localhost:3000/api/categories", {
    next: { revalidate },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const { data } = await res.json();
  console.log("🚀 ~ fetchCategories ~ data:", data);
  return data || [];
}

export default async function AdminPage() {
  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  return <AdminDashboard initialProducts={products} categories={categories} />;
}
