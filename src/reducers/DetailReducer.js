//Initial state for the detail reducer.
const initialState = {
    show: false,
    details: []
}

//Reducer function to change the state of the MovieDetails Component
const DetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case "showDetails":
            // When the 'showDetails' action is dispatched, set 'show' to true and 'details' to the payload of the action.
            return { show: true, details: action.payload };
        case "hideDetails":
            // When the 'hideDetails' action is dispatched, set 'show' to false.
            return { ...state, show: false };
        default:
            return state;
    }
}

export default DetailReducer;