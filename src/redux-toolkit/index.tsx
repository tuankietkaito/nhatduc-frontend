import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import sideMenuReducer from './slices/sideMenu';
import productsReducer from './slices/products';
import customersReducer from './slices/customers';
import billsReducer from './slices/bills';
import examinationReducer from './slices/examinations';

export const rootReducer = combineReducers({
  sideMenu: sideMenuReducer,
  products: productsReducer,
  customers: customersReducer,
  bills: billsReducer,
  examinations: examinationReducer
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
