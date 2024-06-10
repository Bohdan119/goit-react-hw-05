import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";


const MoviesPage = ({ onSearch, searchResults, onSelectMovie }) => {
  const [searchFilm, setSearchFilm] = useState("");

  const handleInputChange = (event) => {
    setSearchFilm(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (searchFilm.trim() === "") {
      toast.error("Please enter a word");
      return;
    }
    onSearch(searchFilm);
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
                <Link
                  to={`/movies/${movie.id}`}
                  onClick={() => onSelectMovie(movie)}
                >
                  {movie.poster_path && (
                    <img
                      src={`${imageBaseUrl}${movie.poster_path}`}
                      alt={movie.title}
                      style={{ width: "100px", marginRight: "10px" }}
                    />
                  )}
                  <span>{movie.title}</span>
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
  onSearch: PropTypes.func.isRequired,
  searchResults: PropTypes.array.isRequired,
  onSelectMovie: PropTypes.func.isRequired,
};

export default MoviesPage;
