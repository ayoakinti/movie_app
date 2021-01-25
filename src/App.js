import { useEffect, useReducer } from "react";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Search from "./components/Search";
import Movie from "./components/Movie";
import axios from "axios";
import "./App.css";

function App() {
  const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";
  // const [request, setrequest] = useState({
  //   loading: true,
  //   movies: [],
  //   errormssg: false,
  // });

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

  // const searchMovie = (searchValue) => {
  //   // console.log(searchValue, "searchvalue");
  //   const searchUrl = `https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`;
  //   setrequest({
  //     loading: true,
  //     movies: [],
  //     errormssg: false,
  //   });
  //   axios
  //     .get(searchUrl)
  //     .then((res) => {
  //       // console.log(res.data, "data");
  //       if (res.data.Response === "True") {
  //         setrequest({
  //           loading: false,
  //           movies: res.data.Search,
  //           errormssg: false,
  //         });
  //       } else {
  //         setrequest({
  //           loading: false,
  //           movies: [],
  //           errormssg: res.data.Error,
  //         });
  //         // console.log(res.data.Error);
  //       }
  //     })
  //     .catch((err) => console.error(err));
  // };

  // useEffect(() => {
  //   axios
  //     .get(MOVIE_API_URL)
  //     .then((res) => {
  //       setrequest({
  //         loading: false,
  //         movies: res.data.Search,
  //         errormssg: false,
  //       });
  //       // console.log(res.data.Search, "data");
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

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
    <div className="App">
      {Loading}
      <Header title="Movie Search" />
      <Search search={searchMovie} />
      {content}
    </div>
  );
}

export default App;
