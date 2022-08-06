import { useAppSelector } from "../../app/hooks"
import { VerticalList } from "./VerticalList";
import "./VerticalList.scss";

export const FavouritesList = () => {
  const favourites = useAppSelector(state => state.movies.favouriteMovies);
  return (
    <VerticalList items={favourites} />
  )
}