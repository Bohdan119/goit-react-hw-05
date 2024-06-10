import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import MovieCast from "../../components/MovieCast/MovieCast.jsx";
import MovieReviews from "../../components/MovieReviews/MovieReviews.jsx";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchMovieDetails = async () => {
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
      } catch (error) {
        console.error("Error fetching trending movies", error);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    const defaultPath = "/movies";
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate(defaultPath);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div>
      <button onClick={handleGoBack}>Go back</button>
      <h2>{movie.title}</h2>
      {movie.poster_path && (
        <img
          src={`${imageBaseUrl}${movie.poster_path}`}
          alt={movie.title}
          style={{ width: "300px", marginBottom: "20px" }}
        />
      )}
      <p>{movie.overview}</p>
      <MovieCast movieId={movieId} />
      <MovieReviews movieId={movieId} />
    </div>
  );
};

export default MovieDetailsPage;
