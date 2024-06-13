import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList.jsx";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
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
        setMovies(data.results);
        console.dir(data);
      } catch (error) {
        console.error("Error fetching trending movies", error);
      }
    };
    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
