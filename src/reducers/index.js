//Import the necessary libraries
import { combineReducers } from "redux";
import MovieReducer from "./MovieReducer";

//Combine the reducer functions into a rootReducer
const rootReducer=combineReducers({
    movies: MovieReducer,
})

export default rootReducer;