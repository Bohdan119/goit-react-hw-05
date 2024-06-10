import { useEffect, useState } from "react"
import axios from "axios";
import PropTypes from 'prop-types'

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      const url = "https://api.themoviedb.org/3/trending/movie/day";
      const token =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzY3YTQ3ZDFlYjRmOTg2NjNiYWE1YjljZWFhZjM5YiIsInN1YiI6IjY2NjFkNzAxNWE3Y2M3N2U4MmNiYjhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lr6mApkHpa51x8ZPDeW1l4pp_-UlafHNI2_NBU_sc2Q";
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axios.get(url, options);
        setCast(data.cast);
      } catch (error) {
        console.error("Error fetching trending movies", error);
      }
    };
    fetchMovieCast();
  }, [movieId]);
  return (
    <div>
      <h3>Cast</h3>
      <ul>
        {cast.map((actor) => (
          <li key={actor.cast_id}>
            {actor.name} as {actor.character}
          </li>
        ))}
      </ul>
    </div>
  );
};
MovieCast.propTypes = {
  movieId: PropTypes.string.isRequired,
};


export default MovieCast;