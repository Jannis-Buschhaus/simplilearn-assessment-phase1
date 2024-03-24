//Initial state for the FilterReducer
const initialState = {
    toggle: false,
    ratingMin: 1,
    genreFilter: "",
    selectedGenres: [],
    availableGenres: []
};

//Reducer dunction to change the state of the component Filters
const FilterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "toggle":
            // When the 'toggle' action is dispatched, flip the value of 'toggle' in the state.
            return { ...state, toggle: !state.toggle };
        case "setMinRating":
            // When the 'setMinRating' action is dispatched, set 'ratingMin' to the payload of the action.
            return { ...state, ratingMin: action.payload };
        case "resetGenres":
            // When the 'resetGenres' action is dispatched, reset 'availableGenres' to an empty array.
            return { ...state, availableGenres: [] };
        case "addGenre":
            // When the 'addGenre' action is dispatched, add the genre from the payload to 'availableGenres'.
            const items = action.payload.split(',').map(item => item.trim());
            const genreList = new Set([...state.availableGenres, ...items]);
            return { ...state, availableGenres: Array.from(genreList) };
        case "addGenreFilter":
            // When the 'addGenreFilter' action is dispatched, add the genre from the payload to the 'selectedGenres' array.
            let newFilterArray = state.selectedGenres;
            newFilterArray.push(action.payload);
            return { ...state, selectedGenres: newFilterArray };
        case "removeGenreFilter":
            // When the 'removeGenreFilter' action is dispatched, remove the genre from the payload from the 'selectedGenres' array.
            const reducedFilterArray = state.selectedGenres.filter(item => item !== action.payload);
            return { ...state, selectedGenres: reducedFilterArray };
        case "clearFilter":
            return { ...state, selectedGenres: [] };
        default:
            return state;
    }
}

export default FilterReducer;