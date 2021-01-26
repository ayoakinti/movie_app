import { useEffect, useReducer } from "react";

import axios from "axios";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Search from "../components/Search";
import Movie from "../components/Movie";

function Movies() {
  const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

  const initialState = {
    loading: true,
    movies: [],
    errormssg: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SEARCH_MOVIES_REQUEST":
        return {
          ...state,
          loading: true,
          errormssg: false,
        };

      case "SEARCH_MOVIES_SUCCESS":
        return {
          ...state,
          loading: false,
          movies: action.payload,
        };

      case "SEARCH_MOVIES_FAILURE":
        return {
          ...state,
          loading: false,
          errormssg: action.error,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(MOVIE_API_URL).then((res) => {
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: res.data.Search,
      });
    });
  }, []);

  const searchMovie = (searchValue) => {
    const searchUrl = `https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`;
    dispatch({
      type: "SEARCH_MOVIES_REQUEST",
    });
    axios.get(searchUrl).then((res) => {
      // console.log(res.data, "data");
      if (res.data.Response === "True") {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: res.data.Search,
        });
      } else {
        dispatch({
          type: "SEARCH_MOVIES_FAILURE",
          error: res.data.Error,
        });
      }
    });
  };

  const { movies, errormssg, loading } = state;

  let Loading = null;
  let content = null;

  if (loading) {
    Loading = <Loader />;
  }

  if (!errormssg) {
    content = (
      <div className="movies-container">
        {movies.map((movie) => (
          <Movie key={movie.imdbID} movie={movie} />
        ))}
      </div>
    );
  } else {
    content = (
      <div className="error-container">
        <div className="error">{errormssg}</div>
      </div>
    );
  }
  return (
    <div>
      {Loading}

      <Header title="Movie Search" />
      <Search search={searchMovie} />
      {content}
    </div>
  );
}

export default Movies;
