import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Perfume } from "../data/perfumes";

const CART_STORAGE_KEY = "luxe_cart";
const GUEST_CART_KEY = "luxe_cart_guest";

interface CartItem extends Perfume {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (perfume: Perfume) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const getUserEmail = (): string | null => {
  if (typeof window === "undefined") return null;
  const email = localStorage.getItem("userEmail");
  return email ? email.trim().toLowerCase() : null;
};

const getCartStorageKey = (): string => {
  const email = getUserEmail();
  return email ? `${CART_STORAGE_KEY}_${email}` : GUEST_CART_KEY;
};

const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const storageKey = getCartStorageKey();
    const stored =
      localStorage.getItem(storageKey) ??
      localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as CartItem[];
    if (
      storageKey !== CART_STORAGE_KEY &&
      localStorage.getItem(storageKey) === null
    ) {
      localStorage.setItem(storageKey, JSON.stringify(parsed));
    }
    return parsed;
  } catch {
    return [];
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const cartStorageKey = getCartStorageKey();
  const [cart, setCart] = useState<CartItem[]>(loadCartFromStorage);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(cartStorageKey, JSON.stringify(cart));
    } catch {
      // Ignorar errores de almacenamiento si el usuario tiene bloqueo o modo privado.
    }
  }, [cart, cartStorageKey]);

  useEffect(() => {
    const handleUserCartChange = () => {
      setCart(loadCartFromStorage());
    };

    window.addEventListener("userCartChange", handleUserCartChange);
    return () =>
      window.removeEventListener("userCartChange", handleUserCartChange);
  }, []);

  const addToCart = (perfume: Perfume) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === perfume.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === perfume.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...perfume, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
