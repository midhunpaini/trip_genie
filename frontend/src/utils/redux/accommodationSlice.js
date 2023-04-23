import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  isLoading: true,
  isLoaded: false,
  isFailedLoading: false,
  data: [],
};
const accommodationSlice = createSlice({
  name: "accommodation",
  initialState: { value: initialValue },
  reducers: {
    addAccomodation: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addAccomodation } = accommodationSlice.actions;

export default accommodationSlice.reducer;
