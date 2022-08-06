import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import configuredAxios from "../../axios/axios";

export interface MoviesState {
  list: any[];
  status: 'idle' | 'loading';
  page: number;
  genres: any[];
  favouriteMovies: any[];
}

const initialState: MoviesState = {
  list: [],
  status: 'idle',
  page: 1,
  genres: [],
  favouriteMovies: [],
}

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (args, thunkApi) => {
    const { getState } = thunkApi;
    const page = selectPage(getState())
    const response = await configuredAxios.get("discover/movie", {
      params: { page: page }
    })
    return response.data.results
  }
)


export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    movieAddedToFavourite(state, action) {
      const { movieToAdd } = action.payload
      if (!state.favouriteMovies.find(movie => movie.id === movieToAdd.id)) {
        state.favouriteMovies.push(movieToAdd);
      }
    },
    movieRemoveFromFavourite(state, action) {
      const { movieToRemove } = action.payload
      if (state.favouriteMovies.find(movie => movie.id === movieToRemove.id)) {
        state.favouriteMovies = state.favouriteMovies.filter(movie => movie.id !== movieToRemove.id);
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'idle';
        state.list.push(...action.payload);
        state.page += 1
      });
  },
})

export default moviesSlice.reducer
export const { movieAddedToFavourite, movieRemoveFromFavourite } = moviesSlice.actions;

export const selectMovieById = (state: { movies: MoviesState }, movieId: number) => {
  return state.movies.list.find(movie => movie.id === movieId)
}

export const favouriteById = (state: { movies: MoviesState }, movieId: number) => {
  const found = state.movies.favouriteMovies.find(movie => movie.id === movieId)
  if (found)
    return true
  return false
}

export const selectPage = (state: any) => state.movies.page;