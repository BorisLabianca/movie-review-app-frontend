import { useEffect } from "react";
// import { deleteMovie, getMovieForUpdate, getMovies } from "../api/movie";
import { useMovies } from "../hooks";
import MovieListItem from "./MovieListItem";
// import ConfirmModal from "./modals/ConfirmModal";
// import UpdateMovie from "./modals/UpdateMovie";

const pageNumber = 0;
const limit = 5;

const LatestUploads = () => {
  // const { updateNotification } = useNotification();
  const { fetchLatestUploads, latestUploads } = useMovies();
  // const [latestMovies, setLatestMovies] = useState([]);
  // const [selectedMovie, setSelectedMovie] = useState(null);
  // const [showConfirmModal, setShowConfirmModal] = useState(false);
  // const [showUpdateModal, setShowUpdateModal] = useState(false);
  // const [busy, setBusy] = useState(false);
  // const fetchLatestUploads = async () => {
  //   const { error, movies } = await getMovies(pageNumber, limit);

  //   if (error) return updateNotification("error", error);

  //   setLatestMovies([...movies]);
  // };

  // const handleOnDeleteClick = (latestMovie) => {
  //   setSelectedMovie(latestMovie);
  //   setShowConfirmModal(true);
  // };
  // const handleOnEditClick = async ({ id }) => {
  //   const { error, movie } = await getMovieForUpdate(id);
  //   setShowUpdateModal(true);
  //   if (error) return updateNotification("error", error);
  //   setSelectedMovie(movie);
  // };

  // const hideConfirmModal = () => {
  //   setShowConfirmModal(false);
  // };

  // const hideUpdateModal = () => {
  //   setShowUpdateModal(false);
  // };

  // const handleOnDeleteConfirm = async () => {
  //   setBusy(true);
  //   const { error, message } = await deleteMovie(selectedMovie.id);
  //   setBusy(false);
  //   if (error) return updateNotification("error", error);
  //   updateNotification("success", message);
  //   fetchLatestUploads();
  //   hideConfirmModal();
  // };

  // const handleOnUpdate = (latesMovie) => {
  //   const updatedMovies = latestMovies.map((m) => {
  //     if (m.id === latesMovie.id) return latesMovie;
  //     return m;
  //   });

  //   setLatestMovies([...updatedMovies]);
  // };

  const handleUiUpdate = () => fetchLatestUploads();

  useEffect(() => {
    fetchLatestUploads();
  }, []);
  return (
    <>
      <div className="bg-white shadow-md shadow-300y-500 dark:shadow-gray-700 dark:bg-secondary p-5 rounded col-span-2">
        <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
          Recent Uploads
        </h1>
        <div className="space-y-3">
          {latestUploads
            ? latestUploads.map((latestMovie) => {
                return (
                  <MovieListItem
                    movie={latestMovie}
                    key={latestMovie.id}
                    afterDelete={handleUiUpdate}
                    afterUpdate={handleUiUpdate}
                    // onDeleteClick={() => handleOnDeleteClick(latestMovie)}
                    // onEditClick={() => handleOnEditClick(latestMovie)}
                  />
                );
              })
            : null}
        </div>
      </div>
      {/* <ConfirmModal
        title="Are your sure?"
        subtitle="This action will remove this movie permanently."
        visible={showConfirmModal}
        onCancel={hideConfirmModal}
        onConfirm={handleOnDeleteConfirm}
        busy={busy}
        onClose={hideConfirmModal}
      />
      <UpdateMovie
        visible={showUpdateModal}
        onClose={hideUpdateModal}
        initialState={selectedMovie}
        onSuccess={handleOnUpdate}
      /> */}
    </>
  );
};

export default LatestUploads;
