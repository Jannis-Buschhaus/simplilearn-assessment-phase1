import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useDispatch, useSelector } from 'react-redux';

export default function MovieDetails(props) {

    const dispatch = useDispatch();

    const detailState = useSelector(state => state.details);

    const handleHide = () => {
        dispatch({ type: "hideDetails" });
    }

    return (
        <Modal
            show={props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop={true}
            animation={false}
            onHide={() => handleHide()}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {detailState.details.Title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{display: "flex"}}>
                <table border="0">
                    <tbody>
                        <tr>
                            <td style={{ display: "flex", minWidth: "5vw"}}><b>Actors:</b></td><td>{detailState.details.Actors}</td>
                        </tr>
                        <tr>
                            <td style={{display: "flex"}}><b>Director:</b></td><td>{detailState.details.Director}</td>
                        </tr>
                        <tr>
                            <td style={{display: "flex"}}><b>Year:</b></td><td>{detailState.details.Year}</td>
                        </tr>
                        <tr>
                            <td style={{display: "flex"}}><b>Genre:</b></td><td>{detailState.details.Genre}</td>
                        </tr>
                        <tr>
                            <td style={{display: "flex"}}><b>Rating:</b></td><td>{detailState.details.imdbRating}</td>
                        </tr>
                        <tr>
                            <td style={{display: "flex"}}><b>Country:</b></td><td>{detailState.details.Country}</td>
                        </tr>
                        <tr>
                            <td style={{display: "flex"}}><b>Plot:</b></td><td>{detailState.details.Plot}</td>
                        </tr>
                    </tbody>
                </table>
                <img style={{height: "250px", marginLeft: "15px"}} src={detailState.details.Poster} />
                </div>
                
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-danger" onClick={() => handleHide()}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
