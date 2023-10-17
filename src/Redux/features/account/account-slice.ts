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
  bookings: []
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
