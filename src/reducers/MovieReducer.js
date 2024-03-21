//Initial state for the MovieReducer.
const initialState = {
    fetching: "not_fetching",
    error: "",
    apiResult: {},
    searchTerm: "",
    lastTerm: "",
    alert: false
};

// Reducer function to change the state fo the Main section of the App that displays the Search Results.
const MovieReducer = (state = initialState, action) => {
    switch (action.type) {
        case "startFetch":
            // When the 'startFetch' action is dispatched, set 'fetching' to "fetching" and 'lastTerm' to the payload of the action.
            return { ...state, fetching: "fetching", lastTerm: action.payload };
        case "endFetch":
            // When the 'endFetch' action is dispatched, set 'fetching' to "not_fetching".
            return { ...state, fetching: "not_fetching" };
        case "fetchSuccess":
            // When the 'fetchSuccess' action is dispatched, set 'error' to an empty string and 'apiResult' to the payload of the action.
            console.log(action.payload);
            return { ...state, error: "", apiResult: action.payload };
        case "fetchFailed":
            // When the 'fetchFailed' action is dispatched, set 'error' to the payload of the action and 'apiResult' to an empty object.
            console.log(action.payload);
            return { ...state, error: action.payload, apiResult: {} };
        case "userInput":
            // When the 'userInput' action is dispatched, set 'searchTerm' to the payload of the action.
            return { ...state, searchTerm: action.payload };
        case "showAlert":
            // When the 'showAlert' action is dispatched, set 'alert' to true.
            return { ...state, alert: true };
        case "clearAlert":
            // When the 'clearAlert' action is dispatched, set 'alert' to false.
            return { ...state, alert: false };
        default:
            return state;
    }
}

export default MovieReducer;