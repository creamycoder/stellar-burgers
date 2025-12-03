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
  newOrder: {
    order: TOrder | null;
    name: string;
  };
  orderRequest: boolean;
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
  },
  newOrder: {
    order: null,
    name: ''
  },
  orderRequest: false
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    selectNewOrder: (state) => state.newOrder,
    selectOrderRequest: (state) => state.orderRequest
  }
});

export const { selectNewOrder, selectOrderRequest } = ordersSlice.selectors;
