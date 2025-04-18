import { createContext, useContext, useState, useEffect } from "react";
import { data } from "../../constants/db";

interface CartItem extends Apparel {
  quantity: number;
}

type CartContext = {
  allApparels: Apparel[];
  cartItems: CartItem[];
  likedItems: Apparel[];
  addToCart: (item: Apparel) => void;
  removeFromCart: (itemId: number) => void;
  toggleLikeItem: (item: Apparel) => void;
  isItemLiked: (itemId: number) => boolean;
  isItemInCart: (itemId: number) => boolean;
  updateCartItemQuantity: (itemId: number, quantity: number) => void;
  getCartItemQuantity: (itemId: number) => number;
  clearCart: () => void;
  getTotalCartAmount: () => number;
  getDiscountAmount: () => number;
};

const CartContext = createContext<CartContext | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [likedItems, setLikedItems] = useState<Apparel[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [allApparels, setAllApparels] = useState<Apparel[]>([]);

  useEffect(() => {
    setAllApparels(data);
  }, []);

  const addToCart = (item: Apparel) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const toggleLikeItem = (item: Apparel) => {
    setLikedItems((prev) => {
      const isLiked = prev.some((i) => i.id === item.id);
      if (isLiked) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const isItemLiked = (itemId: number) => {
    return likedItems.some((item) => item.id === itemId);
  };

  const isItemInCart = (itemId: number) => {
    return cartItems.some((item) => item.id === itemId);
  };

  const updateCartItemQuantity = (itemId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const getCartItemQuantity = (itemId: number) => {
    const item = cartItems.find((item) => item.id === itemId);
    return item?.quantity || 0;
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalCartAmount = () => {
    return cartItems.reduce((total, item) => {
      const discountedPrice = item.price * (1 - item.discountPercentage / 100);
      return total + discountedPrice * item.quantity;
    }, 0);
  };

  const getDiscountAmount = () => {
    return cartItems.reduce((total, item) => {
      const discount = item.price * (item.discountPercentage / 100);
      return total + discount * item.quantity;
    }, 0);
  };

  const value = {
    allApparels,
    cartItems,
    likedItems,
    addToCart,
    removeFromCart,
    toggleLikeItem,
    isItemLiked,
    isItemInCart,
    updateCartItemQuantity,
    getCartItemQuantity,
    clearCart,
    getTotalCartAmount,
    getDiscountAmount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
