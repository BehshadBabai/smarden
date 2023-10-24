import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PatientInfo } from '../patient/patient-slice';

export type DentistInfo = {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  country: string;
  province: string;
  postalCode: string;
};

export type DentistState = {
  info: DentistInfo;
  patients: PatientInfo[];
};

const initialState: DentistState = {
  info: null,
  patients: []
};

const dentistSlice = createSlice({
  name: 'dentist',
  initialState: initialState,
  reducers: {
    changeDentistInfo(state, action: PayloadAction<DentistInfo>) {
      state.info = action.payload;
    },
    changeDentistPatients(state, action: PayloadAction<PatientInfo[]>) {
      state.patients = action.payload;
    }
  }
});

export const { changeDentistInfo, changeDentistPatients } =
  dentistSlice.actions;
export default dentistSlice.reducer;
