import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

const MoviesPage = ({ onSelectMovie }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchFilm, setSearchFilm] = useState(searchParams.get("query") || "");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async (query) => {
      setLoading(true);
      setError(null);
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
        setError("Error while searching for movies");
      } finally {
        setLoading(false);
      }
    };

    const query = searchParams.get("query");
    if (query) {
      fetchMovies(query);
    }
  }, [searchParams]);

  const handleInputChange = (event) => {
    setSearchFilm(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (searchFilm.trim() === "") {
      toast.error("Please enter a word");
      return;
    }
    setSearchParams({ query: searchFilm });
  };

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div>
      <header>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={searchFilm}
            onChange={handleInputChange}
            autoComplete="off"
            autoFocus
            placeholder="Search for a movie"
            name="search"
          />
          <button type="submit">Search</button>
        </form>
      </header>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && searchResults.length > 0 ? (
          <ul>
            {searchResults.map((movie) => (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `/movies/${movie.id}`,
                    state: { from: window.location.pathname },
                  }}
                  onClick={() => onSelectMovie(movie)}
                >
                  <span>{movie.title}</span>
                  {movie.poster_path && (
                    <img
                      src={`${imageBaseUrl}${movie.poster_path}`}
                      alt={movie.title}
                      style={{ width: "100px", marginRight: "10px" }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          !loading && !error && <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

MoviesPage.propTypes = {
  onSelectMovie: PropTypes.func.isRequired,
};

export default MoviesPage;
