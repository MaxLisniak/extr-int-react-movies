import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchMovies } from './features/movies/moviesSlice';
import { MoviesList } from './features/movies/MoviesList';
import { Outlet } from 'react-router-dom';
import { fetchGenres } from './features/movies/moviesSlice';
import { Link } from 'react-router-dom';


function App() {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector(state => state.movies.favouriteMovies);

  useEffect(() => {
    dispatch(fetchGenres())
  }, [dispatch])
 
  return (
    <>
      <nav>
        <div>
          <Link to="/" style={{textDecoration: "none"}}>
            <h1 className='brand'>Movies</h1>
          </Link>
        </div>
        <div className="favourite-counter">
          <p>Favourite: {favourites.length}</p>
        </div>
      </nav>
      {/* <ol>
        {movies.map(movie => <li key={movie.id}>{movie.original_title}</li>)}
      </ol> */}
      <Outlet />
    </>
  );
}

export default App;
