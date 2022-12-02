import { combineReducers } from 'redux';

import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import accountReducer from './slices/account';
import billsReducer from './slices/bills';
import customersReducer from './slices/customers';
import examinationReducer from './slices/examinations';
import productsReducer from './slices/products';
import sideMenuReducer from './slices/sideMenu';

export const rootReducer = combineReducers({
  sideMenu: sideMenuReducer,
  products: productsReducer,
  customers: customersReducer,
  bills: billsReducer,
  examinations: examinationReducer,
  account: accountReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof rootReducer>;
export const storeDispatch = store.dispatch;
export type Dispatch = typeof storeDispatch;
export type Thunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
