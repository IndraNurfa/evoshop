"use client";
import BackButton from "@/components/BackButton";
import CartItem from "@/components/CartItem";
import { useCart } from "@/contexts/CartContext";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Loading } from "../../components/Loading";

export default function Page() {
  const { items } = useCart();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("items:", items);
    console.log("session:", session);
  }, [items, session]);

  if (status === "loading") {
    return (
      <div className="container mx-auto flex h-screen content-center items-center justify-center">
        <Loading />
      </div>
    );
  }

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * (item.quantity || 1),
    0,
  );
  const discount = subtotal * 0.2; // 20% discount
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <>
      <div className="container mx-auto my-5">
        <BackButton />
        <main className="mx-auto max-w-5xl">
          <h1 className="mb-6 text-[22px] font-thin dark:text-gray-200">
            YOUR CART
          </h1>
          <div className="flex flex-col gap-6 md:flex-row">
            {/* Cart Items */}
            <div className="flex flex-1 flex-col gap-6 rounded-xl bg-white p-6 transition-colors duration-300 dark:bg-[#1e1e1e]">
              {items.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  Your cart is empty
                </div>
              ) : (
                items.map((item) => (
                  <CartItem key={item.product.id} items={item} />
                ))
              )}
            </div>

            {/* Order Summary */}
            <div className="flex w-full flex-col gap-6 rounded-xl bg-white p-6 transition-colors duration-300 md:w-[320px] dark:bg-[#1e1e1e]">
              <p className="text-[14px] font-bold dark:text-gray-200">
                Order Summary
              </p>
              <div className="flex justify-between text-[14px] text-gray-700 dark:text-gray-400">
                <span>Subtotal</span>
                <span className="font-semibold dark:text-gray-100">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-[14px] text-red-600 dark:text-red-500">
                <span>Discount (-20%)</span>
                <span className="font-semibold">- ${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[14px] text-gray-700 dark:text-gray-400">
                <span>Delivery Fee</span>
                <span className="font-semibold dark:text-gray-100">
                  ${deliveryFee.toFixed(2)}
                </span>
              </div>
              <hr className="border-gray-300 dark:border-gray-600" />
              <div className="flex justify-between text-[18px] font-bold dark:text-gray-100">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <form className="flex gap-2">
                <input
                  className="flex-1 rounded-full border border-gray-300 bg-white px-4 py-2 text-[12px] text-black placeholder-gray-400 transition-colors duration-300 focus:outline-none dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-300 dark:placeholder-gray-500"
                  placeholder="Add promo code"
                  type="text"
                />
                <button
                  className="rounded-full bg-black px-5 py-2 text-[12px] font-semibold text-white transition-colors duration-300 dark:bg-white dark:text-black"
                  type="submit"
                >
                  Apply
                </button>
              </form>
              <button
                className="flex items-center justify-center gap-2 rounded-full bg-black py-3 text-[14px] font-normal text-white transition-colors duration-300 dark:bg-white dark:text-black"
                disabled={items.length === 0}
              >
                Proceed to Payment
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
