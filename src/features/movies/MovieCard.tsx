import StarAdd from './star-add.svg'
import StarRemove from './star-remove.svg'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { useState } from 'react'
import { movieAddedToFavourite, movieRemoveFromFavourite } from './moviesSlice'

export const MovieCard = ({ movie }:any) => {
  const dispatch = useAppDispatch();
  const [isFavourite, setIsFavourite] = useState(false);

  const handleFavouriteClick = () => {
    if (!isFavourite){
      dispatch(movieAddedToFavourite({movieId: movie.id}))
      setIsFavourite(true)
    } else {
      dispatch(movieRemoveFromFavourite({movieId: movie.id}))
      setIsFavourite(false)
    }
  }

  return(
    <div className='movie-card'>
      <img 
      className='fav-btn' 
      src={isFavourite ? StarRemove : StarAdd} 
      alt="Add to favourite"
      onClick={handleFavouriteClick} 
      />
      <Link to={`/movie/${movie.id}`} style={{textDecoration: 'none'}}>
        <img src={`http://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="Movie Poster" />
        <h2>{movie.title}</h2>
        {
          movie.title !== movie.original_title ?
          <h3>{movie.original_title}</h3> : null
        }
      </Link>
    </div>
  )
}