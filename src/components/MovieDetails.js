//Tis is the popup component to display more details on the selected movie.

//Importing the neccessary libraries
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Importing components from react-
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Importing stylesheets
import '../style/movieDetails.css'

// The movieDetails component
export default function MovieDetails(props) {
    //Access the dispatch function to update the state of the app.
    const dispatch = useDispatch();

    // Access the detailState from the Reux store.
    const detailState = useSelector(state => state.details);

    // The function to hide the component
    const handleHide = () => {
        dispatch({ type: "hideDetails" });
    }

    //return the Filters component
    return (
        <Modal
            show={props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop={true}
            animation={false}
            onHide={() => handleHide()} >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {detailState.details.Title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='detailContainer'>
                    <table border="0">
                        <tbody>
                            <tr>
                                <td><b>Actors:</b></td><td>{detailState.details.Actors}</td>
                            </tr>
                            <tr>
                                <td><b>Director:</b></td><td>{detailState.details.Director}</td>
                            </tr>
                            <tr>
                                <td><b>Year:</b></td><td>{detailState.details.Year}</td>
                            </tr>
                            <tr>
                                <td><b>Genre:</b></td><td>{detailState.details.Genre}</td>
                            </tr>
                            <tr>
                                <td><b>Rating:</b></td><td>{detailState.details.imdbRating}</td>
                            </tr>
                            <tr>
                                <td><b>Country:</b></td><td>{detailState.details.Country}</td>
                            </tr>
                            <tr>
                                <td><b>Plot:</b></td><td>{detailState.details.Plot}</td>
                            </tr>
                        </tbody>
                    </table>
                    <img className='poster' src={detailState.details.Poster} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-danger" onClick={() => handleHide()}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
