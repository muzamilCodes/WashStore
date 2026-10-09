import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/Types';

interface WishlistState {
  items: Product[];
  isOpen: boolean;
}

const loadWishlist = (): Product[] => {
  try {
    const saved = localStorage.getItem('swash_wishlist');
    if (saved) return JSON.parse(saved);
  } catch (_) {}
  return [];
};

const initialState: WishlistState = {
  items: loadWishlist(),
  isOpen: false,
};

const saveWishlist = (items: Product[]) => {
  try {
    localStorage.setItem('swash_wishlist', JSON.stringify(items));
  } catch (_) {}
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      saveWishlist(state.items);
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveWishlist(state.items);
    },
    openWishlist: (state) => {
      state.isOpen = true;
    },
    closeWishlist: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleWishlist, removeFromWishlist, openWishlist, closeWishlist } = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;
