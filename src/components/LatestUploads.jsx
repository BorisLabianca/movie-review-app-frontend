import { useEffect, useState } from "react";
import { getMovies } from "../api/movie";
import { useNotification } from "../hooks";
import MovieListItem from "./MovieListItem";

const pageNumber = 0;
const limit = 5;

const LatestUploads = () => {
  const { updateNotification } = useNotification();
  const [latestMovies, setLatestMovies] = useState([]);
  const fetchLatestUploads = async () => {
    const { error, movies } = await getMovies(pageNumber, limit);

    if (error) return updateNotification("error", error);

    setLatestMovies([...movies]);
  };

  useEffect(() => {
    fetchLatestUploads();
  }, []);
  return (
    <div className="bg-white shadow-md shadow-300y-500 dark:shadow-gray-700 dark:bg-secondary p-5 rounded col-span-2">
      <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
        Recent Uploads
      </h1>
      <div className="space-y-3">
        {latestMovies
          ? latestMovies.map((latestMovie) => {
              return <MovieListItem movie={latestMovie} key={latestMovie.id} />;
            })
          : null}
      </div>
    </div>
  );
};

export default LatestUploads;
