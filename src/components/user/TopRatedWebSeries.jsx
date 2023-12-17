import { getTopRatedMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import { useEffect, useState } from "react";
import MovieList from "./MovieList";

const TopRatedWebSeries = () => {
  const { updateNotification } = useNotification();
  const [movies, setMovies] = useState([]);
  const fetchMovies = async () => {
    const { error, movies } = await getTopRatedMovies("Web Series");
    if (error) return updateNotification("error", error);

    setMovies([...movies]);
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  return <MovieList movies={movies} title="Viewers choice (Web Series)" />;
};

export default TopRatedWebSeries;
