import { useEffect, useState } from "react";
import { getMovieForUpdate, updateMovie } from "../../api/movie";
import MovieForm from "../admin/MovieForm";
import ModalContainer from "./ModalContainer";
import { useNotification } from "../../hooks";

const UpdateMovie = ({ visible, onSuccess, onClose, movieId }) => {
  const { updateNotification } = useNotification();
  const [busy, setBusy] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [ready, setReady] = useState(false);

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, movie, message } = await updateMovie(movieId, data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    onSuccess(movie);
    onClose();
  };

  const fetchMovieToUpdate = async () => {
    const { movie, error } = await getMovieForUpdate(movieId);
    if (error) return updateNotification("error", error);
    setReady(true);
    setSelectedMovie(movie);
  };

  useEffect(() => {
    if (movieId) fetchMovieToUpdate();
  }, [movieId]);

  return (
    <ModalContainer visible={visible} onClose={onClose}>
      {ready ? (
        <MovieForm
          initialState={selectedMovie}
          btnTitle="Update"
          onSubmit={!busy ? handleSubmit : null}
          busy={busy}
        />
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-light-subtle dark:text-dark-subtle animate-pulse text-xl">
            Please wait...
          </p>
        </div>
      )}
    </ModalContainer>
  );
};

export default UpdateMovie;
