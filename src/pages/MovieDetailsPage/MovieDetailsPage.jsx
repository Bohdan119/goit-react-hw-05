import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import axios from "axios";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const goBackLink = useRef(location.state?.from || "/");

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
        console.error("Error fetching movie details", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

   const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div>
      <Link to={goBackLink.current}>Go Back</Link>
      <div>
        <h1>{movie.title}</h1>
        {movie.poster_path && (
          <img
            src={`${imageBaseUrl}${movie.poster_path}`}
            alt={movie.title}
            style={{ width: "300px" }}
          />
        )}
      </div>
      <nav>
        <Link to={`cast`} state={{ from: goBackLink.current }}>
          Cast
        </Link>
        <Link to={`reviews`} state={{ from: goBackLink.current }}>
          Reviews
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};



export default MovieDetailsPage;
