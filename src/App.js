import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Search from "./components/Search";
import Movie from "./components/Movie";
import axios from "axios";
import "./App.css";

function App() {
  // const url = "http://www.omdbapi.com/?i=tt3896198&apikey=79828674";
  const url = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";
  const [request, setrequest] = useState({
    loading: true,
    movies: [],
  });
  const [currentMovies, setcurrentMovies] = useState([]);

  const searchMovie = (searchValue) => {
    let currentmovies = request.movies.filter(movie => movie.Title.toLowerCase().includes(searchValue.toLowerCase()));
    // console.log(request.movies, "original movies");
    setcurrentMovies(currentmovies);
    // console.log(currentmovies, "current movies");
  }

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setcurrentMovies(res.data.Search);
        setrequest({
          loading: false,
          movies: res.data.Search,
        });
        // console.log(res.data.Search, "data");
      })
      .catch((err) => console.error(err));
  }, [url]);

  let Loading = null;

  if (request.loading) {
    Loading = <Loader />;
  }

  return (
    <div className="App">
      {Loading}
      <Header title="Hooked" />
      <Search search={searchMovie} />
      <div className="movies-container">
        {currentMovies.map((movie) => (
          <Movie key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
