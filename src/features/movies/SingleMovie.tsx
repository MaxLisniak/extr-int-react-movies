import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { favouriteById, movieAddedToFavourite, movieRemoveFromFavourite, selectMovieById } from "./moviesSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import configuredAxios from "../../axios/axios";
import "./SingleMovie.scss"
import StarRemove from "./star-remove.svg";
import StarAdd from "./star-add.svg";

export const SingleMovie = () => {

  let { movieId } = useParams();
  const [movie, setMovie] = useState<any>();
  const isFavourite = useAppSelector(state => favouriteById(state, Number(movieId)));

  const dispatch = useAppDispatch()

  const handleFavouriteClick = () => {
    console.log(movie)
    if (!isFavourite) {
      dispatch(movieAddedToFavourite({ movieToAdd: movie }))
    } else {
      dispatch(movieRemoveFromFavourite({ movieToRemove: movie }))
    }
  }

  useEffect(() => {
    configuredAxios.get(`movie/${movieId}`)
      .then(result => {
        setMovie(result.data)
      });
  }, [])

  console.log(movie)
  if (movie === undefined) { console.log("loading"); return <div style={{ textAlign: "center" }}><b>Loading...</b></div> }

  const renderedGenres = movie.genres.map(
    (genre: { name: string, id: number }) =>
      <li className="list-item" key={genre.id}>{genre.name}</li>
  )
  const renderedProductionCompanies = movie.production_companies.map(
    (com: { name: string, id: number }) =>
      <li className="list-item" key={com.id}>{com.name}</li>
  )
  const renderedPruductionCountries = movie.production_countries.map(
    (country: { name: string, iso_3166_1: string }) =>
      <li className="list-item" key={country.iso_3166_1}>{country.name}</li>
  )
  const renderedSpokenLanguages = movie.spoken_languages.map(
    (lan: { english_name: string, iso_639_1: string }) =>
      <li className="list-item" key={lan.iso_639_1}>{lan.english_name}</li>
  )

  return (
    <>
      <div className="page-title">
        <h1 className="title">{movie.title}
          <img
            className='fav-btn'
            src={isFavourite ? StarRemove : StarAdd}
            alt="Add to favourite"
            onClick={handleFavouriteClick}
          /></h1>
        {
          movie.title !== movie.original_title ?
            <h3>{movie.original_title}</h3> : null
        }
      </div>
      <div className="movie-view">
        <div className="left-column">
          {
            movie.poster_path ?
              <img src={`http://image.tmdb.org/t/p/w400${movie.poster_path}`} alt="Movie Poster" />
              : <div className="no-poster" >
                <span>Without Poster</span>
              </div>
          }

          <div className="colorful-box">
            {
              movie.tagline.length > 0 ?
                <div className="tagline box-item">
                  <span>"{movie?.tagline}"</span>
                </div>
                : null
            }
            <div className="release-date box-item">
              <span>release date: {movie?.release_date}</span>
            </div>
            <div className="runtime box-item">
              <span>runtime: {Math.floor(movie.runtime / 60)}h {movie.runtime - Math.floor(movie.runtime / 60) * 60}m</span>
            </div>
            <div className="budget box-item">
              <b>budget: ${movie?.budget}</b>
            </div>
            <div className="vote box-item">
              <b>{movie?.vote_average?.toFixed(1)} ⭐️ ({movie?.vote_count} votes)</b>
            </div>
            <div className="IMDb box-item">
              <a href={`https://www.imdb.com/title/${movie.imdb_id}`}>IMDb</a>
            </div>
          </div>
        </div>
        <div className="right-column">

          {movie.belongs_to_collection ?
            <>
              <p>Belongs to collection: </p>
              <ul className="horizontal-list">
                <li className="list-item">{movie.belongs_to_collection.name}</li>
              </ul>
            </> : null
          }
          {movie.genres.length > 0 ?
            <>
              <p>Genres: </p>
              <ul className="horizontal-list">
                {renderedGenres}
              </ul>
            </> : null
          }
          {movie.production_companies.length > 0 ?
            <>
              <p>Production companies: </p>
              <ul className="horizontal-list">
                {renderedProductionCompanies}
              </ul>
            </> : null
          }
          {movie.production_countries.length > 0 ?
            <>
              <p>Production countries: </p>
              <ul className="horizontal-list">
                {renderedPruductionCountries}
              </ul>
            </> : null
          }

          {movie.spoken_languages.length > 0 ?
            <>
              <p>Spoken languages: </p>
              <ul className="horizontal-list">
                {renderedSpokenLanguages}
              </ul>
            </> : null
          }
          <p><i className="overview">"{movie.overview}"</i></p>
          {
            movie.homepage !== "" ?
              <p><a className="read-more" href={movie.homepage}>Read more on the official website</a></p>
              : null
          }
        </div>
      </div>
    </>
  )
}