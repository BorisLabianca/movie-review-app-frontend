import { createContext, useState } from "react";
import { getMovies } from "../api/movie";
import { useNotification } from "../hooks";

export const MovieContext = createContext();

const limit = 10;
let defaultPageNumber = 0;

const MoviesProviders = ({ children }) => {
  const { updateNotification } = useNotification();
  const [movies, setMovies] = useState([]);
  const [latestUploads, setLatestUploads] = useState([]);
  const [count, setCount] = useState("");
  const [reachedEnd, setReachedEnd] = useState(false);

  const fetchLatestUploads = async (quantity = 5) => {
    const { error, movies } = await getMovies(0, quantity);

    if (error) return updateNotification("error", error);

    setLatestUploads([...movies]);
  };

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

  const fetchNextPage = () => {
    if (reachedEnd) return;
    defaultPageNumber += 1;
    fetchMovies(defaultPageNumber);
  };

  const fetchPreviousPage = () => {
    if (defaultPageNumber <= 0) return;
    defaultPageNumber -= 1;
    if (reachedEnd) setReachedEnd(false);
    fetchMovies(defaultPageNumber);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        fetchMovies,
        fetchNextPage,
        fetchPreviousPage,
        count,
        limit,
        latestUploads,
        fetchLatestUploads,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MoviesProviders;
