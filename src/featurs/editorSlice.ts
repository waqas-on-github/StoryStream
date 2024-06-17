import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  playGroundInputs: string;
}

const initialState: CounterState = {
  playGroundInputs: "",
};

export const editorSlice = createSlice({
  name: "editorState",
  initialState,
  reducers: {
    setPlayGroundInputs: (state, action: PayloadAction<string>) => {
      state.playGroundInputs = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPlayGroundInputs } = editorSlice.actions;

export default editorSlice.reducer;
