//Set the initial State of the app
const initialState = {
    show: false,
    ratingMin: "",
    ratingMax: {},
    genre: "",
    availableGenres: []
};

//Create the reducer function to update the state of the app
const FilterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "toggle":
            return { ...state, toggle: !state.toggle};
        case "updateGenre":
            return {...state, genre: action.payload };
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
            return {...state, availableGenres: genreList};
        default:
            return state;
    }
}

export default FilterReducer;