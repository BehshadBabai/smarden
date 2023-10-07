import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AccountType = 'dentist' | 'patient';

interface AccountState {
  type: AccountType;
  loggedIn: boolean;
}

const initialState: AccountState = {
  type: 'patient',
  // change to false
  loggedIn: true
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
    }
  }
});

export const { toggleLoggedIn, toggleType } = accountSlice.actions;
export default accountSlice.reducer;
