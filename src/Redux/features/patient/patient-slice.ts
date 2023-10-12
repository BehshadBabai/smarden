import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DentistInfo } from '../dentist/dentist-slice';

export type PatientInfo = {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  gender?: string;
  dob?: string;
  address1?: string;
  address2?: string;
  country?: string;
  province?: string;
  postalCode?: string;
};

export type PatientState = {
  info: PatientInfo;
  dentists: DentistInfo[];
};

const initialState: PatientState = {
  info: {
    name: 'Behshad',
    surname: 'Babai',
    email: 'b@b.com',
    id: '8',
    phone: '2366888933',
    address1: '4720',
    address2: '4205',
    country: 'canada',
    dob: '2001-04-09',
    gender: 'male',
    province: 'bc',
    postalCode: 'V5C0M8'
  },
  dentists: [
    {
      id: '2',
      name: 'Mohammad',
      surname: 'Babai',
      email: 'mbabai110@yahoo.com',
      phone: '7781010101',
      address1: '8181',
      address2: '1007',
      country: 'canada',
      province: 'bc',
      postalCode: 'v5x0j9'
    }
  ]
};

const patientSlice = createSlice({
  name: 'patient',
  initialState: initialState,
  reducers: {
    changePatientInfo(state, action: PayloadAction<PatientInfo>) {
      state.info = action.payload;
    }
  }
});

export const { changePatientInfo } = patientSlice.actions;
export default patientSlice.reducer;
