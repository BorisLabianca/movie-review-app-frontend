import { useEffect, useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { deleteActor, getActors, searchActor } from "../../api/actor";
import { useNotification, useSearch } from "../../hooks";
import PaginationButtons from "../PaginationButtons";
import UpdateActor from "../modals/UpdateActor";
import AppSearchForm from "../form/AppSearchForm";
import NotFoundText from "../NotFoundText";
import ConfirmModal from "../modals/ConfirmModal";

let defaultPageNumber = 0;
const limit = 20;

const Actors = () => {
  const { updateNotification } = useNotification();
  const { handleSearch, resetSearch, resultNotFound } = useSearch();
  const [actors, setActors] = useState([]);
  const [actorsCount, setActorsCount] = useState("");
  const [results, setResults] = useState([]);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [busy, setBusy] = useState(false);

  const fetchActors = async (pageNumber) => {
    const { profiles, actorsCount, error } = await getActors(pageNumber, limit);
    if (error) return updateNotification("error", error);
    if (!profiles.length) {
      defaultPageNumber = pageNumber - 1;
      return setReachedEnd(true);
    }
    setActors([...profiles]);
    setActorsCount(actorsCount);
  };

  const handleNextClick = () => {
    if (reachedEnd) return;
    defaultPageNumber += 1;
    fetchActors(defaultPageNumber);
  };

  const handlePreviousClick = () => {
    if (defaultPageNumber <= 0) return;
    defaultPageNumber -= 1;
    if (reachedEnd) setReachedEnd(false);
    fetchActors(defaultPageNumber);
  };

  const handleOnEditClick = (profile) => {
    setShowUpdateModal(true);
    setSelectedProfile(profile);
  };

  const hideUpdateModal = () => {
    setShowUpdateModal(false);
  };
  const handleOnSearchSubmit = (value) => {
    handleSearch(searchActor, value, setResults);
    // console.log(value);
  };

  const handleFormReset = () => {
    resetSearch();
    setResults([]);
    // console.log(value);
  };

  const handleOnActorUpdate = (profile) => {
    const updatedActors = actors.map((actor) => {
      if (profile.id === actor.id) {
        return profile;
      }
      return actor;
    });
    setActors([...updatedActors]);
  };

  const handleOnDeleteClick = (profile) => {
    setSelectedProfile(profile);
    setShowConfirmModal(true);
  };

  const hideCondirmModal = () => {
    setShowConfirmModal(false);
  };

  const onDeleteConfirm = async () => {
    setBusy(true);
    const { error, message } = await deleteActor(selectedProfile.id);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    hideCondirmModal();
    fetchActors(defaultPageNumber);
  };

  useEffect(() => {
    fetchActors(defaultPageNumber);
  }, []);
  return (
    <>
      <div className="p-5">
        <div className="flex justify-end mb-5">
          <AppSearchForm
            placeholder="Search Actors..."
            showResetIcon={results.length || resultNotFound}
            onSubmit={handleOnSearchSubmit}
            onReset={handleFormReset}
          />
        </div>

        <NotFoundText text="Actor not found." visible={resultNotFound} />

        <div className="grid grid-cols-4 gap-5">
          {results.length || resultNotFound
            ? results.map((actor) => (
                <ActorProfile
                  profile={actor}
                  key={actor.id}
                  onEditClick={() => handleOnEditClick(actor)}
                  onDeleteClick={() => handleOnDeleteClick(actor)}
                />
              ))
            : actors.map((actor) => (
                <ActorProfile
                  profile={actor}
                  key={actor.id}
                  onEditClick={() => handleOnEditClick(actor)}
                  onDeleteClick={() => handleOnDeleteClick(actor)}
                />
              ))}
        </div>

        {!results.length && !resultNotFound && actorsCount > limit ? (
          <PaginationButtons
            className="mt-5"
            onNextClick={handleNextClick}
            onPreviousClick={handlePreviousClick}
          />
        ) : null}
      </div>
      <ConfirmModal
        visible={showConfirmModal}
        busy={busy}
        title="Are you sure?"
        subtitle="This action will remove this profile permanently."
        onConfirm={onDeleteConfirm}
        onCancel={hideCondirmModal}
      />
      <UpdateActor
        visible={showUpdateModal}
        onClose={hideUpdateModal}
        initialState={selectedProfile}
        onSuccess={handleOnActorUpdate}
      />
    </>
  );
};

export default Actors;

const ActorProfile = ({ profile, onEditClick, onDeleteClick }) => {
  const [showOptions, setShowOptions] = useState(false);
  const acceptedNameLength = 15;

  const handleOnMouseEnter = () => {
    setShowOptions(true);
  };

  const handleOnMouseLeave = () => {
    setShowOptions(false);
  };
  if (!profile) return null;

  const getName = (name) => {
    if (name.length <= acceptedNameLength) return name;
    return name.substring(0, acceptedNameLength) + "...";
  };

  const { name, avatar, about = "" } = profile;

  return (
    <div className="bg-white shadow-md shadow-300y-500 dark:shadow-gray-700 dark:bg-secondary h-20 overflow-hidden rounded">
      <div
        className="flex cursor-pointer relative"
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        <img
          src={avatar}
          alt={name}
          className="w-20 aspect-square object-cover"
        />
        <div className="px-2">
          <h1 className="text-xl text-primary dark:text-white font-semibold">
            {getName(name)}
          </h1>
          <p className="text-primary dark:text-white opacity-70">
            {about.substring(0, 45)}
          </p>
        </div>
        <Options
          onEditClick={onEditClick}
          visible={showOptions}
          onDeleteClick={onDeleteClick}
        />
      </div>
    </div>
  );
};

const Options = ({ visible, onDeleteClick, onEditClick }) => {
  if (!visible) return null;
  return (
    <div className="absolute inset-0 bg-opacity-25 bg-primary backdrop-blur-sm flex justify-center items-center gap-5">
      <button
        onClick={onDeleteClick}
        className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
        type="button"
      >
        <BsTrash />
      </button>
      <button
        onClick={onEditClick}
        className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
        type="button"
      >
        <BsPencilSquare />
      </button>
    </div>
  );
};
