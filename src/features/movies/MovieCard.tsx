import StarAdd from './star-add.svg'
import StarRemove from './star-remove.svg'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useState } from 'react'
import { movieAddedToFavourite, movieRemoveFromFavourite } from './moviesSlice'
import { favouriteById } from './moviesSlice'
import "./MovieCard.scss";

export const MovieCard = ({ movie }: any) => {
  const dispatch = useAppDispatch();
  const isFavourite = useAppSelector(state => favouriteById(state, movie.id));

  const handleFavouriteClick = () => {
    if (!isFavourite) {
      dispatch(movieAddedToFavourite({ movieToAdd: movie }))
    } else {
      dispatch(movieRemoveFromFavourite({ movieToRemove: movie }))
    }
  }

  return (
    <div className='movie-card'>
      <img
        className='fav-btn'
        src={isFavourite ? StarRemove : StarAdd}
        alt="Add to favourite"
        onClick={handleFavouriteClick}
      />
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
        <img className='poster' src={`http://image.tmdb.org/t/p/w300${movie.poster_path}`} alt="Movie Poster" />
        <div className="titles">
          <h2>{movie.title}</h2>
          {
            movie.title !== movie.original_title ?
              <h3>{movie.original_title}</h3> : null
          }

        </div>
      </Link>
    </div>
  )
}