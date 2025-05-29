/* eslint-disable @next/next/no-img-element */
import { useCart } from "@/contexts/CartContext";
import type { CartItem } from "@/types";
import { formatPrice } from "@/utils/utils";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CartItemProps {
  items: CartItem;
}

export default function CartItem({ items }: CartItemProps) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  const handleDelete = () => {
    removeFromCart(items.product.id);
  };

  const handleIncrease = () => {
    increaseQuantity(items.product.id);
  };

  const handleDecrease = () => {
    if (items.quantity <= 1) {
      removeFromCart(items.product.id);
    } else {
      decreaseQuantity(items.product.id);
    }
  };

  return (
    <div className="flex items-center justify-between rounded-xl bg-[#f9f8f3] p-4 transition-colors duration-300 dark:bg-[#2a2a2a]">
      <div className="flex items-center gap-4">
        <img
          alt={items.product.title}
          className="h-[70px] w-[70px] rounded-md object-cover"
          height="70"
          src={items.product.images[0]}
          width="70"
        />
        <div>
          <p className="text-[14px] leading-tight font-bold dark:text-gray-100">
            {items.product.title}
          </p>
          <p className="mt-1 text-[16px] font-bold dark:text-gray-100">
            {formatPrice(items.product.price)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={handleDelete}
          aria-label="Delete item"
          className="text-lg text-red-600 dark:text-red-500"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <div className="flex items-center rounded-full border border-gray-300 px-3 py-1 select-none dark:border-gray-600">
          <button
            onClick={handleDecrease}
            className="text-[14px] leading-none font-semibold text-gray-600 dark:text-gray-400"
          >
            -
          </button>
          <span className="mx-3 text-[14px] font-semibold">
            {items.quantity || 1}
          </span>
          <button
            onClick={handleIncrease}
            className="text-[14px] leading-none font-semibold text-gray-600 dark:text-gray-400"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
