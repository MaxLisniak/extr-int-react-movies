import { useAppSelector } from "../../app/hooks"
import { NotFound } from "./NotFound";
import { VerticalList } from "./VerticalList";
import "./VerticalList.scss";

export const FavouritesList = () => {
  const favourites = useAppSelector(state => state.movies.favouriteMovies);
  if (favourites.length === 0)
    return (
      <NotFound msg="You have no favourite movies" />
    )
  return (
    <VerticalList items={favourites} />
  )
}