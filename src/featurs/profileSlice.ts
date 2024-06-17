import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  isEditDialogOpen: boolean;
}

const initialState: CounterState = {
  isEditDialogOpen: false,
};

export const profileSlice = createSlice({
  name: "profileState",
  initialState,
  reducers: {
    setEditDialogState: (state, action: PayloadAction<boolean>) => {
      state.isEditDialogOpen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEditDialogState } = profileSlice.actions;

export default profileSlice.reducer;
