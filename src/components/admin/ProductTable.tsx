/* eslint-disable @next/next/no-img-element */
"use client";

import { Products, PaginationInfo } from "@/types";
import { FC } from "react";
import { formatPrice } from "../../utils/utils";

interface ProductTableProps {
  products: Products[];
  onEdit: (product: Products) => void;
  pagination: PaginationInfo;
  loading: boolean;
  onPageChange: (page: number) => void;
}

const ProductTable: FC<ProductTableProps> = ({
  products,
  onEdit,
  pagination,
  loading,
  onPageChange,
}) => {
  const renderPageButtons = () => {
    const buttons = [];
    const { currentPage, totalPages } = pagination;

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className="rounded-md px-3 py-1 text-sm font-medium disabled:opacity-50"
      >
        Previous
      </button>,
    );

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          disabled={i === currentPage || loading}
          className={`rounded-md px-3 py-1 text-sm font-medium ${
            i === currentPage
              ? "bg-blue-600 text-white dark:bg-blue-500"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          {i}
        </button>,
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        className="rounded-md px-3 py-1 text-sm font-medium disabled:opacity-50"
      >
        Next
      </button>,
    );

    return buttons;
  };
  return (
    <section className="my-auto flex h-[calc(100vh-10rem)] flex-col px-8">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="rounded-t-lg bg-[#f9fafb] py-2 dark:bg-[#0f172a]">
          <table className="w-full table-fixed">
            <thead className="border-b border-gray-200 font-semibold text-[#94a3b8] select-none dark:border-gray-700 dark:text-[#64748b]">
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
        <div className="flex-1 overflow-auto bg-[#f9fafb] dark:bg-[#0f172a]">
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
      </div>
      {/* Pagination Footer */}
      <div className="rounded-b-lg border-t border-gray-200 bg-[#f9fafb] py-4 dark:border-gray-700 dark:bg-[#0f172a]">
        <div className="flex items-center justify-center gap-2">
          {renderPageButtons()}
        </div>
      </div>
    </section>
  );
};

export default ProductTable;
