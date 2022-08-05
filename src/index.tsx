import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SingleMovie } from './features/movies/SingleMovie';
import { MoviesList } from './features/movies/MoviesList';


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path='/' element={<MoviesList />} />
            <Route path='/movie/:movieId' element={<SingleMovie />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <App /> */}
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
