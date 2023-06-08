import { useEffect, useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { getActors } from "../../api/actor";
import { useNotification } from "../../hooks";
import PaginationButtons from "../PaginationButtons";
import UpdateActor from "../modals/UpdateActor";

let defaultPageNumber = 0;
const limit = 5;

const Actors = () => {
  const { updateNotification } = useNotification();
  const [actors, setActors] = useState([]);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const fetchActors = async (pageNumber) => {
    const { profiles, error } = await getActors(pageNumber, limit);
    if (error) return updateNotification("error", error);
    if (!profiles.length) {
      defaultPageNumber = pageNumber - 1;
      return setReachedEnd(true);
    }
    setActors([...profiles]);
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

  useEffect(() => {
    fetchActors(defaultPageNumber);
  }, []);

  return (
    <>
      <div className="p-5">
        <div className="grid grid-cols-4 gap-5 p-5">
          {actors.map((actor) => {
            return (
              <ActorProfile
                profile={actor}
                key={actor.id}
                onEditClick={() => handleOnEditClick(actor)}
              />
            );
          })}
        </div>
        <PaginationButtons
          className="mt-5"
          onNextClick={handleNextClick}
          onPreviousClick={handlePreviousClick}
        />
      </div>
      <UpdateActor
        visible={showUpdateModal}
        onClose={hideUpdateModal}
        initialState={selectedProfile}
      />
    </>
  );
};

export default Actors;

const ActorProfile = ({ profile, onEditClick }) => {
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
        <Options onEditClick={onEditClick} visible={showOptions} />
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
