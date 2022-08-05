import { useAppSelector } from "../../app/hooks"
import { selectMovieById } from "./moviesSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const SingleMovie = () => {
  let { movieId } = useParams();    
  const movie = useAppSelector<any>(state => selectMovieById(state, Number(movieId)))
  const genres = useAppSelector<any>(state => state.movies.genres)
  const renderedGenres = genres.length > 0 && movie.genre_ids.map((genre: any) => {
    const matched = genres.find((fetchedGenre: { id: any; }) => fetchedGenre.id === genre)
    return <li className="genre" key={matched.id}>{matched.name}</li>
  }
  )

  return (
    <div className="movie-container">
      <img src={`http://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="Movie Poster" />
      <div className="movie-info">
        <h1>{movie.title}</h1>
        {
          movie.title !== movie.original_title ?
          <h3>{movie.original_title}</h3> : null
        }
        Release date: <b>{movie.release_date}</b>
        {renderedGenres.length > 0 ?
          <ul>
            Genres: 
            {renderedGenres}
          </ul>
          : null
        }
        <p>{movie.overview}</p>
      </div>
    </div>
  )
}