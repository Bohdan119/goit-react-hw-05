import { useState, useEffect, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import HomePage from "../../pages/HomePage/HomePage.jsx";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage.jsx";
import MoviesPage from "../../pages/MoviesPage/MoviesPage.jsx";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage.jsx";

import MovieCast from "../MovieCast/MovieCast.jsx";
import MovieReviews from "../MovieReviews/MovieReviews.jsx";

import Navigation from "../../components/Navigation/Navigation.jsx";

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieSelection = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSearch = async (query) => {
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${query}`;
      const token =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzY3YTQ3ZDFlYjRmOTg2NjNiYWE1YjljZWFhZjM5YiIsInN1YiI6IjY2NjFkNzAxNWE3Y2M3N2U4MmNiYjhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lr6mApkHpa51x8ZPDeW1l4pp_-UlafHNI2_NBU_sc2Q";
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(url, options);
      setSearchResults(data.results);
    } catch (error) {
      console.error("Error while searching for movies", error);
    }
  };

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const url = "https://api.themoviedb.org/3/trending/movie/day";
        const token =
          "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzY3YTQ3ZDFlYjRmOTg2NjNiYWE1YjljZWFhZjM5YiIsInN1YiI6IjY2NjFkNzAxNWE3Y2M3N2U4MmNiYjhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lr6mApkHpa51x8ZPDeW1l4pp_-UlafHNI2_NBU_sc2Q";
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(url, options);
        setTrendingMovies(data.results);
      } catch (error) {
        console.error("Error getting trending movies", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage movies={trendingMovies} />} />
          <Route
            path="/movies"
            element={
              <MoviesPage
                onSearch={handleSearch}
                searchResults={searchResults}
                onSelectMovie={handleMovieSelection}
              />
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <MovieDetailsPage
                selectedMovie={selectedMovie}
                onSelectMovie={handleMovieSelection}
              />
            }
          >
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
