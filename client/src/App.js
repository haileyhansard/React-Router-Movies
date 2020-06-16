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
    setSavedList([...savedList, movie]);
  };

  return (
    <div>
    

      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList}>
        <MovieList movies={movieList}/>
      </Route>
      <Route path="/movies/:movieId" component={movieList}/>

    </div>
  );
};

export default App;
