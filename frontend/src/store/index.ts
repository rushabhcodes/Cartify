import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, CartItem } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

interface CartState {
  items: CartItem[];
  localCart: Array<{ itemId: number; quantity: number }>;
  addToLocalCart: (itemId: number, quantity: number) => void;
  removeFromLocalCart: (itemId: number) => void;
  clearLocalCart: () => void;
  setCart: (items: CartItem[]) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => {
        localStorage.setItem('token', token);
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      localCart: [],
      addToLocalCart: (itemId, quantity) => {
        const { localCart } = get();
        const existingItem = localCart.find(item => item.itemId === itemId);
        
        if (existingItem) {
          set({
            localCart: localCart.map(item =>
              item.itemId === itemId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ localCart: [...localCart, { itemId, quantity }] });
        }
      },
      removeFromLocalCart: (itemId) => {
        const { localCart } = get();
        set({ localCart: localCart.filter(item => item.itemId !== itemId) });
      },
      clearLocalCart: () => set({ localCart: [] }),
      setCart: (items) => set({ items }),
      getTotalItems: () => {
        const { items, localCart } = get();
        const serverItems = items.reduce((total, item) => total + item.quantity, 0);
        const localItems = localCart.reduce((total, item) => total + item.quantity, 0);
        return serverItems + localItems;
      },
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.item.price * item.quantity), 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
