"use client";

import { Category, Products } from "@/types";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface AddProductModalProps {
  categories: Category[];
  onAdd: (product: Products) => void;
  onClose: () => void;
}

export default function AddProductModal({
  categories,
  onAdd,
  onClose,
}: AddProductModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    description: "",
    categoryId: categories[0]?.id || "",
    images: [""],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    title?: string;
    price?: string;
    description?: string;
    images?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!formData.images[0]) {
      newErrors.images = "Image URL is required";
    } else {
      try {
        new URL(formData.images[0]);
      } catch (e) {
        console.log("Error add image URL", e);
        newErrors.images = "Please enter a valid URL";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Find the selected category object based on categoryId
      const selectedCategory =
        categories.find((c) => c.id === Number(formData.categoryId)) ||
        categories[0];

      // Create the slug from title
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric chars with dash
        .replace(/(^-|-$)/g, ""); // Remove leading/trailing dashes

      // Create the new product object
      const newProduct: Products = {
        id: 0, // Will be assigned by the server
        title: formData.title,
        slug: slug,
        price: Number(formData.price),
        description: formData.description,
        category: selectedCategory,
        images: formData.images,
        creationAt: new Date(),
        updatedAt: new Date(),
      };

      onAdd(newProduct);
      toast.success("Product created successfully!");
      onClose();
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
          Add New Product
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
              className={`w-full rounded-md border ${errors.title ? "border-red-500" : "border-[#cbd5e1]"} bg-white px-3 py-2 text-[#0f172a] focus:ring-1 focus:ring-[#0f172a] focus:outline-none dark:border-[#475569] dark:bg-[#0f172a] dark:text-[#f1f5f9] dark:focus:ring-[#94a3b8]`}
              id="productTitle"
              name="title"
              required
              type="text"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                if (errors.title) setErrors({ ...errors, title: undefined });
              }}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block font-semibold" htmlFor="productPrice">
              Price
            </label>
            <input
              className={`w-full rounded-md border ${errors.price ? "border-red-500" : "border-[#cbd5e1]"} bg-white px-3 py-2 text-[#0f172a] focus:ring-1 focus:ring-[#0f172a] focus:outline-none dark:border-[#475569] dark:bg-[#0f172a] dark:text-[#f1f5f9] dark:focus:ring-[#94a3b8]`}
              id="productPrice"
              name="price"
              required
              type="number"
              min="1"
              value={formData.price}
              onChange={(e) => {
                setFormData({ ...formData, price: parseFloat(e.target.value) });
                if (errors.price) setErrors({ ...errors, price: undefined });
              }}
            />
            {errors.price && (
              <p className="mt-1 text-xs text-red-500">{errors.price}</p>
            )}
          </div>

          <div>
            <label
              className="mb-1 block font-semibold"
              htmlFor="productDescription"
            >
              Description
            </label>
            <textarea
              className={`w-full rounded-md border ${errors.description ? "border-red-500" : "border-[#cbd5e1]"} bg-white px-3 py-2 text-[#0f172a] focus:ring-1 focus:ring-[#0f172a] focus:outline-none dark:border-[#475569] dark:bg-[#0f172a] dark:text-[#f1f5f9] dark:focus:ring-[#94a3b8]`}
              id="productDescription"
              name="description"
              required
              rows={3}
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                if (errors.description)
                  setErrors({ ...errors, description: undefined });
              }}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">{errors.description}</p>
            )}
          </div>

          <div>
            <label
              className="mb-1 block font-semibold"
              htmlFor="productCategory"
            >
              Category
            </label>
            <select
              className="w-full rounded-md border border-[#cbd5e1] bg-white px-3 py-2 text-[#0f172a] focus:ring-1 focus:ring-[#0f172a] focus:outline-none dark:border-[#475569] dark:bg-[#0f172a] dark:text-[#f1f5f9] dark:focus:ring-[#94a3b8]"
              id="productCategory"
              name="categoryId"
              required
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block font-semibold" htmlFor="productImage">
              Image URL
            </label>
            <input
              className={`w-full rounded-md border ${errors.images ? "border-red-500" : "border-[#cbd5e1]"} bg-white px-3 py-2 text-[#0f172a] focus:ring-1 focus:ring-[#0f172a] focus:outline-none dark:border-[#475569] dark:bg-[#0f172a] dark:text-[#f1f5f9] dark:focus:ring-[#94a3b8]`}
              id="productImage"
              name="image"
              required
              type="url"
              placeholder="https://example.com/image.jpg"
              value={formData.images[0]}
              onChange={(e) => {
                setFormData({ ...formData, images: [e.target.value] });
                if (errors.images) setErrors({ ...errors, images: undefined });
              }}
            />
            {errors.images && (
              <p className="mt-1 text-xs text-red-500">{errors.images}</p>
            )}
          </div>

          <div className="!mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`rounded-md px-4 py-2 font-medium text-white ${
                isSubmitting
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-[#0f172a] hover:bg-[#1e293b] dark:bg-[#1e293b] dark:hover:bg-[#0f172a]"
              }`}
            >
              {isSubmitting ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
