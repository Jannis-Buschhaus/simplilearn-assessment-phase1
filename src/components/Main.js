// Importing modules from react, react-redux and react-bootstrap.
import React from 'react'
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
// for MovieDetails: https://react-bootstrap.netlify.app/docs/components/modal -> See Vertically centered -> import Modal from 'react-bootstrap/Modal';

//Import Components
import Filters from './Filters';

// Main component
export default function Main() {

    // Using useSelector to access state from the Redux store
    const movieState = useSelector(state => state.movies);
    const filterState = useSelector(state => state.filters);

    //Show an Error message, if There was an Error returned during fetch attempt. In case the API call was successfull, show the recent search term.
    const showAlert = () => {
        if (movieState.error) {
            return (
                <div style={{ position: "relative", top: "0" }}>
                    <Alert key="FetchResult" variant="danger">
                        An error occured:  "{movieState.error}"
                    </Alert>
                </div>

            )
        }
        else if (movieState.apiResult.Search) {
            return (
                <div style={{ position: "relative", top: "0" }}>
                    <Alert key="FetchResult" variant="success">
                        Success: showing results for <b>"{movieState.lastTerm}"</b>
                    </Alert>
                </div >
            )
        }
    }

    //Map through the Array of movies and retrun a Bootstrap card for each movie. Return "No data." in case the array is not yet present.
    const showResults = (filter) => {
        if(movieState.fetching != "fetching"){
            try {
                let shownMovies = [];
                filter ? shownMovies = movieState.apiResult.Search.filter((item)=>{return(item.Genre.toLowerCase().includes(filter.toLowerCase()))}) : shownMovies = movieState.apiResult.Search;
                return (shownMovies.map(
                    (movie) => {
                        if (movie.Type == "movie") {
                            return (
                                <Card key={movie.imdbID} style={{ width: '18rem', margin: "20px" }}>
                                    <Card.Img variant="top" src={movie.Poster == "N/A" ? "/media/no_poster.jpg" : movie.Poster} />
                                    <Card.Body>
                                        <Card.Title>{movie.Title}</Card.Title>
                                        <Card.Text>
                                            <b>Year: </b>{movie.Year}<br />
                                             <b>Genre:</b> {movie.Genre}<br />
                                            <b>Imdb Rating: </b>{movie.imdbRating + "/10"}
                                        </Card.Text>
                                        <Button variant="danger">Show Details</Button>
                                    </Card.Body>
                                </Card>
                            )
                        }
                    }
                ))
            }
            catch (e) {
                return ("")
            }
        }
        else{
            return <Spinner animation="border" variant="warning" />
        }
    }

    // Render Alert and Search Results
    return (
        <div>
            <Filters />
            {showAlert()}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {showResults(filterState.genre)}
            </div>
        </div>
    )
}