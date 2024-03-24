// Importing the neccessary libraries
import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Importing the react-bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//Importing the filter icon
import FilterIcon from '../media/filter.svg';

// Importing stylesheets
import '../style/header.css'

// get API Key from .env File
const API_KEY = process.env.REACT_APP_API_KEY;

//Header Component
export default function Header() {

    //Select the filterState
    const filterState = useSelector(state => state.filters);

    //Select the movieState and get the dispatch function
    const movieState = useSelector(state => state.movies);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    //The function to fetch the movies from the API
    const handleSearch = async () => {
        //navigate to the /movies/ page to display the results, in case the search was triggered from the /home/ page
        navigate("/movies/");
        
        //try to fetch results using axios
        try {
            dispatch({ type: "startFetch", payload: movieState.searchTerm });
            let apiResult = await axios.get(`http://www.omdbapi.com/?s=${movieState.searchTerm}&type=movie&apikey=${API_KEY}`);
            if (apiResult.data.Response == "False") {
                dispatch({ type: "fetchFailed", payload: apiResult.data.Error })
            }
            else {
                let enrichedData = [];
                dispatch({ type: "resetGenres" });
                for (let movie of apiResult.data.Search) {
                    let movieResult = await axios.get(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`);
                    enrichedData.push(movieResult.data);
                    dispatch({ type: "addGenre", payload: movieResult.data.Genre });
                }
                let returnData = { ...apiResult.data.Search, Search: enrichedData };
                dispatch({ type: "fetchSuccess", payload: returnData });
            }
        }
        //catch the error and update the state accordingly
        catch (error) {
            dispatch({ type: "fetchFailed", payload: error });
        }
        //finally, update the state of the App to indicate that the fetching was completed.
        finally {
            dispatch({ type: "endFetch" });
        }
    }

    //The function to update the state of the App with the user input
    const handleInput = (inputValue) => {
        dispatch({ type: "userInput", payload: inputValue });
    }

    //The functon to toggle the Filter component
    const handleFilterClick = () => {
        dispatch({ type: "toggle" });
    }

    //Return the Header for the page
    return (
        <Form onSubmit={(e) => { e.preventDefault(); dispatch({ type: "clearFilter" }); handleSearch() }}>
            <div className='headerContainer'>
                <Form.Label className="h1" htmlFor="searchTerm"><a style={{ cursor: "pointer" }} onClick={() => navigate("/home/")}>Movie Database</a></Form.Label>
                <div className='inputField'>
                    <Form.Control autoComplete="off" required onInput={(event) => handleInput(event.target.value)} type="text" id="searchTerm" placeholder='Search movie titles by name...' />
                </div>
                <Button style={{ width: "150px" }} variant="danger" type="submit" disabled={movieState.fetching == "fetching"} >
                    {movieState.fetching == "fetching" ? "Loading" : "Search"}
                </Button>
                <Routes>
                    <Route path="movies" element={<a style={{ userSelect: "none", cursor: "pointer" }} onClick={(e) => { handleFilterClick() }} ><img src={FilterIcon} style={{ width: "30px" }} /> Filters</a>}>
                    </Route>
                </Routes>
            </div>
        </Form >
    )
}