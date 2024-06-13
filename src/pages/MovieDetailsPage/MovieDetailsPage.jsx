import { useEffect, useState, Suspense } from "react";
import { Link, useParams, useLocation, Outlet } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

const MovieDetailsPage = ({ selectedMovie, onSelectMovie }) => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(selectedMovie);
  const location = useLocation();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (selectedMovie && selectedMovie.id === parseInt(movieId)) {
        setMovie(selectedMovie);
        return;
      }

      const url = `https://api.themoviedb.org/3/movie/${movieId}`;
      const token =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzY3YTQ3ZDFlYjRmOTg2NjNiYWE1YjljZWFhZjM5YiIsInN1YiI6IjY2NjFkNzAxNWE3Y2M3N2U4MmNiYjhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lr6mApkHpa51x8ZPDeW1l4pp_-UlafHNI2_NBU_sc2Q";
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axios.get(url, options);
        setMovie(data);
        onSelectMovie(data);
      } catch (error) {
        console.error("Error fetching movie details", error);
      }
    };

    fetchMovieDetails();
  }, [movieId, selectedMovie, onSelectMovie]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

const goBackLink =
  location.state && location.state.from
    ? location.state.from === "/"
      ? "/"
      : location.state.from
    : "/movies";
  
  return (
    <div>
      <Link to={goBackLink}>Go back</Link>
      <h2>{movie.title}</h2>
      {movie.vote_average}
      {movie.poster_path && (
        <img
          src={`${imageBaseUrl}${movie.poster_path}`}
          alt={movie.title}
          style={{ width: "300px", marginBottom: "20px" }}
        />
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
        <Outlet />
      </Suspense>
    </div>
  );
};

MovieDetailsPage.propTypes = {
  selectedMovie: PropTypes.object,
  onSelectMovie: PropTypes.func.isRequired,
};

export default MovieDetailsPage;
