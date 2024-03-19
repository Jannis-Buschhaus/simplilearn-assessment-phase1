import React, { useEffect } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import FilterIcon from '../media/filter.svg';

export default function Filters() {
    const filterState = useSelector(state => state.filters);
    const dispatch = useDispatch();

    const handleClose = ()=> {
        dispatch({type: "toggle"});
    }

    const handleCheckBoxChange = (event)=> {
        if(event.target.checked){
            dispatch({type: "addGenreFilter", payload: event.target.id});
        }
        else{
            dispatch({type: "removeGenreFilter", payload: event.target.id});
        }
    }

    const handleSlider = (value)=> {
        dispatch({type: "setMinRating", payload: Number(value)});
    }

    return (
        <Offcanvas className="bg-dark text-warning" show={filterState.toggle} scroll onHide={()=>handleClose()}>
            <Offcanvas.Header className='bg-danger' closeButton >
                <Offcanvas.Title ><h2><img src={FilterIcon} style={{width: "40px"}} /> Filters</h2></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <h5>Minimum Rating: {filterState.ratingMin}</h5>
                <input type="range" min="0" max="10"  id="rating" value={filterState.ratingMin} onChange={(event)=>handleSlider(event.target.value)} />
                <h5>Genre</h5>
                {filterState.availableGenres.map(
                    (genre)=>{
                        return(
                            <Form.Check onChange={(event)=>handleCheckBoxChange(event)} style={{userSelect: "none"}} key={genre} type="checkbox" id={genre} label={genre} />
                        )
                    }
                )}
            </Offcanvas.Body>
        </Offcanvas>
  )
}
