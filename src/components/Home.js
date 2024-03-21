//Importing the neccessary libraries
import React from 'react'

//Importing stylesheets
import '../style/home.css'

//The Home component to be displayed on the /home/ page
export default function Home() {

    //return the Home component
    return (
        <>
            <h1 className='bg-info'>Welcome to my Movie API App</h1>
            <h4>This is my frontend project for the Simplilearn Phase 1 Assessment.</h4>
            <main>
                <p>
                    <dl>
                        <dt>How it works</dt>
                        <dd>
                            This App fetches movie data from an API at <a href="http://www.omdbapi.com/" target="_blank">http://www.omdbapi.com/</a>.
                            The API call is based on a search string provided by the user in the input field at the top.
                        </dd>
                        <dd>
                            Upon successfully fetching from the API, a card component is rendered for each Movie returned from the API with a "Show Details" button to view more information on the movie.
                        </dd>
                        <dd>
                            When clicking the filter icon next to the "Search" Button, a side bar component is opened, which lets the user apply further filters on the retrieved search result based on rating and genre.
                        </dd>
                    </dl>
                </p>
                <p>
                    <dl>
                        <dt>Technologies used</dt>
                        <dd>
                            React as a frontend JavaScript Library/Framework
                        </dd>
                        <dd>
                            npm packages:
                            <ul>
                                <li><b>create-react-app</b> for creating the basic project structure and as the development server</li>
                                <li><b>bootstrap</b> and <b>react-bootstrap</b> for styling the Components and for rendering prebuilt components form the <a href="https://react-bootstrap.netlify.app/" target="_blank" >react-bootstrap framework</a></li>
                                <li><b>react-redux</b> to handle the state of the search results, the search filters and movie details</li>
                                <li><b>react-router</b> and <b>react-router-dom</b> to route between /home/ and /movies/ for the search results.</li>
                                <li><b>axios</b> to handle the API calls</li>
                            </ul>
                        </dd>
                    </dl>
                </p>
                <p>
                    Created by Jannis Robin Buschhaus
                </p>
            </main>

        </>
    )
}
