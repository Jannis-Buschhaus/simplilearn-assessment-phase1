// Importing modules from react, react-redux and react-bootstrap.
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

// Importing components from react-bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

//Importing Components
import Filters from './Filters';
import MovieDetails from './MovieDetails';
import FetchAlert from './FetchAlert';

// Importing stylesheets
import '../style/main.css'

//Create an object to render the Alert message to be displayed after completing the API call
const alertMsg = (() => {
    function success(msg) {
        return <><b>Success:</b> Showing reults for "{msg}"</>;
    }
    function error(msg) {
        return `An error occured: ${msg}`;
    }
    return (
        {
            success: success,
            error, error
        }
    )
}
)();

// Main component
export default function Main() {
    // Access the dispatch function to update the state of the App.
    const dispatch = useDispatch();

    // Using useSelector to access state from the Redux store
    const movieState = useSelector(state => state.movies);
    const filterState = useSelector(state => state.filters);
    const detailState = useSelector(state => state.details);

    //The function to handle show Details button click
    const showDetails = (btnKey) => {
        let details = movieState.apiResult.Search.find(
            (item) => {
                return item.imdbID == btnKey;
            }
        );
        dispatch({ type: "showDetails", payload: details });
    }

    //Map through the Array of movies and retrun a Bootstrap card for each movie. Return a Spinner animation in case the array is not yet available.
    const showResults = (genreList, ratingFilter) => {
        if (movieState.fetching != "fetching") {
            try {
                let shownMovies = [];
                shownMovies = movieState.apiResult.Search.filter(
                    (item) => {
                        if (genreList.length > 0) {
                            for (let genreFilter of genreList) {
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
                                <Card key={movie.imdbID} className='cardStyle'>
                                    <Card.Img variant="top" src={movie.Poster == "N/A" ? "/media/no_poster.jpg" : movie.Poster} />
                                    <Card.Body>
                                        <Card.Title>{movie.Title}</Card.Title>
                                        <Card.Text>
                                            <b>Year: </b>{movie.Year}<br />
                                            <b>Genre:</b> {movie.Genre}<br />
                                            <b>Imdb Rating: </b>{movie.imdbRating + "/10"}
                                        </Card.Text>
                                        <Button id={movie.imdbID} onClick={(event) => showDetails(event.target.id)} variant="danger">Show Details</Button>
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

    //Trigger an Alert Message once API Call ends in either a success or an error. Close alert message after 2 Seconds with setTimeout()
    useEffect(
        () => {
            if (movieState.fetching == "not_fetching" && (movieState.error || movieState.apiResult.Search)) {
                dispatch({ type: "showAlert" });
            }
            const timeoutID = setTimeout(
                () => {
                    dispatch({ type: "clearAlert" });
                }, 2000
            );

            return (
                () => clearTimeout(timeoutID)
            );
        }, [movieState.apiResult, movieState.error]
    );

    // Render Filter, MovieDetails, Alert and Search Results
    return (
        <>
            <Filters />
            <MovieDetails show={detailState.show} />

            <FetchAlert
                keyName="FetchResult"
                show={movieState.alert}
                msg={movieState.error ? alertMsg.error(movieState.error) : alertMsg.success(movieState.lastTerm)}
                variant={movieState.error ? "danger" : "success"} />
            <div className='cardContainer'>
                {showResults(filterState.selectedGenres, filterState.ratingMin)}
            </div>
        </>
    )
}