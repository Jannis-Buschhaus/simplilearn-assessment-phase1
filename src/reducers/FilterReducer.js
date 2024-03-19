//Set the initial State of the app
const initialState = {
    show: false,
    ratingMin: 1,
    genreFilter: "",
    selectedGenres: [],
    availableGenres: []
};

//Create the reducer function to update the state of the app
const FilterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "toggle":
            return { ...state, toggle: !state.toggle};
        case "setMinRating":
            return {...state, ratingMin: action.payload };
        case "resetGenres":
            return {...state, availableGenres: [] };
        case "addGenre":
            let items = action.payload.split(',');
            let genreList = state.availableGenres;
            for(let item of items){
                if(!state.availableGenres.includes(item.trim())){
                    genreList.push(item.trim());
                }
            }
            return { ...state, availableGenres: genreList };
        case "addGenreFilter":
            let newFilterArray = state.selectedGenres;
            newFilterArray.push(action.payload);
            return { ...state, selectedGenres: newFilterArray };
        case "removeGenreFilter":
            let reducedFilterArray = state.selectedGenres.filter(
                (item) => {
                    if(item != action.payload){
                        return true;
                    }
                    else{
                        return false;
                    }
                }
            );
            return { ...state, selectedGenres: reducedFilterArray };
        default:
            return state;
    }
}

export default FilterReducer;