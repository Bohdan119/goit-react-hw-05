import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const MoviesPage = ({ searchResults, setSearchResults }) => {
  const [searchFilm, setSearchFilm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const query = searchParams.get("query") || "";

  useEffect(() => {
    const fetchMovies = async (query) => {
      if (query.trim() === "") return;

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
        toast.error("Failed to fetch movies.");
      }
    };

    fetchMovies(query);
  }, [query, setSearchResults]);

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
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((movie) => (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`} state={{ from: location }}>
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
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

MoviesPage.propTypes = {
  searchResults: PropTypes.array.isRequired,
  setSearchResults: PropTypes.func.isRequired,
};

export default MoviesPage;
