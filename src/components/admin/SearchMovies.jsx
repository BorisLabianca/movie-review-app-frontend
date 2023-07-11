import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovieForAdmin } from "../../api/movie";
import { useNotification } from "../../hooks";
import MovieListItem from "../MovieListItem";
import NotFoundText from "../NotFoundText";

const SearchMovies = () => {
  const [searchParams] = useSearchParams();
  const { updateNotification } = useNotification();
  const query = searchParams.get("title");

  const [movies, setMovies] = useState([]);
  const [resultNotFound, setResultNotFound] = useState(false);

  const searchMovies = async (value) => {
    const { error, results } = await searchMovieForAdmin(value);

    if (error) return updateNotification("error", error);

    if (!results.length) {
      setResultNotFound(true);
      return setMovies([]);
    }

    setResultNotFound(false);
    setMovies([...results]);
  };

  useEffect(() => {
    if (query.trim()) searchMovies(query);
  }, [query]);
  return (
    <div className="p-5 space-y-3">
      <NotFoundText text="No results were found." visible={resultNotFound} />
      {!resultNotFound &&
        movies.map((movie) => {
          return <MovieListItem movie={movie} key={movie.id} />;
        })}
    </div>
  );
};

export default SearchMovies;
