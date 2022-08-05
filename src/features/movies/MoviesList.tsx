import { useAppSelector } from "../../app/hooks"
import { useAppDispatch } from "../../app/hooks"
import { useEffect, useState } from "react"
import { fetchMovies } from "./moviesSlice"
import { Link } from "react-router-dom"
import { nanoid } from "@reduxjs/toolkit"
import { MovieCard } from "./MovieCard"


export const MoviesList = () => {
    const status = useAppSelector(state => state.movies.status)
    const dispatch = useAppDispatch();
    const moviesCount = useAppSelector(state => state.movies.list.length)
    
    const scroll = () => {
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 20) {
        if (status === 'idle'){
          dispatch(fetchMovies());
        }
      }
    }

    useEffect(() => {      
      if (status === 'idle' && moviesCount === 0)
        dispatch(fetchMovies());
    }, [dispatch])

    useEffect(() => {
      window.addEventListener('scroll', scroll);
      return () => {
        window.removeEventListener('scroll', scroll);
      }
    })
    
    const movies = useAppSelector(state => state.movies.list)
    const renderedMovies = movies.map(movie => {
        return (
          <div key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        )
    })
    return (
        <div className="movie-list">
            {renderedMovies}
        </div>
    )
}