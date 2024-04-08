import { combineReducers } from 'redux';
import filteredTripsReducer from '../features/slices/filterTripSlice';

const rootReducer = combineReducers({
  filteredTrips: filteredTripsReducer,
});

export default rootReducer;
