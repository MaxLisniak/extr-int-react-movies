import { useAppSelector } from './app/hooks';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';


function App() {
  const favourites = useAppSelector(state => state.movies.favouriteMovies);
 
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
      <Outlet />
    </>
  );
}

export default App;
