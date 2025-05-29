"use client";

import { CartItem } from "@/types";
import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type CartContextType = {
  addToCart: (item: CartItem) => void;
  items: CartItem[];
  totalItems: number;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
};

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  totalItems: 0,
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  removeFromCart: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);

  // Load cart items on mount
  useEffect(() => {
    if (session?.user) {
      try {
        const storedItems = localStorage.getItem(`cart_${session.user.id}`);
        if (storedItems) {
          const parsedItems = JSON.parse(storedItems);
          setItems(parsedItems);
          setTotalItems(parsedItems.length);
        }
      } catch (error) {
        console.error("Error loading cart items:", error);
      }
    }
  }, [session]);

  // Update localStorage when items change
  useEffect(() => {
    if (session?.user) {
      try {
        localStorage.setItem(`cart_${session.user.id}`, JSON.stringify(items));
        setTotalItems(items.length);
      } catch (error) {
        console.error("Error saving cart items:", error);
      }
    }
  }, [items, session]);

  const addToCart = (item: CartItem) => {
    console.log("Adding item to cart:", item);
    setItems((currentItems) => {
      const existingItemIndex = currentItems.find(
        (i) => i.product.id === item.product.id,
      );

      if (existingItemIndex) {
        // Update existing item
        return currentItems.map((item) =>
          item.product.id === item.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      // Add new item
      return [...currentItems, item];
    });
  };

  const increaseQuantity = (productId: number) => {
    setItems((currentItems) => {
      return currentItems.map((item) => {
        if (item.product.id === productId) {
          // Increase quantity
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const decreaseQuantity = (productId: number) => {
    setItems((currentItems) => {
      return currentItems.map((item) => {
        if (item.product.id === productId) {
          // If quantity is 1, the item will be removed by removeFromCart
          if (item.quantity <= 1) {
            removeFromCart(productId);
            return item;
          }
          // Decrease quantity
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  };

  const removeFromCart = (productId: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId),
    );
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        totalItems,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
