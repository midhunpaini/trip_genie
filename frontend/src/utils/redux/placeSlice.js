import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  isLoading: true,
  isLoaded: false,
  isFailedLoading: false,
  data: [],
};
const placeSlice = createSlice({
  name: "place",
  initialState: { value: initialValue },
  reducers: {
    addPlace: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addPlace } = placeSlice.actions;

export default placeSlice.reducer;
