import { useAppSelector } from "../../app/hooks"
import { FavouriteItem } from "./FavouriteItem";

export const FavouritesList = () => {
    const favourites = useAppSelector(state => state.movies.favouriteMovies);
    return (
        <ul className="fav-list">
            {favourites.map(fav => {
                return <FavouriteItem key={fav.id} movie={fav} />
            })}
        </ul>
    )
}