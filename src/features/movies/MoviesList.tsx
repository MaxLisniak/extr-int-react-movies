import { useAppSelector } from "../../app/hooks"
import { useAppDispatch } from "../../app/hooks"
import { useEffect } from "react"
import { fetchMovies } from "./moviesSlice"
import { MovieCard } from "./MovieCard"
import "./MoviesList.scss";

export const MoviesList = () => {
  const status = useAppSelector(state => state.movies.status)
  const dispatch = useAppDispatch();
  const moviesCount = useAppSelector(state => state.movies.list.length)

  const scroll = () => {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 100) {
      if (status === 'idle') {
        dispatch(fetchMovies());
      }
    }
  }

  useEffect(() => {
    if (status === 'idle' && moviesCount === 0)
      dispatch(fetchMovies());
  }, [dispatch])

  useEffect(() => {
    window.addEventListener('scroll', scroll);
    return () => {
      window.removeEventListener('scroll', scroll);
    }
  })

  const movies = useAppSelector(state => state.movies.list)
  const renderedMovies = movies.map(movie => {
    return (
      <div key={movie.id}>
        <MovieCard movie={movie} />
      </div>
    )
  })
  return (
    <>
      <div className="page-title">
        <h1>Discover movies</h1>
      </div>
      <div className="movie-list">
        {renderedMovies}
      </div>
    </>
  )
}