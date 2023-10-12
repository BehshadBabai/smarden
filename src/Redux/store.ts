import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './features/account/account-slice';
import appReducer from './features/app/app-slice';
import patientsReducer from './features/patient/patient-slice';
import dentistReducer from './features/dentist/dentist-slice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    app: appReducer,
    patient: patientsReducer,
    dentist: dentistReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
