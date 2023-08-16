import { getTopRatedMovies } from "../../api/movie";
import GridContainer from "../GridContainer";
import { useNotification } from "../../hooks";
import { useEffect, useState } from "react";

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
  return (
    <GridContainer>
      {movies.map((_, index) => {
        return <div className="p-5 bg-red-200" key={index}></div>;
      })}
    </GridContainer>
  );
};

export default TopRatedMovies;
