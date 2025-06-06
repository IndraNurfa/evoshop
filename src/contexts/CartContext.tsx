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

  // Load cart items on mount and when session changes
  useEffect(() => {
    if (session?.user) {
      const storedItems = localStorage.getItem(`cart_${session.user.id}`);
      if (storedItems) {
        try {
          const parsedItems = JSON.parse(storedItems);
          setItems(parsedItems);
        } catch (error) {
          console.error("Error parsing stored cart items:", error);
        }
      }
    } else {
      setItems([]); // Clear cart when no session
    }
  }, [session]);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (session?.user) {
      localStorage.setItem(`cart_${session.user.id}`, JSON.stringify(items));
    }
  }, [items, session]);

  const addToCart = (newItem: CartItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === newItem.product.id,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === newItem.product.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
      }

      return [...currentItems, newItem];
    });
  };

  const increaseQuantity = (productId: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (productId: number) => {
    setItems((currentItems) =>
      currentItems
        .map((item) => {
          if (item.product.id === productId) {
            return { ...item, quantity: Math.max(0, item.quantity - 1) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0),
    );
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
        totalItems: items.length,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
