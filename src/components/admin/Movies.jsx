import { useEffect } from "react";
// import { deleteMovie, getMovieForUpdate, getMovies } from "../../api/movie";
import { useMovies } from "../../hooks";
import MovieListItem from "../MovieListItem";
import PaginationButtons from "../PaginationButtons";
// import UpdateMovie from "../modals/UpdateMovie";
// import ConfirmModal from "../modals/ConfirmModal";

// const limit = 10;
let defaultPageNumber = 0;

const Movies = () => {
  // const { updateNotification } = useNotification();
  const {
    fetchMovies,
    movies: newMovies,
    fetchPreviousPage,
    fetchNextPage,
    count,
    limit,
  } = useMovies();
  // const [movies, setMovies] = useState([]);
  // // const [count, setCount] = useState("");
  // // const [reachedEnd, setReachedEnd] = useState(false);
  // const [showUpdateModal, setShowUpdateModal] = useState(false);
  // const [showConfirmModal, setShowConfirmModal] = useState(false);
  // const [selectedMovie, setSelectedMovie] = useState(null);
  // const [busy, setBusy] = useState(false);

  // const fetchMovies = async (pageNumber) => {
  //   const { error, movies, moviesCount } = await getMovies(pageNumber, limit);
  //   if (error) return updateNotification("error", error);
  //   if (!movies.length) {
  //     defaultPageNumber = pageNumber - 1;
  //     return setReachedEnd(true);
  //   }
  //   setMovies([...movies]);
  //   setCount(moviesCount);
  // };

  // const handleNextClick = () => {
  //   if (reachedEnd) return;
  //   defaultPageNumber += 1;
  //   fetchMovies(defaultPageNumber);
  // };

  // const handlePreviousClick = () => {
  //   if (defaultPageNumber <= 0) return;
  //   defaultPageNumber -= 1;
  //   if (reachedEnd) setReachedEnd(false);
  //   fetchMovies(defaultPageNumber);
  // };

  // const handleOnEditClick = async ({ id }) => {
  //   const { movie, error } = await getMovieForUpdate(id);
  //   if (error) return updateNotification("error", error);
  //   setSelectedMovie(movie);
  //   setShowUpdateModal(true);
  // };

  // const handleOnDeleteClick = (movie) => {
  //   setSelectedMovie(movie);
  //   setShowConfirmModal(true);
  // };

  // const handleOnDeleteConfirm = async () => {
  //   setBusy(true);
  //   const { error, message } = await deleteMovie(selectedMovie.id);
  //   setBusy(false);
  //   if (error) return updateNotification("error", error);
  //   updateNotification("success", message);
  //   hideConfirmModal();
  //   fetchMovies(defaultPageNumber);
  // };

  // const handleOnUpdate = (movie) => {
  //   const updatedMovies = movies.map((m) => {
  //     if (m.id === movie.id) return movie;
  //     return m;
  //   });
  //   setMovies([...updatedMovies]);
  // };

  // const hideUpdateForm = () => setShowUpdateModal(false);
  // const hideConfirmModal = () => setShowConfirmModal(false);

  const handleAfterDelete = () => fetchMovies();

  useEffect(() => {
    fetchMovies(defaultPageNumber);
  }, []);

  return (
    <>
      <div className="space-y-3 p-5">
        {newMovies.map((movie) => {
          return (
            <MovieListItem
              movie={movie}
              key={movie.id}
              afterDelete={handleAfterDelete}
              // onEditClick={() => handleOnEditClick(movie)}
              // onDeleteClick={() => handleOnDeleteClick(movie)}
            />
          );
        })}
        {count > limit && (
          <PaginationButtons
            className="mt-5"
            onNextClick={fetchNextPage}
            onPreviousClick={fetchPreviousPage}
          />
        )}
      </div>
      {/* <ConfirmModal
        visible={showConfirmModal}
        onConfirm={handleOnDeleteConfirm}
        onCancel={hideConfirmModal}
        title="Are you sure?"
        subtitle="This action will remove this movie permanently."
        busy={busy}
        onClose={hideConfirmModal}
      />
      <UpdateMovie
        visible={showUpdateModal}
        initialState={selectedMovie}
        onSuccess={handleOnUpdate}
        onClose={hideUpdateForm}
      /> */}
    </>
  );
};

export default Movies;
