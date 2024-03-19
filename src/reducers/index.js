//Import the necessary libraries
import { combineReducers } from "redux";
import MovieReducer from "./MovieReducer";
import FilterReducer from "./FilterReducer";

//Combine the reducer functions into a rootReducer
const rootReducer=combineReducers({
    movies: MovieReducer,
    filters: FilterReducer
})

export default rootReducer;