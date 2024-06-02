import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  isProfileDialogOpen: boolean;
}

const initialState: CounterState = {
  isProfileDialogOpen: false,
};

export const navbarSlice = createSlice({
  name: "navbarstate",
  initialState,
  reducers: {
    setProfileDialog: (state, action: PayloadAction<boolean>) => {
      state.isProfileDialogOpen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProfileDialog } = navbarSlice.actions;

export default navbarSlice.reducer;
