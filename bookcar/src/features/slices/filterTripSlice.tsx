import { createSlice } from "@reduxjs/toolkit";

const filteredTripsSlice = createSlice({
  name: "filteredTrips",
  initialState: {
    filteredTrips: [],
    appliedFilter: {
      filterApplied: false,
      filter: null,
    },
  },
  reducers: {
    setFilteredTrips: (state, action) => {
      state.filteredTrips = action.payload;
    },
    setAppliedFilter: (state, action) => {
      state.appliedFilter = {
        filterApplied: true,
        filter: action.payload,
      };
    },
  },
});

export const { setFilteredTrips, setAppliedFilter } =
  filteredTripsSlice.actions;
export default filteredTripsSlice.reducer;
