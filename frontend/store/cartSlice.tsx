import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string; // size
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (item) =>
          item.id === action.payload.id && item.variant === action.payload.variant
      );
      if (existing) {
        existing.quantity = action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    increment: (state, action: PayloadAction<{ id: number; variant?: string }>) => {
      const item = state.items.find(
        (i) => i.id === action.payload.id && i.variant === action.payload.variant
      );
      if (item) item.quantity += 1;
    },
    decrement: (state, action: PayloadAction<{ id: number; variant?: string }>) => {
      const item = state.items.find(
        (i) => i.id === action.payload.id && i.variant === action.payload.variant
      );
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeFromCart: (state, action: PayloadAction<{ id: number; variant?: string }>) => {
      state.items = state.items.filter(
        (item) =>
          !(item.id === action.payload.id && item.variant === action.payload.variant)
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, increment, decrement, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;