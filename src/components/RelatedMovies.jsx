import { useEffect, useState } from "react";
import { getRelatedMovies } from "../api/movie";
import { useNotification } from "../hooks";
import MovieList from "./user/MovieList";

const RelatedMovies = ({ movieId }) => {
  const { updateNotification } = useNotification();
  const [movies, setMovies] = useState([]);

  const fetchRelatedMovies = async () => {
    const { error, relatedMovies } = await getRelatedMovies(movieId);
    if (error) return updateNotification("error", error);

    setMovies([...relatedMovies]);
  };

  useEffect(() => {
    if (movieId) fetchRelatedMovies();
  }, [movieId]);

  return <MovieList title="Related Movies" movies={movies} />;
};

export default RelatedMovies;
