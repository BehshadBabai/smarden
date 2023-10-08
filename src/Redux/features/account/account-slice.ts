import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AccountType = 'dentist' | 'patient';

export type AccountInfo = {
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

interface AccountState {
  type: AccountType;
  loggedIn: boolean;
  hasAccount: boolean;
  info?: AccountInfo;
}

const initialState: AccountState = {
  type: 'patient',
  // chnage to false at very end
  loggedIn: true,
  hasAccount: true
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
    changeInfo(state, action: PayloadAction<AccountInfo>) {
      state.info = action.payload;
    }
  }
});

export const { toggleLoggedIn, toggleType, toggleHasAccount, changeInfo } =
  accountSlice.actions;
export default accountSlice.reducer;
