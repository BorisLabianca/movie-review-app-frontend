import { AiFillStar } from "react-icons/ai";
import GridContainer from "../GridContainer";
import { Link } from "react-router-dom";
import RatingStar from "../RatingStar";
import { getPoster } from "../../utils/helper";

const trimTitle = (text = "") => {
  if (text.length <= 20) return text;
  return text.substring(0, 20) + "...";
};

const MovieList = ({ title, movies = [] }) => {
  if (!movies.length) return null;
  return (
    <div>
      {title ? (
        <h1 className="text-2xl dark:text-white text-secondary font-semibold mb-5">
          {title}
        </h1>
      ) : null}
      <GridContainer>
        {movies.map((movie) => {
          return <ListItem key={movie.id} movie={movie} />;
        })}
      </GridContainer>
    </div>
  );
};

const ListItem = ({ movie }) => {
  const { id, responsivePosters, title, poster, reviews } = movie;
  return (
    <Link to={`/movie/${id}`}>
      <img
        src={getPoster(responsivePosters) || poster}
        alt={title}
        className="object-cover aspect-video w-full"
      />
      <h1
        title={title}
        className="text-lg dark:text-white text-secondary font-semibold"
      >
        {trimTitle(title)}
      </h1>
      <RatingStar rating={reviews.ratingAverage} />
    </Link>
  );
};
export default MovieList;
