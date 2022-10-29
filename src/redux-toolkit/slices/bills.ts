import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IBill, ICustomer, IProduct } from '../../utils/types';

export interface CurrentBillInfo {
  customer: ICustomer | null;
  products: {
    product: IProduct;
    quantity: number;
  }[];
}

export interface BillsState {
  bills: IBill[];
  currentBill: CurrentBillInfo;
}

const initialState: BillsState = {
  bills: [],
  currentBill: {
    customer: null,
    products: []
  }
};

export const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    setAllBills: (state, action: PayloadAction<IBill[]>) => {
      state.bills = action.payload;
    },
    addBill: (state, action: PayloadAction<IBill>) => {
      state.bills.push(action.payload);
    },
    removeBill: (state, action: PayloadAction<string>) => {
      state.bills = state.bills.filter((bill) => bill._id !== action.payload);
    },
    updateCurrentBillCustomer: (state, action: PayloadAction<ICustomer>) => {
      state.currentBill.customer = action.payload;
    },
    updateCurrentBillProducts: (
      state,
      action: PayloadAction<{ product: IProduct; quantity?: number }>
    ) => {
      const idx = state.currentBill.products.findIndex(
        (p) => p.product._id === action.payload.product._id
      );
      if (idx === -1)
        state.currentBill.products.push({ product: action.payload.product, quantity: 1 });
      else
        state.currentBill.products = state.currentBill.products.filter(
          (item) => item.product._id !== action.payload.product._id
        );
    },
    updateProductQuantity: (
      state,
      action: PayloadAction<{ product: IProduct; quantity: number }>
    ) => {
      const { product, quantity } = action.payload;
      const idx = state.currentBill.products.findIndex((p) => p.product._id === product._id);
      if (idx !== -1) state.currentBill.products[idx] = { product, quantity };
    }
  }
});

export const {
  setAllBills,
  addBill,
  removeBill,
  updateCurrentBillCustomer,
  updateCurrentBillProducts,
  updateProductQuantity
} = billsSlice.actions;
export default billsSlice.reducer;
