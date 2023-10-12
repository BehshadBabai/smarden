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
  info: {
    name: 'Reza',
    surname: 'BT',
    email: 'mbabai110@yahoo.com',
    id: '5',
    address1: '8181',
    address2: 'chester',
    country: 'canada',
    phone: '778',
    province: 'bc',
    postalCode: 'V5X0J9'
  },
  patients: []
};

const dentistSlice = createSlice({
  name: 'patient',
  initialState: initialState,
  reducers: {
    changeDentistInfo(state, action: PayloadAction<DentistInfo>) {
      state.info = action.payload;
    }
  }
});

export const { changeDentistInfo } = dentistSlice.actions;
export default dentistSlice.reducer;
