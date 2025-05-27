/* eslint-disable @next/next/no-img-element */
"use client";
import { Products } from "@/types";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ModalImage from "react-modal-image";

interface ProductDetailProps {
  products: Products;
}

export function ProductDetail({ products }: ProductDetailProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const pricePerUnit = products.price;
  const maxStock = 5;
  const imagesLength = products.images.length;

  const updateMainImage = (index: number) => {
    if (index < 0) {
      setCurrentIndex(imagesLength - 1);
    } else if (index >= imagesLength) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(index);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < maxStock) {
      setQuantity(quantity + 1);
    }
  };

  const formatPrice = (num: number) => {
    return "$ " + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <main className="mx-auto mt-25 flex max-w-7xl flex-col gap-6 p-4 md:p-6 lg:flex-row lg:p-8">
        {/* Left column: Carousel */}
        <section className="flex w-full max-w-[400px] flex-col gap-3 select-none">
          <div className="group relative overflow-hidden rounded-xl">
            <ModalImage
              small={products.images[currentIndex]}
              medium={products.images[currentIndex]}
              large={products.images[currentIndex]}
              alt={products.title}
              hideDownload={true}
              imageBackgroundColor="transparent"
            />
            <button
              aria-label="Previous slide"
              className="bg-opacity-40 hover:bg-opacity-70 absolute top-1/2 left-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              onClick={() => updateMainImage(currentIndex - 1)}
              type="button"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="fa-fw" />
            </button>
            <button
              aria-label="Next slide"
              className="bg-opacity-40 hover:bg-opacity-70 absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              onClick={() => updateMainImage(currentIndex + 1)}
              type="button"
            >
              <FontAwesomeIcon icon={faArrowRight} className="fa-fw" />
            </button>
          </div>
          <div className="scrollbar-hide flex gap-2 overflow-x-auto">
            {products.images.map((image, index) => (
              <button
                key={index}
                aria-label={`Thumbnail ${index + 1}`}
                className={`h-16 w-16 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border ${
                  index === currentIndex
                    ? "border-green-600"
                    : "border-gray-300"
                }`}
                onClick={() => updateMainImage(index)}
                type="button"
              >
                <img
                  alt={products.title}
                  className="h-full w-full object-cover"
                  height="64"
                  src={image}
                  width="64"
                />
              </button>
            ))}
          </div>
        </section>

        {/* Middle column: Product details */}
        <section className="flex max-w-3xl flex-1 flex-col gap-4">
          <h1 className="text-lg leading-tight font-extrabold md:text-xl">
            {products.title}
          </h1>
          <p className="text-2xl font-extrabold md:text-3xl">
            {formatPrice(pricePerUnit)}
          </p>

          <hr className="my-4 border-gray-300" />
          <nav className="flex gap-8 text-sm font-semibold text-gray-500 md:text-base">
            <span className="border-b-2 border-green-600 pb-1 text-green-600">
              Detail
            </span>
          </nav>
          <div className="mt-4 space-y-2 text-sm text-gray-800 md:text-base dark:text-gray-400">
            <p>{products.description}</p>
          </div>
        </section>

        {/* Right column: Purchase box */}
        <aside
          aria-label="Purchase options"
          className="flex w-full max-w-xs flex-col gap-3 rounded-lg border border-gray-300 p-4 select-none"
        >
          <div className="rounded-md border border-gray-300 p-3">
            <h2 className="mb-2 text-sm font-semibold">
              Atur jumlah dan catatan
            </h2>
            <div className="mb-2 flex items-center gap-3">
              <img
                alt="Fragrance bottle and box in forest background thumbnail"
                className="h-12 w-12 rounded"
                height="48"
                src={products.images[0]}
                width="48"
              />
            </div>
            <div className="mb-3 flex items-center gap-2">
              <button
                aria-label="Decrease quantity"
                className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-lg font-semibold text-gray-600 select-none"
                onClick={handleDecreaseQuantity}
                type="button"
              >
                -
              </button>
              <input
                className="w-10 rounded border border-gray-300 text-center text-sm font-semibold"
                readOnly
                type="text"
                value={quantity}
              />
              <button
                aria-label="Increase quantity"
                className="flex h-8 w-8 items-center justify-center rounded border border-green-600 text-lg font-semibold text-green-600 select-none"
                onClick={handleIncreaseQuantity}
                type="button"
              >
                +
              </button>
              <span className="text-xs md:text-sm">
                Stok:
                <span className="font-bold">{maxStock}</span>
              </span>
            </div>
            <div className="mb-3 flex justify-between text-xs text-gray-600 md:text-sm">
              <span>Subtotal</span>
              <span className="font-extrabold">
                {formatPrice(quantity * pricePerUnit)}
              </span>
            </div>
            <button
              className="mb-2 w-full rounded-md bg-green-700 py-2 font-semibold text-white hover:cursor-pointer hover:bg-green-800"
              type="button"
              onClick={() => alert("Berhasil dimasukkan ke keranjang")}
            >
              + Keranjang
            </button>
            <button
              className="w-full rounded-md border border-green-600 py-2 font-semibold text-green-600"
              type="button"
            >
              Beli Langsung
            </button>
          </div>
        </aside>
      </main>
    </>
  );
}
