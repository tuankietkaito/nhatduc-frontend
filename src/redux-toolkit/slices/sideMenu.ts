import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  isOpened: boolean;
  openedItem: string[];
}

const initialState: CounterState = {
  isOpened: true,
  openedItem: []
};

export const sideMenuSlice = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {
    setIsOpenedMenu: (state, action: PayloadAction<boolean>) => {
      state.isOpened = action.payload;
    },
    setOpenedItem: (state, action: PayloadAction<string>) => {
      state.openedItem = [action.payload];
    }
  }
});

export const { setIsOpenedMenu, setOpenedItem } = sideMenuSlice.actions;
export default sideMenuSlice.reducer;
