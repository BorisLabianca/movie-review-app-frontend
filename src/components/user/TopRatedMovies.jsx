import { getTopRatedMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import { useEffect, useState } from "react";
import MovieList from "./MovieList";

const TopRatedMovies = () => {
  const { updateNotification } = useNotification();
  const [movies, setMovies] = useState([]);

  const fetchMovies = async (signal) => {
    const { error, movies } = await getTopRatedMovies(null, signal);
    if (error) return updateNotification("error", error);

    setMovies([...movies]);
  };

  useEffect(() => {
    const ac = new AbortController();
    fetchMovies(ac.signal);
    return () => {
      ac.abort();
    };
  }, []);
  return <MovieList movies={movies} title="Viewers choice (movies)" />;
};

export default TopRatedMovies;
