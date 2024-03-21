// The Filters component that provides an interface for users to filter the search results.

//Importing the necessary libraries.
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Importing react-bootstrap components
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';

//Importing the Filter Icon
import FilterIcon from '../media/filter.svg';

//The Filters component
export default function Filters() {
    //Access the filterState
    const filterState = useSelector(state => state.filters);
    const dispatch = useDispatch();

    //The function to close the Filters Component
    const handleClose = () => {
        dispatch({ type: "toggle" });
    }

    //The function to update the list of selected Genres to filter the search results
    const handleCheckBoxChange = (event) => {
        if (event.target.checked) {
            dispatch({ type: "addGenreFilter", payload: event.target.id });
        }
        else {
            dispatch({ type: "removeGenreFilter", payload: event.target.id });
        }
    }

    //The function to update the minimum Rating filter for the search results
    const handleSlider = (value) => {
        dispatch({ type: "setMinRating", payload: Number(value) });
    }

    //return the Component
    return (
        <Offcanvas className="bg-dark text-warning" show={filterState.toggle} scroll onHide={() => handleClose()}>
            <Offcanvas.Header className='bg-danger' closeButton >
                <Offcanvas.Title ><h2><img src={FilterIcon} style={{ width: "40px" }} /> Filters</h2></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <h5>Minimum Rating: {filterState.ratingMin}</h5>
                <input type="range" min="0" max="10" id="rating" value={filterState.ratingMin} onChange={(event) => handleSlider(event.target.value)} />
                <h5>Genre</h5>
                {filterState.availableGenres.map(
                    (genre) => {
                        return (
                            <Form.Check onChange={(event) => handleCheckBoxChange(event)} style={{ userSelect: "none" }} key={genre} type="checkbox" id={genre} label={genre} />
                        )
                    }
                )}
            </Offcanvas.Body>
        </Offcanvas>
    )
}
