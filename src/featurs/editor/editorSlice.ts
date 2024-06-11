import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  playGroundInputs: string;
}

const initialState: CounterState = {
  playGroundInputs: "",
};

export const navbarSlice = createSlice({
  name: "editorState",
  initialState,
  reducers: {
    setPlayGroundInputs: (state, action: PayloadAction<string>) => {
      state.playGroundInputs = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPlayGroundInputs } = navbarSlice.actions;

export default navbarSlice.reducer;
