// Importing modules from react, axios, react-bootstrap and react-redux.
import React from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux';

// get API Key from .env File
const API_KEY=process.env.REACT_APP_API_KEY

//Header Component
export default function Header() {
    
    //Select the movieState and get its dispatch function
    const movieState = useSelector(state => state.movies);
    const dispatch = useDispatch();

    /**
    * handleSearch()
    * 1. Fetch an Array of movies from http://www.omdbapi.com/
    * 2. For each movie, get its details and enrich the array of movies with them.
    */
    const handleSearch = async () => {
        try {
            dispatch({ type: "startFetch", payload: movieState.searchTerm });
            let apiResult = await axios.get(`http://www.omdbapi.com/?s=${movieState.searchTerm}&type=movie&apikey=${API_KEY}`);
            if (apiResult.data.Response == "False") {
                dispatch({ type: "fetchFailed", payload: apiResult.data.Error })
            }
            else {
                let enrichedData = [];
                for (let movie of apiResult.data.Search) {
                    let movieResult = await axios.get(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`);
                    enrichedData.push(movieResult.data);
                }
                let returnData = { ...apiResult.data.Search, Search: enrichedData };
                dispatch({ type: "fetchSuccess", payload: returnData });
            }
        }
        catch (error) {
            dispatch({ type: "fetchFailed", payload: error });
        }
        finally {
            dispatch({ type: "endFetch" });
        }
    }

    /**
    * handleInput()
    * -> Update the search term on User input
    */

    const handleInput = (inputValue) => {
        dispatch({ type: "userInput", payload: inputValue })
    }

    //Return the Header for the page
    return (

        <Form onSubmit={(e) => { e.preventDefault(); handleSearch() }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1em" }}>
                <Form.Label className="h1" htmlFor="inputPassword5">Movie Database</Form.Label>
                <div style={{ width: "30%" }}>
                    <Form.Control onInput={(event) => handleInput(event.target.value)} type="text" id="searchTerm" placeholder='Search movie titles by name...' />
                </div>
                <Button type="submit">Search</Button>
            </div>
        </Form >

    )
}