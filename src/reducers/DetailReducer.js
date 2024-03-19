import React from 'react'

const initialState = {
    show: false,
    details: []
}

const DetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case "showDetails":
            return { show: true, details: action.payload };
        case "hideDetails":
            return { ...state, show: false };
        default:
            return state;
    }
}
export default DetailReducer;