import { useEffect, useState } from "react";
import { getMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import MovieListItem from "../MovieListItem";
import PaginationButtons from "../PaginationButtons";

const limit = 10;
let defaultPageNumber = 0;

const Movies = () => {
  const { updateNotification } = useNotification();
  const [movies, setMovies] = useState([]);
  const [reachedEnd, setReachedEnd] = useState(false);

  const fetchMovies = async (pageNumber) => {
    const { error, movies } = await getMovies(pageNumber, limit);
    if (error) return updateNotification("error", error);
    if (!movies.length) {
      defaultPageNumber = pageNumber - 1;
      return setReachedEnd(true);
    }
    setMovies([...movies]);
  };

  const handleNextClick = () => {
    if (reachedEnd) return;
    defaultPageNumber += 1;
    fetchMovies(defaultPageNumber);
  };

  const handlePreviousClick = () => {
    if (defaultPageNumber <= 0) return;
    defaultPageNumber -= 1;
    if (reachedEnd) setReachedEnd(false);
    fetchMovies(defaultPageNumber);
  };

  useEffect(() => {
    fetchMovies(defaultPageNumber);
  }, []);

  return (
    <div className="space-y-3 p-5">
      {movies.map((movie) => {
        return <MovieListItem movie={movie} key={movie.id} />;
      })}
      <PaginationButtons
        className="mt-5"
        onNextClick={handleNextClick}
        onPreviousClick={handlePreviousClick}
      />
    </div>
  );
};

export default Movies;
