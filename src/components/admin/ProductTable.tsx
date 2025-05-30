/* eslint-disable @next/next/no-img-element */
"use client";

import { Products } from "@/types";
import { FC } from "react";
import { formatPrice } from "../../utils/utils";

interface ProductTableProps {
  products: Products[];
  onEdit: (product: Products) => void;
}

const ProductTable: FC<ProductTableProps> = ({ products, onEdit }) => {
  return (
    <section className="relative h-[calc(100vh-10rem)] px-8 py-4">
      {/* Sticky Header */}
      <div className="absolute inset-x-8 top-4 z-10 bg-[#f9fafb] pb-2 dark:bg-[#0f172a]">
        <table className="w-full table-fixed">
          <thead className="font-semibold text-[#94a3b8] select-none dark:text-[#64748b]">
            <tr>
              <th className="w-32 px-4 py-3 text-center">ID</th>
              <th className="w-80 px-4 py-3 text-left">Product</th>
              <th className="w-32 px-4 py-3 text-center">Price</th>
              <th className="w-48 px-4 py-3 text-center">Category</th>
              <th className="w-32 px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Scrollable Content */}
      <div className="h-full overflow-auto pt-14">
        <table className="w-full table-fixed border-separate border-spacing-y-2 text-xs text-[#475569] dark:text-[#94a3b8]">
          <tbody className="font-medium text-[#334155] dark:text-[#f1f5f9]">
            {products.map((product) => (
              <tr
                key={product.id}
                className="rounded-lg bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-md dark:bg-[#1e293b] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3)] dark:hover:shadow-lg"
              >
                <td className="w-32 px-4 py-4 text-center">#{product.id}</td>
                <td className="w-80 px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      alt={`Image of ${product.title}`}
                      className="h-10 w-10 rounded-md object-cover"
                      height="40"
                      width="40"
                      src={product.images[0]}
                      loading="lazy"
                    />
                    <span className="truncate">{product.title}</span>
                  </div>
                </td>
                <td className="w-32 px-4 py-4 text-center font-semibold">
                  {formatPrice(product.price)}
                </td>
                <td className="w-48 px-4 py-4 text-center">
                  {product.category.name}
                </td>
                <td className="w-32 px-4 py-4 text-center">
                  <button
                    onClick={() => onEdit(product)}
                    className="font-semibold text-[#0f172a] hover:text-[#1e293b] dark:text-[#f1f5f9] dark:hover:text-[#94a3b8]"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProductTable;
