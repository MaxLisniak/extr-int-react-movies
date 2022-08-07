import { useAppSelector } from './app/hooks';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./App.scss";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const favourites = useAppSelector(state => state.movies.favouriteMovies);

  const [searchInput, setSearchInput] = useState("");

  const onInputChange = (e: any) => {
    setSearchInput(e.target.value);
  }
  const navigate = useNavigate()
  const onSearchSumbit = (e: any) => {
    e.preventDefault();
    if (searchInput)
      navigate(`/search/${searchInput}`)
  }

  return (
    <>
      <nav>
        <div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1 className='brand'>Movies</h1>
          </Link>
        </div>
        <form onSubmit={onSearchSumbit} className='search'>
          <input
            required
            type="search"
            name="search"
            id="input"
            placeholder='search'
            autoComplete='off'
            onChange={onInputChange} />
          <button>🔎</button>

        </form>
        <div className="fav-counter-container">
          <Link to="/favourite" style={{ textDecoration: "none" }}>
            <button className="fav-counter">
              Favourite: {favourites.length}
            </button>
          </Link>

        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
