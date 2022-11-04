import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IAccount } from '../../utils/types';
import { getProfile } from '../../api/account.api';

export const fetchProfile = createAsyncThunk('account/fetchProfile', async () => {
  const response = await getProfile();
  return response.payload;
});

export interface AccountState {
  user: IAccount | null;
}

const initialState: AccountState = {
  user: null
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAccount>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
  }
});

export const { setUser } = accountSlice.actions;
export default accountSlice.reducer;
