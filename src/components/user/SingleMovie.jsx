import { useEffect, useState } from "react";
import { getSingleMovie } from "../../api/movie";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";
import Container from "../Container";
import RatingStar from "../RatingStar";
import RelatedMovies from "../RelatedMovies";
import AddRatingModal from "../modals/AddRatingModal";

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
          <h1 className="text-4xl text-highlight dark:text-highlight-dark font-semibold py-3">
            {title}
          </h1>
          <div className="flex flex-col items-end">
            <RatingStar rating={reviews.ratingAverage} />
            <Link
              className="text-highlight dark:text-highlight-dark hover:underline"
              to={`/movie/reviews/${id}`}
            >
              {reviews.reviewCount
                ? convertReviewCount(reviews.reviewCount)
                : "No"}{" "}
              Review
              {reviews.reviewCount !== 1 && "s"}
            </Link>
            <button
              className="text-highlight dark:text-highlight-dark hover:underline"
              type="button"
              onClick={handleOnReateMovie}
            >
              Rate This {type}
            </button>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-light-subtle dark:text-dark-subtle">{storyLine}</p>
          <div className="flex space-x-2">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Director:
            </p>
            <p className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer">
              {director.name}
            </p>
          </div>
          <div className="flex">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">
              Writers:
            </p>
            <div className="flex space-x-2">
              {writers.map((writer) => {
                return (
                  <p
                    className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer"
                    key={writer.id}
                  >
                    {writer.name}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="flex">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">
              Lead Cast:
            </p>
            <div className="flex space-x-2">
              {cast.map((c) => {
                return c.leadActor ? (
                  <p
                    className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer"
                    key={c.profile.id}
                  >
                    {c.profile.name}
                  </p>
                ) : null;
              })}
            </div>
          </div>
          <div className="flex space-x-2">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Language:
            </p>
            <p className="text-highlight dark:text-highlight-dark">
              {language}
            </p>
          </div>
          <div className="flex space-x-2">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Release Date:
            </p>
            <p className="text-highlight dark:text-highlight-dark">
              {convertDate(releaseDate)}
            </p>
          </div>

          <div className="flex">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">
              Genres:
            </p>
            <div className="flex space-x-2">
              {genres.map((genre) => {
                return (
                  <p
                    className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer"
                    key={genre}
                  >
                    {genre}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="flex space-x-2">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Type:
            </p>
            <p className="text-highlight dark:text-highlight-dark">{type}</p>
          </div>
        </div>

        <div className="mt-5">
          <h1 className="text-light-subtle dark:text-dark-subtle font-semibold text-2xl mb-2">
            Cast:
          </h1>
          <div className="grid grid-cols-10">
            {cast.map((c) => {
              console.log(c);

              return (
                <div key={c.profile.id} className="flex flex-col items-center">
                  <img
                    className="w-24 h-24 aspect-square object-cover rounded-full"
                    src={c.profile.avatar}
                    alt=""
                  />
                  <p className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer">
                    {c.profile.name}
                  </p>
                  <span className="text-light-subtle dark:text-dark-subtle text-sm">
                    as
                  </span>
                  <p className="text-light-subtle dark:text-dark-subtle text-lg">
                    {c.roleAs}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-3">
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

export default SingleMovie;
