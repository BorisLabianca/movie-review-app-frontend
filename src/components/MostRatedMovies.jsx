import { useEffect, useState } from "react";
import { getMostRatedMovie } from "../api/admin";
import { useNotification } from "../hooks";
import RatingStar from "./RatingStar";
import { convertReviewCount } from "../utils/helper";

const MostRatedMovies = () => {
  const { updateNotification } = useNotification();
  const [movies, setMovies] = useState([]);

  const fetchMostRatedMovies = async () => {
    const { error, movies } = await getMostRatedMovie();
    if (error) return updateNotification("error", error);
    setMovies([...movies]);
  };

  useEffect(() => {
    fetchMostRatedMovies();
  }, []);

  return (
    <div className="bg-white shadow-md shadow-300y-500 dark:shadow-gray-700 dark:bg-secondary p-5 rounded">
      <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
        Most Rated
      </h1>
      <ul className="space-y-3">
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <h1 className="dark:text-white text-secondary font-semibold">
                {movie.title}
              </h1>
              <div className="flex space-x-2">
                <RatingStar rating={movie.reviews?.ratingAverage} />
                <p className="text-light-subtle dark:text-dark-subtle">
                  {movie.reviews?.reviewCount === 1
                    ? `${convertReviewCount(movie.reviews?.reviewCount)} Review`
                    : movie?.reviews.reviewCount > 1
                    ? `${convertReviewCount(
                        movie.reviews?.reviewCount
                      )} Reviews`
                    : " 0 Reviews"}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MostRatedMovies;
