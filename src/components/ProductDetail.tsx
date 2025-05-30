/* eslint-disable @next/next/no-img-element */
"use client";
import { useCart } from "@/contexts/CartContext";
import { CartItem, Products } from "@/types";
import { formatPrice } from "@/utils/utils";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import ModalImage from "react-modal-image";

interface ProductDetailProps {
  products: Products;
}

export function ProductDetail({ products }: ProductDetailProps) {
  const { addToCart } = useCart();
  const { data: session } = useSession();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleAddToCart = () => {
    // Return early if no session or user is admin
    if (!session?.user) {
      toast.error("Please login to add items to cart");
      return;
    }

    if (session.user.role === "admin") {
      toast.error("Admins cannot add items to cart");
      return;
    }
    setIsLoading(true);
    try {
      const cartItem: CartItem = {
        product: products,
        quantity: quantity,
      };

      console.log("NavBar cartItem", cartItem);
      addToCart(cartItem);
      toast.success("Added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
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
                alt={products.title}
                className="h-12 w-12 rounded"
                height="48"
                src={products.images[0]}
                width="48"
              />
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={handleDecreaseQuantity}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#0f172a] text-[#0f172a] transition-colors duration-300 hover:bg-[#0f172a] hover:text-white dark:border-[#94a3b8] dark:text-[#94a3b8] dark:hover:bg-[#94a3b8] dark:hover:text-[#0f172a]"
              >
                -
              </button>
              <span
                data-testid="quantity-display"
                className="w-8 text-center text-[#0f172a] dark:text-[#94a3b8]"
              >
                {quantity}
              </span>
              <button
                onClick={handleIncreaseQuantity}
                disabled={quantity >= maxStock}
                aria-label="Increase quantity"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#0f172a] text-[#0f172a] transition-colors duration-300 hover:bg-[#0f172a] hover:text-white dark:border-[#94a3b8] dark:text-[#94a3b8] dark:hover:bg-[#94a3b8] dark:hover:text-[#0f172a]"
              >
                +
              </button>
            </div>
            <div className="mb-3 flex justify-between text-xs text-gray-600 md:text-sm">
              <span>Subtotal</span>
              <span className="font-extrabold">
                {formatPrice(quantity * pricePerUnit)}
              </span>
            </div>
            <button
              className={`mb-2 w-full rounded-md bg-green-700 py-2 font-semibold text-white transition-colors ${
                isLoading
                  ? "cursor-not-allowed opacity-70"
                  : "hover:cursor-pointer hover:bg-green-800"
              }`}
              type="button"
              onClick={handleAddToCart}
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "+ Add to Cart"}
            </button>
            <button
              className="w-full rounded-md border border-green-600 py-2 font-semibold text-green-600"
              type="button"
              disabled
            >
              Beli Langsung
            </button>
          </div>
        </aside>
      </main>
    </>
  );
}
