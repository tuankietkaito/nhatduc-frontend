import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICustomer } from '../../utils/types';

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
    removeCustomer: (state, action: PayloadAction<string>) => {
      state.customers = state.customers.filter((customer) => customer._id !== action.payload);
    }
  }
});

export const { setAllCustomers, addCustomer, removeCustomer } = customersSlice.actions;
export default customersSlice.reducer;
