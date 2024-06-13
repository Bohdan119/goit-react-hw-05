import { Link, useLocation} from "react-router-dom";
import PropTypes from "prop-types";

const MovieList = ({ movies }) => {
  const location = useLocation();
  const goBackLink =
    location.state && location.state.from
      ? location.state.from === "/"
        ? "/"
        : location.state.from
      : "/movies";
  


  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div>
      <Link to={goBackLink}>Go Back </Link>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              {movie.poster_path && (
                <img
                  src={`${imageBaseUrl}${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: "100px", marginRight: "10px" }}
                />
              )}
              {movie.title}
              {movie.vote_average}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
    })
  ).isRequired,
};

export default MovieList;
