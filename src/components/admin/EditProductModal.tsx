"use client";

import { Products } from "@/types";
import { useState } from "react";

interface EditProductModalProps {
  product: Products;
  onSave: (product: Products) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export default function EditProductModal({
  product,
  onSave,
  onDelete,
  onClose,
}: EditProductModalProps) {
  const [formData, setFormData] = useState(product);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-[360px] max-w-full rounded-md bg-white p-6 shadow-lg transition-colors duration-300 dark:bg-[#15233c]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-lg font-bold text-gray-500 hover:text-gray-700 dark:text-[#94a3b8] dark:hover:text-white"
        >
          ×
        </button>
        <h2 className="mb-4 text-lg font-semibold text-[#0f172a] dark:text-[#f1f5f9]">
          Edit Product
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-sm text-[#475569] dark:text-[#94a3b8]"
        >
          <div>
            <label className="mb-1 block font-semibold" htmlFor="productTitle">
              Title
            </label>
            <input
              className="w-full rounded-md border border-[#cbd5e1] bg-white px-3 py-2 text-[#0f172a] focus:ring-1 focus:ring-[#0f172a] focus:outline-none dark:border-[#475569] dark:bg-[#0f172a] dark:text-[#f1f5f9] dark:focus:ring-[#94a3b8]"
              id="productTitle"
              name="title"
              required
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div>
            <label className="mb-1 block font-semibold" htmlFor="productPrice">
              Price
            </label>
            <input
              className="w-full rounded-md border border-[#cbd5e1] bg-white px-3 py-2 text-[#0f172a] focus:ring-1 focus:ring-[#0f172a] focus:outline-none dark:border-[#475569] dark:bg-[#0f172a] dark:text-[#f1f5f9] dark:focus:ring-[#94a3b8]"
              id="productPrice"
              name="price"
              required
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseFloat(e.target.value) })
              }
            />
          </div>
          <div>
            <label
              className="mb-1 block font-semibold"
              htmlFor="productCategory"
            >
              Category
            </label>
            <input
              className="w-full rounded-md border border-[#cbd5e1] bg-white px-3 py-2 text-[#0f172a] focus:ring-1 focus:ring-[#0f172a] focus:outline-none dark:border-[#475569] dark:bg-[#0f172a] dark:text-[#f1f5f9] dark:focus:ring-[#94a3b8]"
              id="productCategory"
              name="category"
              type="text"
              value={formData.category.name}
              disabled
            />
          </div>
          <div>
            <label
              className="mb-1 block font-semibold"
              htmlFor="productDescription"
            >
              Description
            </label>
            <textarea
              className="w-full rounded-md border border-[#cbd5e1] bg-white px-3 py-2 text-[#0f172a] focus:ring-1 focus:ring-[#0f172a] focus:outline-none dark:border-[#475569] dark:bg-[#0f172a] dark:text-[#f1f5f9] dark:focus:ring-[#94a3b8]"
              id="productDescription"
              name="description"
              required
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div>
            <label className="mb-1 block font-semibold" htmlFor="productImage">
              Image URL
            </label>
            <input
              className="w-full rounded-md border border-[#cbd5e1] bg-white px-3 py-2 text-[#0f172a] focus:ring-1 focus:ring-[#0f172a] focus:outline-none dark:border-[#475569] dark:bg-[#0f172a] dark:text-[#f1f5f9] dark:focus:ring-[#94a3b8]"
              id="productImage"
              name="images"
              type="url"
              required
              value={formData.images[0]}
              onChange={(e) =>
                setFormData({ ...formData, images: [e.target.value] })
              }
            />
          </div>
          <div className="!mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => onDelete(product.id.toString())}
              className="rounded-md bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
            >
              Delete
            </button>
            <button
              type="submit"
              className="rounded-md bg-[#0f172a] px-4 py-2 font-medium text-white hover:bg-[#1e293b] dark:bg-[#1e293b] dark:hover:bg-[#0f172a]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
