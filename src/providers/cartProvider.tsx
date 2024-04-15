import { CartItem, Product } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
};

const Cartcontext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem["size"]) => {
    const existItem = items.find((item) => item.product === product && item.size === size);

    if (existItem) {
      updateQuantity(existItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      size,
      product,
      quantity: 1,
      product_id: product.id,
    };

    setItems([newCartItem, ...items]);
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    console.log("amount", amount);
    const updatedItems = items
      .map((item) => (item.id !== itemId ? item : { ...item, quantity: item.quantity + amount }))
      .filter((item) => item.quantity > 0);

    setItems(updatedItems);
  };

  const total = Number(
    items.reduce((sum, item) => (sum += item.product.price * item.quantity), 0).toFixed(2)
  );

  return (
    <Cartcontext.Provider value={{ items, addItem, updateQuantity, total }}>
      {children}
    </Cartcontext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(Cartcontext);
