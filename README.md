### This is my frontend project for the Simplilearn Phase 1 Assessment.

### How it works
    This App fetches movie data from an API at http://www.omdbapi.com/. The API call is based on a search string provided by the user in the input field at the top.
    Upon successfully fetching from the API, a card component is rendered for each Movie returned from the API with a "Show Details" button to view more information on the movie.
    When clicking the filter icon next to the "Search" Button, a side bar component is opened, which lets the user apply further filters on the retrieved search result based on rating and genre.

### Technologies used
    - React as a frontend JavaScript Library/Framework
    - npm packages:
        - create-react-app for creating the basic project structure and as the development server
        - bootstrap and react-bootstrap for styling the Components and for rendering prebuilt components form the react-bootstrap framework
        - react-redux to handle the state of the search results, the search filters and movie details
        - react-router and react-router-dom to route between /home/ and /movies/ for the search results.
        - axios to handle the API calls