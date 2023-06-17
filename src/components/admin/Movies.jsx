import { useEffect, useState } from "react";
import { getMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import MovieListItem from "../MovieListItem";
import PaginationButtons from "../PaginationButtons";
import UpdateMovie from "../modals/UpdateMovie";

const limit = 10;
let defaultPageNumber = 0;

const Movies = () => {
  const { updateNotification } = useNotification();
  const [movies, setMovies] = useState([]);
  const [count, setCount] = useState("");
  const [reachedEnd, setReachedEnd] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const fetchMovies = async (pageNumber) => {
    const { error, movies, moviesCount } = await getMovies(pageNumber, limit);
    if (error) return updateNotification("error", error);
    if (!movies.length) {
      defaultPageNumber = pageNumber - 1;
      return setReachedEnd(true);
    }
    setMovies([...movies]);
    setCount(moviesCount);
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

  const handleOnEditClick = (movie) => {
    console.log(movie);
    setShowUpdateModal(true);
  };

  useEffect(() => {
    fetchMovies(defaultPageNumber);
  }, []);

  return (
    <>
      <div className="space-y-3 p-5">
        {movies.map((movie) => {
          return (
            <MovieListItem
              movie={movie}
              key={movie.id}
              onEditClick={() => handleOnEditClick(movie)}
            />
          );
        })}
        {count > limit && (
          <PaginationButtons
            className="mt-5"
            onNextClick={handleNextClick}
            onPreviousClick={handlePreviousClick}
          />
        )}
      </div>
      <UpdateMovie visible={showUpdateModal} />
    </>
  );
};

export default Movies;
