function Movie(props) {
    return (
        <div className='movie-container'>
            <h1>{props.movie.Title}</h1>
            <img src={props.movie.Poster} alt={props.movie.Title}></img>
            <p>({props.movie.Year})</p>
        </div>
    )
}

export default Movie;