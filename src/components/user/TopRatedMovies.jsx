import { getTopRatedMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import { useEffect, useState } from "react";
import MovieList from "./MovieList";

const TopRatedMovies = () => {
  const { updateNotification } = useNotification();
  const [movies, setMovies] = useState([]);
  const fetchMovies = async () => {
    const { error, movies } = await getTopRatedMovies();
    if (error) return updateNotification("error", error);

    setMovies([...movies]);
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  return <MovieList movies={movies} title="Viewers choice (movies)" />;
};

export default TopRatedMovies;
