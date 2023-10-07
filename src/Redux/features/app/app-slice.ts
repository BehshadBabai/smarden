import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  route: string;
}

const initialState: AppState = {
  route: '/'
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    changeRoute(state, action: PayloadAction<string>) {
      state.route = action.payload;
    }
  }
});

export const { changeRoute } = appSlice.actions;
export default appSlice.reducer;
