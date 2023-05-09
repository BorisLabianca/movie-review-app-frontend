import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import ModalContainer from "./ModalContainer";

const CastModal = ({ casts = [], visible, onClose, onRemoveClick }) => {
  //   const handleClick = (event) => {
  //     if (event.target.id === "modal-container") onClose();
  //   };
  if (!visible) return null;

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <div className="space-y-2 dark:bg-primary bg-white rounded max-w-[45rem] max-h-[40rem] overflow-auto p-2 custom-scroll-bar">
        {casts.map(({ profile, roleAs, leadActor }) => {
          const { name, avatar, id } = profile;
          return (
            <div
              className="flex space-x-3 dark:bg-secondary bg-white drop-shadow-md rounded"
              key={id}
            >
              <img
                src={avatar}
                alt={name}
                className="w-16 h-16 aspect-square rounded object-cover"
              />
              <div className="flex flex-col w-full justify-between">
                <div>
                  <p className="font-semibold dark:text-white text-primary ">
                    {name}
                  </p>
                  <p className="text-sm dark:text-dark-subtle text-light-subtle">
                    {roleAs}
                  </p>
                </div>

                {leadActor && (
                  <AiOutlineCheck className="text-light-subtle dark:text-dark-subtle" />
                )}
              </div>

              <button
                type="button"
                className="dark:text-white text-primary hover:opacity-80 transition p-2"
                onClick={() => {
                  onRemoveClick(id);
                }}
              >
                <AiOutlineClose />
              </button>
            </div>
          );
        })}
      </div>
    </ModalContainer>
  );
};

export default CastModal;
