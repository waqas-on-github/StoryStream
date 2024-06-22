import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  playGroundInputs: string;
  featureimageUrl: string;
}

const initialState: CounterState = {
  playGroundInputs: "",
  featureimageUrl: "",
};

export const editorSlice = createSlice({
  name: "editorState",
  initialState,
  reducers: {
    setPlayGroundInputs: (state, action: PayloadAction<string>) => {
      state.playGroundInputs = action.payload;
    },

    setFeatureImageUrl: (state, action: PayloadAction<string>) => {
      state.featureimageUrl = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPlayGroundInputs, setFeatureImageUrl } = editorSlice.actions;

export default editorSlice.reducer;
