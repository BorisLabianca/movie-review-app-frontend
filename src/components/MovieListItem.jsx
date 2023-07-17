import { BsBoxArrowUpRight, BsPencilSquare, BsTrash } from "react-icons/bs";
import ConfirmModal from "./modals/ConfirmModal";
import { useState } from "react";
import { useNotification } from "../hooks";

const MovieListItem = ({ movie, afterDelete }) => {
  const { updateNotification } = useNotification();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleOnDeleteConfirm = async () => {
    setBusy(true);
    const { error, message } = await deleteMovie(movie.id);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    afterDelete(movie);
    hideConfirmModal();
  };

  const displayConfirmModal = () => setShowConfirmModal(true);
  const hideConfirmModal = () => setShowConfirmModal(false);

  return (
    <>
      <MovieCard movie={movie} onDeleteClick={displayConfirmModal} />
      <div className="p-0">
        <ConfirmModal
          visible={showConfirmModal}
          onConfirm={handleOnDeleteConfirm}
          onCancel={hideConfirmModal}
          title="Are you sure?"
          subtitle="This action will remove this movie permanently."
          busy={busy}
          onClose={hideConfirmModal}
        />
      </div>
    </>
  );
};

const MovieCard = ({ movie, onDeleteClick, onEditClick, onOpenClick }) => {
  const { poster, title, genres = [], status } = movie;
  return (
    <table className="w-full border-b">
      <tbody>
        <tr>
          <td>
            <div className="w-24">
              <img src={poster} alt={title} className="w-full aspect-video" />
            </div>
          </td>
          <td className="w-full pl-5">
            <div>
              <h1 className="font-semibold text-lg text-primary dark:text-white">
                {title}
              </h1>
              <div className="space-x-1">
                {genres.map((genre, index) => {
                  if (genres.length - 1 !== index) {
                    return (
                      <span
                        key={genre + index}
                        className="font-semibold text-primary dark:text-white text-xs"
                      >
                        {genre + ", "}
                      </span>
                    );
                  } else {
                    return (
                      <span
                        key={genre + index}
                        className="font-semibold text-primary dark:text-white text-xs"
                      >
                        {genre}
                      </span>
                    );
                  }
                })}
              </div>
            </div>
          </td>
          <td className="px-5">
            <p className="text-primary dark:text-white">{status}</p>
          </td>
          <td>
            <div className="flex items-center space-x-3 text-primary dark:text-white text-lg">
              <button onClick={onDeleteClick} type="button">
                <BsTrash />
              </button>
              <button onClick={onEditClick} type="button">
                <BsPencilSquare />
              </button>
              <button onClick={onOpenClick} type="button">
                <BsBoxArrowUpRight />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MovieListItem;
