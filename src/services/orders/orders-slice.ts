import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsThunk, getOrderByNumberThunk } from './actions';
import { TFeedsResponse } from '@api';

export interface OrderState {
  feed: TFeedsResponse;
  userOrders: TOrder[];
  orderByNumber: TOrder | null;
  newOrder: {
    order: TOrder | null;
    name: string;
  };
  orderRequest: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  feed: {
    success: false,
    total: 0,
    totalToday: 0,
    orders: []
  },
  userOrders: [],
  orderByNumber: null,
  newOrder: {
    order: null,
    name: ''
  },
  orderRequest: false,
  loading: false,
  error: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ====== FEED ======
      .addCase(getFeedsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload;
      })
      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ====== ORDER BY NUMBER ======
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderByNumber = null; // сброс перед загрузкой
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orderByNumber = action.payload.orders[0];
        // ⚠️ проверь структуру ответа API
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
  selectors: {
    selectFeedOrders: (state) => state.feed.orders,
    selectOrdersLoading: (state) => state.loading,
    selectOrderByNumber: (state) => state.orderByNumber,
    selectFeed: (state) => state.feed,
    selectNewOrder: (state) => state.newOrder,
    selectOrderRequest: (state) => state.orderRequest
  }
});

export const {
  selectFeedOrders,
  selectOrdersLoading,
  selectOrderByNumber,
  selectFeed,
  selectNewOrder,
  selectOrderRequest
} = ordersSlice.selectors;

export const ordersReducer = ordersSlice.reducer;
