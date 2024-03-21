// Importing modules from react, react-redux and react-bootstrap.
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
// for MovieDetails: https://react-bootstrap.netlify.app/docs/components/modal -> See Vertically centered -> import Modal from 'react-bootstrap/Modal';

//Import Components
import Filters from './Filters';
import MovieDetails from './MovieDetails';
import FetchAlert from './FetchAlert';

const alertMsg = (()=>{
    function success(msg){
        return <><b>Success:</b> Showing reults for "{msg}"</>;
    }
    function error(msg){
        return `An error occured: ${msg}`;
    }
    return(
        {
            success: success,
            error, error
        }
    )
}
)();

// Main component
export default function Main() {

    const dispatch = useDispatch();

    // Using useSelector to access state from the Redux store
    const movieState = useSelector(state => state.movies);
    const filterState = useSelector(state => state.filters);
    const detailState = useSelector(state => state.details);

    //handle show Details button click
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

    //Trigger an Alert Message, once API Fetch ends in either a success or an error. Close alert message after 2 Seconds with setTimeout().
    useEffect(
        ()=>{
            if(movieState.fetching == "not_fetching" && (movieState.error || movieState.apiResult.Search)){
                dispatch({type: "showAlert"});
            }
            const timeoutID = setTimeout(
                ()=>{
                    dispatch({type: "clearAlert"});
                }, 2000
            );
            
            return(
                ()=>clearTimeout(timeoutID)
            );
        }, [movieState.apiResult, movieState.error]
    );

    // Render Alert and Search Results
    return (
        <>
            <Filters />
            <MovieDetails show={detailState.show} />

            <FetchAlert 
                keyName="FetchResult" 
                show={movieState.alert} 
                msg={movieState.error ? alertMsg.error(movieState.error) : alertMsg.success(movieState.lastTerm)} 
                variant={movieState.error ? "danger" : "success"} />
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {showResults(filterState.selectedGenres, filterState.ratingMin)}
            </div>
        </>
    )
}