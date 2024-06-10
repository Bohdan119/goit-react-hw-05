import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
      const token =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzY3YTQ3ZDFlYjRmOTg2NjNiYWE1YjljZWFhZjM5YiIsInN1YiI6IjY2NjFkNzAxNWE3Y2M3N2U4MmNiYjhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lr6mApkHpa51x8ZPDeW1l4pp_-UlafHNI2_NBU_sc2Q";
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axios.get(url, options);
        setReviews(data.results);
      } catch (error) {
        console.error("Error fetching trending movies", error);
      }
    };
    fetchMovieReviews();
  }, [movieId]);
  return (
    <div>
      <h3>Reviews</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h4>{review.author}</h4>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
MovieReviews.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default MovieReviews;
