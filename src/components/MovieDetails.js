//Tis is the popup component to display more details on the selected movie.

//Importing the neccessary libraries
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Importing components from react-
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
                <div style={{ display: "flex" }}>
                    <table border="0">
                        <tbody>
                            <tr>
                                <td style={{ display: "flex", minWidth: "5vw" }}><b>Actors:</b></td><td>{detailState.details.Actors}</td>
                            </tr>
                            <tr>
                                <td style={{ display: "flex" }}><b>Director:</b></td><td>{detailState.details.Director}</td>
                            </tr>
                            <tr>
                                <td style={{ display: "flex" }}><b>Year:</b></td><td>{detailState.details.Year}</td>
                            </tr>
                            <tr>
                                <td style={{ display: "flex" }}><b>Genre:</b></td><td>{detailState.details.Genre}</td>
                            </tr>
                            <tr>
                                <td style={{ display: "flex" }}><b>Rating:</b></td><td>{detailState.details.imdbRating}</td>
                            </tr>
                            <tr>
                                <td style={{ display: "flex" }}><b>Country:</b></td><td>{detailState.details.Country}</td>
                            </tr>
                            <tr>
                                <td style={{ display: "flex" }}><b>Plot:</b></td><td>{detailState.details.Plot}</td>
                            </tr>
                        </tbody>
                    </table>
                    <img style={{ height: "250px", marginLeft: "15px" }} src={detailState.details.Poster} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-danger" onClick={() => handleHide()}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
