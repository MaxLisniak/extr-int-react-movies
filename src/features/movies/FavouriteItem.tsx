import { Link } from "react-router-dom"
import StarRemove from "./star-remove.svg";
import { movieRemoveFromFavourite } from "./moviesSlice";
import { useAppDispatch } from "../../app/hooks";

export const FavouriteItem = ({movie}: any) => {
    
    const dispatch = useAppDispatch()
    const handleRemove = () => {
        dispatch(movieRemoveFromFavourite({movieId: movie.id}))
    }
    
    return (
        <li className="fav-li">
            <img className="fav-list-btn" onClick={handleRemove} src={StarRemove} alt="Remove from favourite" />
            <Link to={`/movie/${movie.id}`} style={{textDecoration: "none"}}>
                <img className="fav-list-img" src={`http://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="Movie Poster" />
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