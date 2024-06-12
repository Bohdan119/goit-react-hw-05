import { useEffect, useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import MovieCast from "../../components/MovieCast/MovieCast.jsx";
import MovieReviews from "../../components/MovieReviews/MovieReviews.jsx";

const MovieDetailsPage = ({ onSelectMovie, handleGoBack }) => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  // const location = useLocation();
  // const navigate = useNavigate();

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
        onSelectMovie(data);
      } catch (error) {
        console.error("Error fetching movie details", error);
      }
    };
    fetchMovieDetails();
  }, [movieId, onSelectMovie]);

  // const handleGoBack = () => {
  //   const from = location.state?.from || "/movies";
  //   navigate(from);
  // };

  if (!movie) {
    return <div>Loading...</div>;
  }

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div>
      <h2>{movie.title}</h2>
      {movie.poster_path && (
        <img
          src={`${imageBaseUrl}${movie.poster_path}`}
          alt={movie.title}
          style={{ width: "300px", marginBottom: "20px" }}
        />
      )}
      <p>{movie.overview}</p>
      <Suspense fallback={<div>Loading...</div>}>
        <MovieCast movieId={movieId} />
        <MovieReviews movieId={movieId} />
      </Suspense>
      <button onClick={handleGoBack}>Go back</button>
    </div>
  );
};

MovieDetailsPage.propTypes = {
  onSelectMovie: PropTypes.func.isRequired,
  handleGoBack: PropTypes.func.isRequired,
};

export default MovieDetailsPage;
