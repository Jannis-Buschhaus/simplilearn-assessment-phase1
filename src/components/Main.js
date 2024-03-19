// Importing modules from react, react-redux and react-bootstrap.
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
// for MovieDetails: https://react-bootstrap.netlify.app/docs/components/modal -> See Vertically centered -> import Modal from 'react-bootstrap/Modal';

//Import Components
import Filters from './Filters';
import MovieDetails from './MovieDetails';

// Main component
export default function Main() {

    const dispatch = useDispatch();

    // Using useSelector to access state from the Redux store
    const movieState = useSelector(state => state.movies);
    const filterState = useSelector(state => state.filters);
    const detailState = useSelector(state => state.details);

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

    const showDetails = (btnKey)=> {
        let details = movieState.apiResult.Search.find(
            (item)=> {
                return item.imdbID == btnKey;
            }
        );
        dispatch({type: "showDetails", payload: details});
    }

    //Map through the Array of movies and retrun a Bootstrap card for each movie. Return a Spinner animation in case the array is not yet present.
    const showResults = (genreList, ratingFilter) => {
        if (movieState.fetching != "fetching") {
            try {
                let shownMovies = [];
                shownMovies = movieState.apiResult.Search.filter(
                    (item) => {
                        if (genreList.length > 0) {
                            for (let genreFilter of genreList) {
                                //console.log(item.Title+" -> "+item.Genre+" includes "+genreFilter+"? "+String(item.Genre.toLowerCase().includes(genreFilter.toLowerCase())));
                                if (item.Genre.toLowerCase().includes(genreFilter.toLowerCase()) && Number(item.imdbRating) >= ratingFilter) {
                                    return true;
                                }
                            }
                        }
                        else {
                            if (Number(item.imdbRating) >= ratingFilter) {
                                return true;
                            }
                        }
                        return false;

                    }
                )
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
                                        <Button id={movie.imdbID} onClick={(event)=>showDetails(event.target.id)} variant="danger">Show Details</Button>
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
        else {
            return <Spinner animation="border" variant="warning" />
        }
    }

    // Render Alert and Search Results
    return (
        <div>
            <Filters />
            <MovieDetails show={detailState.show} />
            {showAlert()}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {showResults(filterState.selectedGenres, filterState.ratingMin)}
            </div>
        </div>
    )
}