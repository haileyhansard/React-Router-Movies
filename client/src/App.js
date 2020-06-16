import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Switch, Route, Link } from "react-router-dom";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";

import SavedList from './Movies/SavedList';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = movie => {
    setSavedList(savedlist => [...savedList, movie]);
  };

  return (
    <div>
      <SavedList list={savedList} />
        <div>
          <Switch>
            <Route path="/movies/:movieId">
              <Movie />
            </Route>  
            <Route path="/"> 
              <MovieList movies={movieList}/>
            </Route>
          </Switch>
        </div>
    </div>
  );
};

export default App;
