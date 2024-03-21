// Import the necessary libraries for Redux state management.
import { combineReducers } from "redux";

// Import all reducers to combine.
import MovieReducer from "./MovieReducer";
import FilterReducer from "./FilterReducer";
import DetailReducer from "./DetailReducer";

// Combine all reducers into the rootReducer
const rootReducer = combineReducers({
    movies: MovieReducer,
    filters: FilterReducer,
    details: DetailReducer
})

export default rootReducer;