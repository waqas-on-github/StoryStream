import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  isEditOpen: boolean;
}

const initialState: CounterState = {
  isEditOpen: false,
};

export const navbarSlice = createSlice({
  name: "commentState",
  initialState,
  reducers: {
    setEdit: (state, action: PayloadAction<boolean>) => {
      state.isEditOpen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEdit } = navbarSlice.actions;

export default navbarSlice.reducer;
