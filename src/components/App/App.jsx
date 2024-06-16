import { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Navigation from "../../components/Navigation/Navigation.jsx";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage.jsx")
);
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage.jsx"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage.jsx")
);

const MovieCast = lazy(() => import("../MovieCast/MovieCast.jsx"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews.jsx"));

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

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
                searchResults={searchResults}
                setSearchResults={setSearchResults}
              />
            }
          />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
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
