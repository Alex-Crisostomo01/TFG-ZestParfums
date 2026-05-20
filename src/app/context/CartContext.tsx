import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Perfume } from "../data/perfumes";

const CART_STORAGE_KEY = "luxe_cart";
const WISHLIST_STORAGE_KEY = "luxe_wishlist";
const GUEST_CART_KEY = "luxe_cart_guest";

interface CartItem extends Perfume {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: Perfume[];
  addToCart: (perfume: Perfume) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  wishlistCount: () => number;
  toggleWishlist: (perfume: Perfume) => void;
  removeFromWishlist: (id: number) => void;
  isFavorite: (id: number) => boolean;
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

const getWishlistStorageKey = (): string => {
  const email = getUserEmail();
  return email ? `${WISHLIST_STORAGE_KEY}_${email}` : WISHLIST_STORAGE_KEY;
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

const loadWishlistFromStorage = (): Perfume[] => {
  if (typeof window === "undefined") return [];
  try {
    const storageKey = getWishlistStorageKey();
    const stored = localStorage.getItem(storageKey);
    if (!stored) return [];
    return JSON.parse(stored) as Perfume[];
  } catch {
    return [];
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const cartStorageKey = getCartStorageKey();
  const wishlistStorageKey = getWishlistStorageKey();
  const [cart, setCart] = useState<CartItem[]>(loadCartFromStorage);
  const [wishlist, setWishlist] = useState<Perfume[]>(loadWishlistFromStorage);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(cartStorageKey, JSON.stringify(cart));
    } catch {
      // Ignorar errores de almacenamiento si el usuario tiene bloqueo o modo privado.
    }
  }, [cart, cartStorageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(wishlistStorageKey, JSON.stringify(wishlist));
    } catch {
      // Ignorar errores de almacenamiento si el usuario tiene bloqueo o modo privado.
    }
  }, [wishlist, wishlistStorageKey]);

  useEffect(() => {
    const handleUserCartChange = () => {
      setCart(loadCartFromStorage());
      setWishlist(loadWishlistFromStorage());
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

  const toggleWishlist = (perfume: Perfume) => {
    setWishlist((prevWishlist) => {
      const alreadyInWishlist = prevWishlist.some((item) => item.id === perfume.id);
      if (alreadyInWishlist) {
        return prevWishlist.filter((item) => item.id !== perfume.id);
      }
      return [...prevWishlist, perfume];
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
  };

  const isFavorite = (id: number) => {
    return wishlist.some((item) => item.id === id);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const wishlistCount = () => wishlist.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        wishlistCount,
        toggleWishlist,
        removeFromWishlist,
        isFavorite,
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
