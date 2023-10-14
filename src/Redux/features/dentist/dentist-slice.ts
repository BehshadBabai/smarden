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
    country: 'Canada',
    phone: '778',
    province: 'British Columbia',
    postalCode: 'V5X0J9'
  },
  patients: [
    {
      name: 'Zak',
      surname: 'Babai',
      email: 'b@b.com',
      id: '8',
      phone: '2366888933',
      address1: '4720',
      address2: '4205',
      country: 'Canada',
      dob: '2001-04-09',
      gender: 'other',
      province: 'British Columbia',
      postalCode: 'V5C0M8'
    },
    {
      name: 'Zain',
      surname: 'Babai',
      email: 'b@b.com',
      id: '8',
      phone: '2366888933',
      address1: '4720',
      address2: '4205',
      country: 'Canada',
      province: 'British Columbia',
      postalCode: 'V5C0M8'
    },
    {
      name: 'Behshad',
      surname: 'Babai',
      email: 'b@b.com',
      id: '8',
      phone: '2366888933',
      address1: '4720',
      address2: '4205',
      country: 'Canada',
      dob: '2001-04-09',
      province: 'British Columbia',
      postalCode: 'V5C0M8'
    },
    {
      name: 'Majid',
      surname: 'Zaniar',
      email: 'b@b.com',
      id: '8',
      phone: '2366888933',
      address1: '4720',
      address2: '4205',
      country: 'Canada',
      gender: 'male',
      province: 'British Columbia',
      postalCode: 'V5C0M8'
    }
  ]
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
