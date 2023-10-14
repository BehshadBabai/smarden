import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PatientInfo } from '../patient/patient-slice';
import { DentistInfo } from '../dentist/dentist-slice';

type AccountType = 'dentist' | 'patient';
type BookingStatus = 'approved' | 'pending' | 'rejected';
type BookingPayload<T> = { id: string; data: T };

export type Booking = {
  patient: PatientInfo;
  dentist: DentistInfo;
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  reply: string;
  time: string;
  id: string;
  status: BookingStatus;
};

type AccountState = {
  type: AccountType;
  loggedIn: boolean;
  hasAccount: boolean;
  bookings: Booking[];
};

const initialState: AccountState = {
  type: 'patient',
  // chnage to false at very end
  loggedIn: true,
  hasAccount: true,
  bookings: [
    {
      patient: {
        name: 'Behshad',
        surname: 'Babai',
        email: 'b@b.com',
        id: '8',
        phone: '2366888933',
        address1: '4720',
        address2: '4205',
        country: 'Canada',
        dob: '2001-04-09',
        gender: 'male',
        province: 'British Columbia',
        postalCode: 'V5C0M8'
      },
      dentist: {
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
      severity: 'high',
      title: 'My Face Hurts',
      description: '',
      reply: '',
      time: '2023-10-10',
      id: '2',
      status: 'pending'
    },
    {
      patient: {
        name: 'Behbod',
        surname: 'Babai',
        email: 'b@b.com',
        id: '8',
        phone: '2366888933',
        address1: '4720',
        address2: '4205',
        country: 'Canada',
        dob: '2001-04-09',
        gender: 'male',
        province: 'British Columbia',
        postalCode: 'V5C0M8'
      },
      dentist: {
        name: 'Mohammad',
        surname: 'Babai',
        email: 'mbabai110@yahoo.com',
        id: '3',
        address1: '8181',
        address2: 'chester',
        country: 'Canada',
        phone: '778',
        province: 'British Columbia',
        postalCode: 'V5X0J9'
      },
      severity: 'high',
      title: 'My Teeth Hurt and this is the',
      description:
        'They Just Hurt IDK why honestly, it happened since I ate honey and apple pie together!',
      reply: 'This is my reply',
      time: '2023-10-10',
      id: '1',
      status: 'pending'
    },
    {
      patient: {
        name: 'Behshad',
        surname: 'Babai',
        email: 'b@b.com',
        id: '8',
        phone: '2366888933',
        address1: '4720',
        address2: '4205',
        country: 'Canada',
        dob: '2001-04-09',
        gender: 'male',
        province: 'British Columbia',
        postalCode: 'V5C0M8'
      },
      dentist: {
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
      severity: 'low',
      title: 'My Face Hurts',
      description: '',
      reply: '',
      time: '2023-10-10',
      id: '3',
      status: 'pending'
    },
    {
      patient: {
        name: 'Behbod',
        surname: 'Babai',
        email: 'b@b.com',
        id: '8',
        phone: '2366888933',
        address1: '4720',
        address2: '4205',
        country: 'Canada',
        dob: '2001-04-09',
        gender: 'male',
        province: 'British Columbia',
        postalCode: 'V5C0M8'
      },
      dentist: {
        name: 'Mohammad',
        surname: 'Babai',
        email: 'mbabai110@yahoo.com',
        id: '3',
        address1: '8181',
        address2: 'chester',
        country: 'Canada',
        phone: '778',
        province: 'British Columbia',
        postalCode: 'V5X0J9'
      },
      severity: 'high',
      title: 'My Teeth Hurt and this is the',
      description:
        'They Just Hurt IDK why honestly, it happened since I ate honey and apple pie together!',
      reply: 'This is my reply',
      time: '2023-10-10',
      id: '4',
      status: 'pending'
    },
    {
      patient: {
        name: 'Behshad',
        surname: 'Babai',
        email: 'b@b.com',
        id: '8',
        phone: '2366888933',
        address1: '4720',
        address2: '4205',
        country: 'Canada',
        dob: '2001-04-09',
        gender: 'male',
        province: 'British Columbia',
        postalCode: 'V5C0M8'
      },
      dentist: {
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
      severity: 'medium',
      title: 'My Face Hurts',
      description: '',
      reply: '',
      time: '2023-10-10',
      id: '5',
      status: 'pending'
    }
  ]
};

const accountSlice = createSlice({
  name: 'account',
  initialState: initialState,
  reducers: {
    toggleLoggedIn(state) {
      state.loggedIn = !state.loggedIn;
    },
    toggleType(state) {
      if (state.type == 'dentist') {
        state.type = 'patient';
      } else {
        state.type = 'dentist';
      }
    },
    toggleHasAccount(state) {
      state.hasAccount = !state.hasAccount;
    },
    addBooking(state, action: PayloadAction<Booking>) {
      state.bookings = [...state.bookings, action.payload];
    },
    deleteBooking(state, action: PayloadAction<string>) {
      state.bookings = state.bookings.filter((el) => el.id !== action.payload);
    },
    changeBookingStatus(
      state,
      action: PayloadAction<BookingPayload<BookingStatus>>
    ) {
      state.bookings = state.bookings.map((booking) => {
        if (booking.id === action.payload.id) {
          booking.status = action.payload.data;
          return booking;
        }
        return booking;
      });
    },
    changeBookingReply(state, action: PayloadAction<BookingPayload<string>>) {
      state.bookings = state.bookings.map((booking) => {
        if (booking.id === action.payload.id) {
          booking.reply = action.payload.data;
          return booking;
        }
        return booking;
      });
    },
    chnageBookingDescription(
      state,
      action: PayloadAction<BookingPayload<string>>
    ) {
      state.bookings = state.bookings.map((booking) => {
        if (booking.id === action.payload.id) {
          booking.description = action.payload.data;
          return booking;
        }
        return booking;
      });
    }
  }
});

export const {
  toggleLoggedIn,
  toggleType,
  toggleHasAccount,
  addBooking,
  deleteBooking,
  changeBookingStatus,
  chnageBookingDescription,
  changeBookingReply
} = accountSlice.actions;
export default accountSlice.reducer;
