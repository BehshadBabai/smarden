import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DentistInfo } from '../dentist/dentist-slice';

interface AppState {
  route: string;
  allDentists: DentistInfo[];
}

const splitArray = window.location.href.split('/');
const path = splitArray[splitArray.length - 1] || '/';

const initialState: AppState = {
  route: path,
  allDentists: []
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    changeRoute(state, action: PayloadAction<string>) {
      state.route = action.payload;
    },
    changeAllDentists(state, action: PayloadAction<DentistInfo[]>) {
      state.allDentists = action.payload;
    }
  }
});

export const { changeRoute, changeAllDentists } = appSlice.actions;
export default appSlice.reducer;
