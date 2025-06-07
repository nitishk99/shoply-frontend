import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Order = {
  orderNumber: string;
  items: any[];
  total: number;
  customer: any;
};

type OrderState = {
  lastOrder: Order | null;
};

const initialState: OrderState = {
  lastOrder: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Order>) => {
      state.lastOrder = action.payload;
    },
    clearOrder: (state) => {
      state.lastOrder = null;
    },
  },
});

export const { setOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;