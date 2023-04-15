import { createSlice } from "@reduxjs/toolkit";


const initialValue = {isLoading:false, isLoaded:false, isFailedLoading:false,data:{}}
const tripSlice = createSlice({
  name: "trip",
  initialState: { value:initialValue},
  reducers: {
    addTrip: (state,action) => {
        state.value = action.payload
    },
  },
});

export const {addTrip} = tripSlice.actions

export default tripSlice.reducer
