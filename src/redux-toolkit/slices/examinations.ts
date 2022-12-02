import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import ExamApi from '../../api/exams.api';
import { ExamProperties, ICustomer, IExamination } from '../../utils/types';

import type { PayloadAction } from '@reduxjs/toolkit';
export const fetchAllExams = createAsyncThunk('examinations/fetchAllExams', async () => {
  const response = await ExamApi.getAllExams();
  return response;
});

const DEFAULT_EXAM_PROPS: ExamProperties = {
  sphere: {
    left: null,
    right: null
  },
  cylinder: {
    left: null,
    right: null
  },
  axis: {
    left: null,
    right: null
  },
  visualAcuityGlasses: {
    left: null,
    right: null
  },
  visualAcuity: {
    left: null,
    right: null
  },
  pupillaryDistance: {
    left: null,
    right: null
  },
  addition: null,
  otherProperties: []
};

export interface ExaminationState {
  examinations: IExamination[];
  currentExam: IExamination | null;
  currentExamCustomer?: ICustomer;
}

const initialState: ExaminationState = {
  examinations: [],
  currentExam: {
    eyes: DEFAULT_EXAM_PROPS,
    glasses: DEFAULT_EXAM_PROPS
  },
  currentExamCustomer: undefined
};

export const examinationSlice = createSlice({
  name: 'examinations',
  initialState,
  reducers: {
    setAllExaminations: (state, action: PayloadAction<IExamination[]>) => {
      state.examinations = action.payload;
    },
    addExamination: (state, action: PayloadAction<IExamination>) => {
      state.examinations.unshift(action.payload);
    },
    removeExamination: (state, action: PayloadAction<string>) => {
      state.examinations = state.examinations.filter(
        (examination) => examination._id !== action.payload
      );
    },
    setCurrentExamCustomer: (state, action: PayloadAction<ICustomer>) => {
      if (!state.currentExam)
        state.currentExam = { customer: action.payload, eyes: {}, glasses: {} };
      else state.currentExam.customer = action.payload;
    },
    setCurrentExam: (state, action: PayloadAction<IExamination>) => {
      state.currentExam = { ...state.currentExam, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllExams.fulfilled, (state, { payload }) => {
      state.examinations = payload;
    });
  }
});

export const {
  setAllExaminations,
  addExamination,
  removeExamination,
  setCurrentExamCustomer,
  setCurrentExam
} = examinationSlice.actions;
export default examinationSlice.reducer;
