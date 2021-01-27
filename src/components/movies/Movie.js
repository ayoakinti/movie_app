function Movie(props) {
  const defaultPoster =
    "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

  let poster =
    props.movie.Poster === "N/A" ? defaultPoster : props.movie.Poster;

  return (
    <div className="movie-container">
      <h1>{props.movie.Title}</h1>
      <img src={poster} alt={props.movie.Title}></img>
      <p>({props.movie.Year})</p>
    </div>
  );
}

export default Movie;
