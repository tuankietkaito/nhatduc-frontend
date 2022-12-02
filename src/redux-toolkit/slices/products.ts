import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import ProductApi from '../../api/products.api';
import { IProduct } from '../../utils/types';

import type { PayloadAction } from '@reduxjs/toolkit';
export const fetchAllProducts = createAsyncThunk('products/fetchAllProducts', async () => {
  const response = await ProductApi.getAllProducts();
  return response;
});

export interface ProductsState {
  products: IProduct[];
}

const initialState: ProductsState = {
  products: []
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setAllProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
    updateProduct: (state, action: PayloadAction<{ id: string; data: IProduct }>) => {
      const { id, data } = action.payload;
      const prodId = state.products.findIndex((c) => c._id === id);
      if (prodId > -1) state.products[prodId] = data;
    },
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((product) => product._id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.fulfilled, (state, { payload }) => {
      state.products = payload;
    });
  }
});

export const { setAllProducts, updateProduct, addProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;
