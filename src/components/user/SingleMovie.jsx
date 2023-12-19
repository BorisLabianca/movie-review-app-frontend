import { useEffect, useState } from "react";
import { getSingleMovie } from "../../api/movie";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";
import Container from "../Container";
import RatingStar from "../RatingStar";
import RelatedMovies from "../RelatedMovies";
import AddRatingModal from "../modals/AddRatingModal";
import CustomButtonLink from "../CustomButtonLink";

const convertReviewCount = (count) => {
  if (count <= 999) return count;
  parseFloat(count / 1000).toFixed(2) + "K";
};

const convertDate = (date = "") => {
  return date.split("T")[0];
};

const SingleMovie = () => {
  const { movieId } = useParams();
  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  const [ready, setReady] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const fetchMovie = async () => {
    const { error, movie } = await getSingleMovie(movieId);
    if (error) return updateNotification("error", error);
    setReady(true);
    setMovie(movie);
  };

  const handleOnReateMovie = () => {
    if (!isLoggedIn) return navigate("/auth/signin");
    setShowRatingModal(true);
  };

  const hideRatingModal = () => {
    setShowRatingModal(false);
  };

  const handleOnRatingSuccess = (reviews) => {
    setMovie({ ...movie, reviews: { ...reviews } });
  };

  useEffect(() => {
    if (movieId) fetchMovie();
  }, [movieId]);

  if (!ready)
    return (
      <div className="h-screen flex justify-center items-center dark:bg-primary bg-white">
        <p className="text-light-subtle dark:text-dark-subtle animate-pulse">
          Please wait...
        </p>
      </div>
    );

  const {
    id,
    trailer,
    poster,
    title,
    storyLine,
    type,
    language,
    releaseDate,
    director = {},
    reviews = {},
    writers = [],
    cast = [],
    genres = [],
  } = movie;

  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container className="max-2xl:px-5">
        <video poster={poster} src={trailer} controls></video>
        <div className="flex justify-between">
          <h1 className="xl:text-4xl lg:text-3xl text-2xl text-highlight dark:text-highlight-dark font-semibold py-3">
            {title}
          </h1>
          <div className="flex flex-col items-end">
            <RatingStar rating={reviews.ratingAverage} />
            <CustomButtonLink
              label={
                reviews.reviewCount && reviews.reviewCount !== 1
                  ? convertReviewCount(reviews.reviewCount) + " Reviews"
                  : reviews.reviewCount === 1
                  ? convertReviewCount(reviews.reviewCount) + " Review"
                  : "No Reviews"
              }
              onClick={() => navigate(`/movie/reviews/${id}`)}
            />
            <CustomButtonLink
              label={"Rate This " + type}
              onClick={handleOnReateMovie}
            />
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-light-subtle dark:text-dark-subtle">
            Storyline: {storyLine}
          </p>
          <ListWithLabel label="Director:">
            <CustomButtonLink label={director.name} />
          </ListWithLabel>

          <ListWithLabel label="Writers:">
            {writers.map((writer) => (
              <CustomButtonLink label={writer.name} key={writer.id} />
            ))}
          </ListWithLabel>

          <ListWithLabel label="Cast:">
            {cast.map(({ id, profile, leadActor }) => {
              return leadActor ? (
                <CustomButtonLink label={profile.name} key={id} />
              ) : null;
            })}
          </ListWithLabel>

          <ListWithLabel label="Language:">
            <CustomButtonLink label={language} clickable={false} />
          </ListWithLabel>

          <ListWithLabel label="Release Date:">
            <CustomButtonLink
              label={convertDate(releaseDate)}
              clickable={false}
            />
          </ListWithLabel>

          <ListWithLabel label="Genres:">
            {genres.map((genre) => (
              <CustomButtonLink label={genre} key={genre} clickable={false} />
            ))}
          </ListWithLabel>

          <ListWithLabel label="Type:">
            <CustomButtonLink label={type} clickable={false} />
          </ListWithLabel>

          <CastProfiles cast={cast} />
          <RelatedMovies movieId={movieId} />
        </div>
      </Container>

      <AddRatingModal
        visible={showRatingModal}
        onClose={hideRatingModal}
        onSuccess={handleOnRatingSuccess}
      />
    </div>
  );
};

const ListWithLabel = ({ children, label }) => {
  return (
    <div className="flex space-x-2">
      <p className="text-light-subtle dark:text-dark-subtle font-semibold">
        {label}
      </p>
      {children}
    </div>
  );
};

const CastProfiles = ({ cast }) => {
  return (
    <div className="">
      <h1 className="text-light-subtle dark:text-dark-subtle font-semibold text-2xl mb-2">
        Cast:
      </h1>
      <div className="flex flex-wrap space-x-4">
        {cast.map(({ profile, roleAs }) => {
          return (
            <div
              key={profile.id}
              className="basis-28 flex flex-col items-center text-center mb-4"
            >
              <img
                className="w-24 h-24 aspect-square object-cover rounded-full"
                src={profile.avatar}
                alt=""
              />
              <CustomButtonLink label={profile.name} />
              <span className="text-light-subtle dark:text-dark-subtle text-sm">
                as
              </span>
              <p className="text-light-subtle dark:text-dark-subtle text-lg">
                {roleAs}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SingleMovie;
