import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  isLoading: true,
  isLoaded: false,
  isFailedLoading: false,
  data: [],
};
const localDelicacySlice = createSlice({
  name: "localDelicacy",
  initialState: { value: initialValue },
  reducers: {
    addLocalDelicacy: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addLocalDelicacy } = localDelicacySlice.actions;

export default localDelicacySlice.reducer;
