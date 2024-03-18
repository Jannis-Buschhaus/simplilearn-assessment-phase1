//Set the initial State of the app
const initialState = {
    fetching: "not_fetching",
    error: "",
    apiResult: {},
    searchTerm: "",
    lastTerm: ""
};

//Create the reducer function to update the state of the app
const MovieReducer = (state = initialState, action) => {
    switch (action.type) {
        case "startFetch":
            return { ...state, fetching: "fetching", lastTerm: action.payload};
        case "endFetch":
            return { ...state, fetching: "not_fetching" };
        case "fetchSuccess":
            console.log(action.payload);
            return { ...state, error: "", apiResult: action.payload };
        case "fetchFailed":
            console.log(action.payload);
            return { ...state, error: action.payload, apiResult: {} };
        case "userInput":
            return { ...state, searchTerm: action.payload };
        default:
            return state;
    }
}

export default MovieReducer;