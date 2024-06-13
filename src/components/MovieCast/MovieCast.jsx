import { useEffect, useState } from "react"
import axios from "axios";
import { useParams } from "react-router-dom";

const MovieCast = () => {
    const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
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
    
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  
      return (
          <div>
      <h3>Cast</h3>
      <ul>
              {cast.map((actor) => (
          <li key={actor.cast_id}>
            <img
              src={`${imageBaseUrl}${actor.profile_path}`}
              alt={actor.name}
              style={{ width: "100px", marginBottom: "100px" }}
            />
            {actor.name} as {actor.character}
          </li>
        ))}
        
      </ul>
    </div>
  );
  };



export default MovieCast;