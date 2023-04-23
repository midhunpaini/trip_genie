import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  isLoading: true,
  isLoaded: false,
  isFailedLoading: false,
  data: [],
};
const travelOptionSlice = createSlice({
  name: "travelOption",
  initialState: { value: initialValue },
  reducers: {
    addTravelOption: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addTravelOption } = travelOptionSlice.actions;

export default travelOptionSlice.reducer;
