import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';

export default function Filters() {
    const filterState = useSelector(state => state.filters);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch({type: "toggle"});
    }

    const handleGenreInput = (value) => {
        dispatch({ type:"updateGenre", payload: value })
    }

    return (
        <Offcanvas className="bg-dark text-warning" show={filterState.toggle} scroll onHide={()=>handleClose()}>
            <Offcanvas.Header closeButton closeVariant='white'>
                <Offcanvas.Title ><h2>Filters</h2></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <h5>Rating</h5>
                <h5>Genre</h5>
                <Form.Control value={filterState.genre} onInput={(event)=>{handleGenreInput(event.target.value)}} type="text" placeholder="Search for a genre"/>
                {filterState.availableGenres.map(
                    (genre)=>{
                        return(
                            <Form.Check style={{userSelect: "none"}} key={genre} type="checkbox" id={genre} label={genre} defaultChecked />
                        )
                    }
                )}
            </Offcanvas.Body>
        </Offcanvas>
  )
}
