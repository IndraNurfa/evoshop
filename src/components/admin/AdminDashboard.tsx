"use client";

import { Category, Products } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import ProductTable from "./ProductTable";
import Sidebar from "./Sidebar";

interface AdminDashboardProps {
  initialProducts: Products[];
  categories: Category[];
}

export default function AdminDashboard({
  initialProducts,
  categories,
}: AdminDashboardProps) {
  const [products, setProducts] = useState<Products[]>(initialProducts);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Products | null>(null);

  const handleEdit = (product: Products) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };
  const handleSave = async (updatedProduct: Products) => {
    try {
      // Optimistic update
      setProducts(
        products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
      );
      setIsEditModalOpen(false);
      setEditingProduct(null);

      // Server update
      const response = await fetch(`/api/products/${updatedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      toast.success("Product update successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      // Revert optimistic update on error
      setProducts(products);
      toast.error("Failed to update product. Please try again.");
    }
  };

  const handleDelete = async (productId: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (isConfirmed) {
      const previousProducts = [...products];
      try {
        // Optimistic update
        setProducts(products.filter((p) => p.id.toString() !== productId));
        setIsEditModalOpen(false);
        setEditingProduct(null);

        // Server update
        const response = await fetch(`/api/products/${productId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete product");
        }
        toast.success("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
        // Revert optimistic update on error
        setProducts(previousProducts);
        toast.error("Failed to delete product. Please try again.");
      }
    }
  };

  const handleAdd = async (newProduct: Products) => {
    try {
      // Server update first for new items to get the real ID
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newProduct.title,
          price: newProduct.price,
          description: newProduct.description,
          categoryId: newProduct.category.id,
          images: newProduct.images,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const { data: addedProduct } = await response.json();
      if (!addedProduct) {
        throw new Error("No data received from server");
      }

      setProducts([...products, addedProduct]);
      setIsAddModalOpen(false);
      toast.success("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="flex overflow-hidden bg-white shadow-[0_0_20px_rgba(15,23,42,0.15)] transition-colors duration-300 dark:bg-[#15233c] dark:shadow-[0_0_20px_rgba(71,85,105,0.3)]">
      <Sidebar />

      {/* Main content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <section className="flex items-center justify-between border-b border-[#e2e8f0] px-8 py-6 dark:border-[#475569]">
          <h1 className="text-2xl font-extrabold text-[#0f172a] dark:text-[#f1f5f9]">
            Products
          </h1>
          <button
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            onClick={() => setIsAddModalOpen(true)}
          >
            Create New Product
          </button>
        </section>

        <ProductTable products={products} onEdit={handleEdit} />
      </main>

      {/* Add Modal */}
      {isAddModalOpen && (
        <AddProductModal
          onAdd={handleAdd}
          categories={categories}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
      {isEditModalOpen && editingProduct && (
        <EditProductModal
          product={editingProduct}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
}
