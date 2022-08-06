import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import moviesReducer from "../features/movies/moviesSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


// const rootPersistConfig = {
//   key: 'root',
//   storage,
// }

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['favouriteMovies', 'genres']
}


const persistedMoviesReducer = persistReducer(userPersistConfig, moviesReducer)

export const store = configureStore({
  reducer: {
    movies: persistedMoviesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    {serializableCheck: false,}
  )
});

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
