import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/Types';

export interface CartItem {
  id: number;
  name: string;
  price: string;
  numericPrice: number;
  oldPrice?: string;
  image: string;
  quantity: number;
  category: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalAmount: number;
}

const parsePrice = (priceStr: string): number => {
  if (!priceStr) return 0;
  const num = parseInt(priceStr.replace(/[^\d]/g, ''), 10);
  return isNaN(num) ? 0 : num;
};

// Initial state loaded from localStorage if available
const loadInitialState = (): CartState => {
  try {
    const saved = localStorage.getItem('swash_cart');
    if (saved) {
      const items: CartItem[] = JSON.parse(saved);
      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = items.reduce((sum, item) => sum + item.numericPrice * item.quantity, 0);
      return { items, isOpen: false, totalItems, totalAmount };
    }
  } catch (_) {}
  return { items: [], isOpen: false, totalItems: 0, totalAmount: 0 };
};

const initialState: CartState = loadInitialState();

const saveCart = (items: CartItem[]) => {
  try {
    localStorage.setItem('swash_cart', JSON.stringify(items));
  } catch (_) {}
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity?: number }>) => {
      const { product, quantity = 1 } = action.payload;
      const numPrice = parsePrice(product.price);
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          numericPrice: numPrice,
          oldPrice: product.oldPrice,
          image: product.image,
          quantity,
          category: product.category,
        });
      }

      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = state.items.reduce((sum, item) => sum + item.numericPrice * item.quantity, 0);
      saveCart(state.items);
    },

    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((it) => it.id === id);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((it) => it.id !== id);
        } else {
          item.quantity = quantity;
        }
      }

      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = state.items.reduce((sum, item) => sum + item.numericPrice * item.quantity, 0);
      saveCart(state.items);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = state.items.reduce((sum, item) => sum + item.numericPrice * item.quantity, 0);
      saveCart(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
      saveCart([]);
    },

    openCart: (state) => {
      state.isOpen = true;
    },

    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart, openCart, closeCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
