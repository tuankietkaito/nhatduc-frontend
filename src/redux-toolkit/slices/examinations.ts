import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IExamination, ICustomer } from '../../utils/types';

export interface ExaminationState {
  examinations: IExamination[];
  currentExamCustomer: ICustomer | null;
}

const initialState: ExaminationState = {
  examinations: [],
  currentExamCustomer: null
};

export const examinationSlice = createSlice({
  name: 'examinations',
  initialState,
  reducers: {
    setAllExaminations: (state, action: PayloadAction<IExamination[]>) => {
      state.examinations = action.payload;
    },
    addExamination: (state, action: PayloadAction<IExamination>) => {
      state.examinations.push(action.payload);
    },
    removeExamination: (state, action: PayloadAction<string>) => {
      state.examinations = state.examinations.filter(
        (examination) => examination._id !== action.payload
      );
    },
    setCurrentExamCustomer: (state, action: PayloadAction<ICustomer>) => {
      state.currentExamCustomer = action.payload;
    }
  }
});

export const { setAllExaminations, addExamination, removeExamination, setCurrentExamCustomer } =
  examinationSlice.actions;
export default examinationSlice.reducer;
