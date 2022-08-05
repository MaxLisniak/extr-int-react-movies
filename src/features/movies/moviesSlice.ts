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
  async(args, thunkApi ) => {
    const {getState} = thunkApi;
    const page = selectPage(getState())
    const response = await configuredAxios.get("discover/movie", {
    params: {page: page}
  })
    console.log(response.data.results)
    return response.data.results
  }
)

export const fetchGenres = createAsyncThunk(
  'movies/fetchGenres',
  async() => {
    const response = await configuredAxios.get("genre/movie/list") 
    return response.data.genres;
  }
)

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    movieAddedToFavourite(state, action) {
      const { movieId } = action.payload
      if (!state.favouriteMovies.find(movie => movie.id === movieId )){
        const movie = state.list.find(movie => movie.id === movieId)
        state.favouriteMovies.push(movie);
      }
    },
    movieRemoveFromFavourite(state, action){
      const { movieId } = action.payload
      if (state.favouriteMovies.find(movie => movie.id === movieId )){
        state.favouriteMovies = state.favouriteMovies.filter(movie => movie.id !== movieId);
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
    builder
    .addCase(fetchGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
    })
  },
})

export default moviesSlice.reducer
export const { movieAddedToFavourite, movieRemoveFromFavourite } = moviesSlice.actions;

export const selectMovieById = (state:{ movies:MoviesState }, movieId:number) => {
  return state.movies.list.find(movie => movie.id == movieId)
}

export const selectPage = (state:any) => state.movies.page;