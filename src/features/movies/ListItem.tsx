import { Link } from "react-router-dom"
import StarRemove from "./star-remove.svg";
import StarAdd from "./star-add.svg";
import { favouriteById, movieAddedToFavourite, movieRemoveFromFavourite } from "./moviesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./ListItem.scss";

export const ListItem = (props: { movie: any }) => {

  const { movie } = props;
  const dispatch = useAppDispatch()

  const isFavourite = useAppSelector(state => favouriteById(state, movie.id));

  const handleFavouriteClick = () => {
    console.log(movie)
    if (!isFavourite) {
      dispatch(movieAddedToFavourite({ movieToAdd: movie }))
    } else {
      dispatch(movieRemoveFromFavourite({ movieToRemove: movie }))
    }
  }

  return (
    <li className="fav-list-item">
      <img
        className='remove-from-fav-btn'
        src={isFavourite ? StarRemove : StarAdd}
        alt="Add to favourite"
        onClick={handleFavouriteClick}
      />
      {/* <img className="remove-from-fav-btn" onClick={handleRemove} src={StarRemove} alt="Add / Remove from favourite" /> */}
      <Link className="link" to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
        <img className="poster" src={`http://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="Movie Poster" />
        <div>
          <h2>{movie.title}</h2>
          {
            movie.title !== movie.original_title ?
              <h3>{movie.original_title}</h3> : null
          }
          <p>release date: {movie.release_date}</p>
        </div>
      </Link>
    </li>
  )
}