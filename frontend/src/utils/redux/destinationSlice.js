import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    isLoading: false,
    isLoaded: false,
    isFailedLoading: false,
    data: [],
  };
  

  const destinationSlice = createSlice({
    name: "destination",
    initialState: { value: initialValue },
    reducers: {
      addDestination: (state, action) => {
        state.value = action.payload;
      },
    },
  });
  
  export const { addDestination } = destinationSlice.actions;
  
  export default destinationSlice.reducer;