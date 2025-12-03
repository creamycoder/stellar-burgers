import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface OrderState {
  feed: {
    total: number;
    totalToday: number;
    orders: TOrder[];
    isLoading: boolean;
    error: string | undefined;
  };
  userOrders: {
    orders: TOrder[];
    isLoading: boolean;
    error: string | undefined;
  };
  orderByNumber: {
    order: TOrder | null;
    isLoading: boolean;
    error: string | undefined;
  };
}

const initialState: OrderState = {
  feed: {
    total: 0,
    totalToday: 0,
    orders: [],
    isLoading: false,
    error: undefined
  },
  userOrders: {
    orders: [],
    isLoading: false,
    error: undefined
  },
  orderByNumber: {
    order: null,
    isLoading: false,
    error: undefined
  }
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {}
});

export const ordersReducer = ordersSlice.reducer;
