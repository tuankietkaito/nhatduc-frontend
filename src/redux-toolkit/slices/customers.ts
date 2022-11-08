import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICustomer } from '../../utils/types';
import CustomerApi from './../../api/customers.api';

export const fetchAllCustomers = createAsyncThunk('customers/fetchAllCustomers', async () => {
  const response = await CustomerApi.getAllCustomers();
  return response;
});

export interface CustomersState {
  customers: ICustomer[];
}

const initialState: CustomersState = {
  customers: []
};

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setAllCustomers: (state, action: PayloadAction<ICustomer[]>) => {
      state.customers = action.payload;
    },
    addCustomer: (state, action: PayloadAction<ICustomer>) => {
      state.customers.push(action.payload);
    },
    updateCustomer: (state, action: PayloadAction<{ id: string; data: ICustomer }>) => {
      const { id, data } = action.payload;
      const custIdx = state.customers.findIndex((c) => c._id === id);
      if (custIdx > -1) state.customers[custIdx] = data;
    },
    removeCustomer: (state, action: PayloadAction<string>) => {
      state.customers = state.customers.filter((customer) => customer._id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCustomers.fulfilled, (state, { payload }) => {
      state.customers = payload;
    });
  }
});

export const { setAllCustomers, addCustomer, updateCustomer, removeCustomer } =
  customersSlice.actions;
export default customersSlice.reducer;
